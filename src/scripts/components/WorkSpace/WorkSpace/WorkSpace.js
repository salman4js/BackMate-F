import React, { useState, useRef, useEffect } from 'react';
import './workspace.css';
import SidePanel from '../SidePanel/SidePanel';
import WorkPanel from '../WorkPanel/WorkPanel';
import { workLang } from './lang';
import { getStorage, setStorage } from '../../../Storage/Storage';
import { getPathSep, gitBranch } from '../../../Functions/CommonFunctions/common.functions.js';
import EditorWelcome from '../../CodeEditor/WelcomeEditor/Editor';
import Control from '../ControlCenter/Control';
import CustomDialog from '../../Toast/CustomDialog/custom.dialog.view'

// Importing the node 'fs', 'pathModule' and 'execSync' module.
const fs = window.require('fs');
const pathModule = window.require('path');

// Importing Automation functions
import { Automate } from '../../../Functions/Functions';


const WorkSpace = (props) => {

  // Handle content for the workpanel!
  const [content, setContent] = useState(); 
  const [value, setValue] = useState();

  // Git Branch state handler
  const [branch, setBranch] = useState();

  // SidePanel component reference!
  const ref = useRef(null);
  
  // Custom Dialog State Handler!
  const [showCustomDialog, setShowCustomDialog] = useState({
    show: false,
    heading: undefined,
    subHeading: undefined,
    content: undefined,
    buttons: [
      {
        id: "Save",
        variant: "primary",
        onClick: _hideCustomDialog
      },
      {
        id: "Close",
        variant: "secondary",
        onClick: _hideCustomDialog
      }
    ],
    onHide: _hideCustomDialog
  })

  // Calculate panel header height!
  const [panelHeader, setPanelHeader] = useState([]);
  
  // Panel Header Value!
  var panelHeaderValue = getStorage("openFile");
  
  // Lastly opened editor value!
  var editorValue = getStorage("editor-code");
   
  // File Click handler!
  const [click, setClick] = useState(false);

  // Height handler!
  const [height, setHeight] = useState();
  const [footerHeight, setFooterHeight] = useState();

  // Handle the file content to the editor!
  function handleContent(data) {
    setContent(data); // For working around with the content, if not usable remove this later!
    setClick(!click);

    // Setting the editor value to the storage for value persistant!
    setStorage("editor-code", data);
  }


  // Template helpers!
  function templateHelpers(data){
    var lastOccurence = data.lastIndexOf(getPathSep());
    const fileName = data.substring(lastOccurence + 1);
    const filePath = data.substring(0, lastOccurence);
    return {filePath: filePath, fileName: fileName};
  }

  // Handle file open from the panel header
  function handleFileOpen(data){
    const result = templateHelpers(data)
    ref.current.log(result.filePath, result.fileName);
  }

  // Handle the file-close panel data from the panel header!
  function handleClosePanel(data){
    const result = templateHelpers(data);
    ref.current.fileClose(result.filePath, result.fileName);
  }

  // Save the modified file!
  function save(){
    try{
      fs.writeFileSync(getStorage('wdf'), value);
    } catch(err){
      console.error("Error occured in file saving!", err);
    }
  }

  // Update height for the code editor!
  function updateHeight(workSpaceRef, sideRef, footerRef, wrapperRef){
    controlHeight(footerRef) // Set the footer height to the state inorder to handle the height of the control center container!
    setHeight(workSpaceRef.current.offsetHeight + sideRef.current.offsetHeight + wrapperRef.current.offsetHeight - footerRef - footerRef)
  }

  // Calculate the height of the control center container
  function controlHeight(data){
    setFooterHeight(data)
  }

  // Control Center Code
  async function triggerAutomate(){
    // Call the automation process!
    // await Automate(getStorage('wdf'));
    // call the custom dialog!
    _showCustomDialog();
  }
  
  // show custom dialog!
  function _showCustomDialog(){
    setShowCustomDialog(prevState => ({...prevState, show: true, heading: workLang.saveReport, content: workLang.content}))
  }
  
  // Hide Custom Dialog!
  function _hideCustomDialog(){
    setShowCustomDialog(prevState => ({...prevState, show: false}))
  }
  
  // Git branch handler!
  function getGitBranch(){
    const branch = gitBranch();
    setBranch(branch);
  }
  
  // Set Panel Header Value!
  function getPanelHeader(){
    if(panelHeaderValue.length > 0){ // When the panel header value is not empty string, 
      // Convert it into the array object and set the useState of content and panelHeader value 
      const headerValue = JSON.parse(panelHeaderValue);
      setEditorContent(headerValue);
      return headerValue;
    }
  }
  
  // Set the content and the panel header value onRender!
  function setEditorContent(headerValue){
    setPanelHeader(headerValue);
    if(editorValue !== "undefined"){ // Here we have sepcified undefined as string as we retrieve it from local storage!
      setContent(editorValue);
    } 
  }

  // Get the git branch
  useEffect(() => {
    getGitBranch();
    getPanelHeader();
  }, [])

  return (
    <div className="brew-container">
      <div className="flex-1">
        <SidePanel ref = {ref} fileContent={(data) => handleContent(data)} height = {(x,y,z,a) => updateHeight(x,y,z,a)} 
        openFile = {setPanelHeader} getPanelHeader = {() => getPanelHeader()} />
      </div>
      <div className="flex-2">
        {
          content !== undefined ? (
            <div>
              <WorkPanel panelHeader = {panelHeader} content = {content} height = {height} click = {click} 
              saveText = {() => save()} data = {setValue} fileOpen = {(data) => handleFileOpen(data)}
              fileClose = {(data) => handleClosePanel(data)} />
            </div>
          ) : (
            <EditorWelcome message = {workLang.preview} isReload = {false} height = {height} />
          )
        }
        <Control height = {footerHeight} triggerAutomate = {() => triggerAutomate()} branch = {branch} />
      </div>
      {showCustomDialog.show && (
        <CustomDialog model = {showCustomDialog} />
      )}
    </div>
  )
}

export default WorkSpace