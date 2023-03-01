import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import { workLang } from '../WorkSpace/lang';
import dataConfig from '../../Toast/ToastConfig/Config';
import { setStorage, getStorage } from '../../../Storage/Storage';
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

  // Opened files state handler!
  const [open, setOpen] = useState(getStorage('openFile'));

  // Toast handler!
  const [toastShow, setToastShow] = useState(false);

  // New folder and value state handler!
  const [value, setValue] = useState();
  const [folder, setFolder] = useState(false);
  const [file, setFile] = useState(false);
  const [error, setError] = useState();

  // Get the current path of the working directory!;
  if (getStorage("wd") == null || undefined) {
    setStorage("wd", process.cwd());
    setValue(process.cwd());
  }
  var wd = getStorage("wd");

  // Files and Folders state handler!
  const [data, setData] = useState([]);

  // Handle the data in the directory!
  function getData(path) {
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
    const newPath = pathModule.join(wd, names);
    getData(newPath);
    // Change the working directory everytime the path changes!
    rootDirectory(newPath);
  }

  // Handle Folders back operation!
  function handleBack() {
    const newPath = pathModule.dirname(wd);
    getData(newPath);
    // Change the working directory everytime the path changes!
    rootDirectory(newPath);
  }

  // Handle open file operation!
  function openFile(wd,data) {
    // Set the path of the opened file to the local storage!
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
    const fileContent = fs.readFileSync(pathModule.join(wd, data)).toString();
    props.fileContent(fileContent);
  }

 // Handle file-close panel header operation!
 function fileClose(filePath){
  setOpen(open => {
    const check = open.indexOf(filePath);
    // Added as part of closed item duplicate preventor fails at sometimes!
    if(check > -1){
      var newValue = open.filter(item => item !== filePath);
    }
    const failSafe = [...new Set(newValue)]; // Adding an extra check as a fail safe.
    props.openFile(failSafe);
    setStorage("openFile", JSON.stringify(newValue));
    return newValue;
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


  // Decide Creation!
  function decideCreation(){
    if(folder){
      folderCreation();
    } else if(file){
      fileCreation();
    }
  }


  // Referencing openFile function to the parent component
  // to enable the panel header to handle open file functions!
  useImperativeHandle(ref, () => ({
    log(filePath, fileName) {
      openFile(filePath, fileName)
    },

    fileClose(filePath, fileName){
      fileClose(filePath + "/" + fileName);
    }
  }));
  

  // Constructor - Get all the files and folders in working directory before the component renders!
  useEffect(() => {
    // Getting the data's from the path directory!
    getData(wd);
  }, [])

  return (
    <div className="sidepanel-container">
      <div className="wrapper" ref = {wrapperRef}>
        <div className="workspace-title" ref={workSpaceRef}>
          <span className="explorer">
            {workLang.explorer}
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

          <div className="files">
            {
              data.map((item, key) => {
                return (
                  <FileItems name={item.name} isDirectory={item.directory} navigation={(data) => handleNavigation(data)}
                    openFile={(data) => openFile(wd ,data)}
                  />
                )
              })
            }
          </div>
          <FooterBtn workName={workLang.back} handleAction={() => handleBack()} footerHeight={(data) => updateHeight(data)} />
        </div>
      </div>
      {
        toastShow === true ? (
          <Toast show = {toastShow} message = {folder ? workLang.toastFolderHeader : workLang.toastFileHeader} 
          alignment = {"brew-toast-title"}
          handleClose = {() => handleToast()} data = {dataConfig} value = {value} error = {error}
          node = {(data) => updateValue(data)} handleClick = {() => decideCreation()} />
        ) : (
          null
        )
      }
    </div>
  )

}

export default React.forwardRef(SidePanel);