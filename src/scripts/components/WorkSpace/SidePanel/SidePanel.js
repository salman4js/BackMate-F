import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
const { ipcRenderer } = window.require('electron');
import { workLang } from '../WorkSpace/lang';
import { setStorage, getStorage } from '../../../Storage/Storage';
import { handlePathSep, getPathSep } from '../../../Functions/CommonFunctions/common.functions.js';
import { onLoader, commonLabel } from '../../../Functions/CommonFunctions/common.view/common.view.functions';
import ModalAssist from '../../modal.assist/modal.assist.view';
import FooterBtn from '../FooterBtn/FooterBtn'
import './SidePanel.css';
import FileItems from './src/FileItems';
import Toast from '../../Toast/Toast';
// Importing the node 'fs' and 'pathModule' module.
const fs = window.require('fs');
const pathModule = window.require('path');


const SidePanel = (props, ref) => {

  // References to calculate the code editor height!
  const sideRef = useRef(null);
  const workSpaceRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // Path separator for cross platforms!
  const pathSepr = getPathSep();

  // Opened files state handler!
  const [open, setOpen] = useState([]);

  // Toast handler!
  const [toastShow, setToastShow] = useState(false);
  
  // Custom modal state handler!
  const [modalAssist, setModalAssist] = useState({
    show: false,
    header: "Select Folders and Files to Automate",
    _showHeaderChildView: _showHeaderChildView,
    height: undefined,
    style: {
      fontWeight: "bold",
      marginLeft: "60px",
      marginRight: "60px",
      marginTop: "60px",
      marginBottom: "60px",
      overflow: "hidden"
    }
  });
  
  // Show header child view for modal assist!
  function _showHeaderChildView(){
    return(
      <span onClick = {() => _triggerModalAssist(false)}>
        <svg width="26" height="26" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
          <path fill="black" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"/>
        </svg>
      </span>
    )
  }
  
  // Function to trigger modal assist dialog!
  function _triggerModalAssist(action){
    setModalAssist(prevState => ({...prevState, show: action}));
  }
  
  // Function to show the modal assist dialog!
  function showModalAssistDialog(){
    return(
      <ModalAssist data = {modalAssist} />
    )
  }
  
  // Toast config!
  const toastConfig = {
    alignment : "brew-toast-title",
    onHide: handleToast,
    textarea: {
        isRequired: true,
        placeholder: "Folder Creation",
    },
    footer: {
        isRequired: true,
        buttons: [
            {
                id: "Create",
                variant: "success",
                onClick: decideCreation
            }
        ]  
    }
  }

  // New folder and value state handler!
  const [value, setValue] = useState();
  const [folder, setFolder] = useState(false);
  const [file, setFile] = useState(false);
  const [error, setError] = useState();

  // Get the user specified working directory!
  function getWorkingDirectory(){
    var workingDir;
    // Get the current path of the working directory!;
    if (getStorage("wd", true) !== null) {
      workingDir = getStorage('wd', true);
      const path = handlePathSep(workingDir);
      setValue(path);
    } else {
      
    }
    return workingDir;
  }

  // Files and Folders state handler!
  const [data, setData] = useState([]);

  // Handle the data in the directory!
  function getData(path) {
    if(path){
      const data = fs.readdirSync(path)
        .map(file => {
          const stats = fs.statSync(pathModule.join(path, file))
          return {
            name: file,
            directory: stats.isDirectory()
          }
        })
        .sort((a, b) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name)
          }
          return a.directory ? -1 : 1
        })

      setData(data);
    } else { setData(path) }
  }

  // Root Directory!
  function rootDirectory(path) {
    // Setting the local storage for value persistant!
    setStorage("wd", path);
    setValue(path);
  }

  // Handle folders navigation!
  function handleNavigation(names) {
    // Assigning the new path to data state to handle navigation!
    var wd = getStorage('wd', true);
    const path = pathModule.join(wd, names);
    const newPath =  handlePathSep(path); // Handles path separator for cross platforms!
    
    getData(newPath);
    // Change the working directory everytime the path changes!
    rootDirectory(newPath);
  }

  // Handle Folders back operation!
  function handleBack() {
    var wd = getStorage('wdf'); // getting the current path to navigate one step back1
    // If we use getStorage('wd') that will get the user out of the user specified directory!
    const path = pathModule.dirname(wd);
    
    const newPath = handlePathSep(path); // Handle the path separator for all platforms when navigating back...
    
    getData(newPath);
    // Change the working directory everytime the path changes!
    rootDirectory(newPath);
  }

  // Handle open file operation!
  function openFile(data) {
    // Set the path of the opened file to the local storage!
    var wd = getStorage('wd', true);
    setStorage('wdf', pathModule.join(wd, data));
    const pathWithDir = pathModule.join(wd, data);
    // Set the opened files in the local storage for editor persitant!
    // Remove duplicates array!
    setOpen(open => {
      const newValue = [...open, pathWithDir];
      // Sending the opened file back to the parent container!
      const val = [...new Set(newValue)];
      props.openFile(val);
      setStorage("openFile", JSON.stringify(val));
      return newValue;
    })
    
    // Sending the file content to the code editor!
    passContent(wd, data);
  }

  function passContent(wd, data){
    // Implemented fail safe method as a part of rendering the welcome editor screen when no panel header file is in open state!
    try{
      const fileExtension = data.slice((data.lastIndexOf(".") - 1 >>> 0) + 2);
      const fileContent = fs.readFileSync(pathModule.join(wd, data)).toString();
      props.fileContent(fileContent, fileExtension);
    } catch(err){
      props.fileContent(undefined);
    }
  }

 // Handle file-close panel header operation!
 function fileClose(filePath){
  const onOpen = getStorage('wdf');
  // Handle the panel header data!
  setOpen(open => {
    const check = open.indexOf(filePath);
    // Added as part of closed item duplicate preventor fails at sometimes!
    if(check > -1){
      var newValue = open.filter(item => item !== filePath);
    }
    const failSafe = [...new Set(newValue)]; // Adding an extra check as a fail safe.
    props.openFile(failSafe);
    setStorage("openFile", JSON.stringify(failSafe));
    // Handle the code editor data interference with panel header!
    if(onOpen === filePath){
      const getIndex = open;
      let index = getIndex.indexOf(onOpen);
      setStorage('wdf', open[index - 1]);
      // Gets how many panel header tabs are present, If none render the welcome editor screen!
      // TODO :: Change the file open operation based on the operation system!
      if(failSafe.length > 0){
        try{
          const path = open[index - 1];
          const data = path.split(pathSepr).pop();
          const wd = path.substring(0, path.lastIndexOf(pathSepr));
          // Calling the function responsible for sending the content to the editor!
          passContent(wd, data);
        } catch(err){
          const path = failSafe[index];
          // Re writing the storage value since its undefined when its comes to first panel header tab close action!
          setStorage('wdf', failSafe[index]);
          const data = path.split(pathSepr).pop();
          const wd = path.substring(0, path.lastIndexOf(pathSepr));
          passContent(wd, data);
        }
      } else {
        // the above try and catch block performs the same operation, this if condition is a fail safe condition for any expected scenarios!
        passContent(undefined);
      } 
    }
    return failSafe;
  })

  
}

  // Update height for the code editor!
  function updateHeight(data) {
    props.height(workSpaceRef, sideRef, data, wrapperRef);
  }

  // Handle Toast Close!
  function handleToast(module){

    // Deciding the creation module!
    if(module === "folder"){
      setFolder(true);
    } else if(module === "file") {
      setFile(true);
    } else {
      setFolder(!folder);
      setFile(!file);
    }
    // Setting the error undefined to retain miniToast rendering on opening the panel for the first time after the error pops!
    setError(undefined);
    setToastShow(!toastShow);
  }

  // Handle value update for folder creation
  function updateValue(data){
    // Update the local storage and the state for persistant & updation
    setStorage("wd", data);
    setValue(getStorage('wd'));
  }

  // Handle folder creation!
  function folderCreation(){
    try {
      if (!fs.existsSync(value)) {
        fs.mkdirSync(value);
        // When the folder has been created, the default wd would be in the created folder hence the sidepanel value might be misleading!
        // So, Whenever the folder has been created, initiating handleback function to get back to the original directory!
        handleBack(wd);
        // Close the creation toast dialog!
        handleToast(); // State decide helper will be clear out in the stage!
      } else {
        // Throw error that the name must be needed to create a folder!
        setError(workLang.errorFolder)
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Handle file creation!
  function fileCreation(){
    fs.appendFile(value, 'w', function(err, file){
      if(err) {
        // Handle the error!
        setError(workLang.errorFile)
      } else {
        // This two function order should be the same as for some reason, JS and CSS file type files
        // have been created outside of the targeted folder!
        handleToast(); // State decide helper will be clear out in the stage!
        handleBack(wd); // Value persistant!
      }
     })
  }
  
  // Get the panel header value and store it in the openFile state handler!
  function panelHeader(){
    const result = props.getPanelHeader();
    if(result !== undefined){
      setOpen(result);
    }
  }


  // Decide Creation!
  function decideCreation(){
    if(folder){
      folderCreation();
    } else if(file){
      fileCreation();
    }
  }
  
  // Render panel child view!
  function childView(){
    if(data !== undefined){
      return contentChildView();
    } else {
      return setDirectoryDialog()
    }
  }
  
  // Render side panel content child view!
  function contentChildView(){
    var loaderOptions = {color: "black"};
    if(data && data.length !== 0){
      return(
        <div className = "files">
          {
            data.map((item, key) => {
              return (
                <FileItems name={item.name} isDirectory={item.directory} navigation={(data) => handleNavigation(data)}
                  openFile={(data) => openFile(data)}
                />
              )
            })
          }
        </div>
      )
    } else {
      return(
        <div className = "workspace-loader">
          {commonLabel(workLang.noFiles)}
        </div>
      )
    }
  }
  
  // Set the directory dialog to let the user to define the project folder!
  function setDirectoryDialog(){
    return(
      <div className="no-directory">
        {commonLabel(workLang.setDirectory)}
        <div className = "text-center btn-primary" onClick = {() => getWorkingDirectoryPath()}>
          {workLang.addFolders}
        </div>
      </div>
    )
  }
  
  // Get working directory from the main process!
  function getWorkingDirectoryPath(){
    ipcRenderer.send('select-folder');
  }
  
  // Listen for the event 'selected-folder' from the main process
  // to get the user specified working directory!
  ipcRenderer.on('selected-folder', (event, folderPath) => {
    setStorage('wd', folderPath, true);
    getData(folderPath)
  }) 
  
  
  // Referencing openFile function to the parent component
  // to enable the panel header to handle open file functions!
  useImperativeHandle(ref, () => ({
    log(filePath, fileName) {
      openFile(filePath, fileName)
    },

    fileClose(filePath, fileName){
      fileClose(filePath + pathSepr + fileName);
    }
  }));
  

  // Constructor - Get all the files and folders in working directory before the component renders!
  useEffect(() => {
    // Get the user specified working directory!
    const workingDir = getWorkingDirectory()
    // Getting the data's from the path directory!
    getData(workingDir);
    panelHeader();
  }, [])

  return (
    <div className="sidepanel-container">
      <div className="wrapper" ref = {wrapperRef}>
        <div className="workspace-title" ref={workSpaceRef}>
          <span className="explorer">
            {workLang.explorer}
          </span>
          <span className = "trigger-multilevel-automation" onClick = {() => _triggerModalAssist(true)}>
            <svg width="22" height="22" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" d="M16 27c-3.6 0-7.1-1.8-9.2-5H12v-2H4v8h2v-3.7c2.5 3 6.1 4.7 10 4.7v-2zm15-4v-2h-2.1c-.1-.6-.4-1.2-.7-1.8l1.5-1.5l-1.4-1.4l-1.5 1.5c-.5-.3-1.1-.6-1.8-.7V15h-2v2.1c-.6.1-1.2.4-1.8.7l-1.5-1.5l-1.4 1.4l1.5 1.5c-.3.5-.6 1.1-.7 1.8H17v2h2.1c.1.6.4 1.2.7 1.8l-1.5 1.5l1.4 1.4l1.5-1.5c.5.3 1.1.6 1.8.7V29h2v-2.1c.6-.1 1.2-.4 1.8-.7l1.5 1.5l1.4-1.4l-1.5-1.5c.3-.5.6-1.1.7-1.8H31zm-7 2c-1.7 0-3-1.3-3-3s1.3-3 3-3s3 1.3 3 3s-1.3 3-3 3zm-4-15h5.2C21.9 4.9 15.1 3.5 10 6.8c-3.1 2-5 5.5-5 9.2H3C3 8.8 8.8 3 16 3c3.9 0 7.5 1.7 10 4.7V4h2v8h-8v-2z"/>
            </svg>
          </span>
          <span className="new-folder" onClick={() => handleToast("folder")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
              <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
              <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
            </svg>
          </span>
          <span className="new-file" onClick={() => handleToast("file")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg>
          </span>
        </div>
        <div className="sidebar" ref={sideRef}>
          {childView()}
          <FooterBtn workName={workLang.back} handleAction={() => handleBack()} footerHeight={(data) => updateHeight(data)} />
        </div>
      </div>
      {
        toastShow === true ? (
          <Toast show = {toastShow} message = {folder ? workLang.toastFolderHeader : workLang.toastFileHeader} 
          data = {toastConfig} value = {value} error = {error}
          node = {(data) => updateValue(data)} />
        ) : (
          null
        )
      }
      
      { /* Modal Assist Dialog &*/}
      {modalAssist.show && (
        showModalAssistDialog()
      )}
    </div>
  )

}

export default React.forwardRef(SidePanel);