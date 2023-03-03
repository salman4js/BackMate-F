import React, { useState, useRef } from 'react';
import './workspace.css';
import SidePanel from '../SidePanel/SidePanel';
import WorkPanel from '../WorkPanel/WorkPanel';
import { workLang } from './lang';
import { getStorage, setStorage } from '../../../Storage/Storage';
import EditorWelcome from '../../CodeEditor/WelcomeEditor/Editor';
import Control from '../ControlCenter/Control';
// Importing the node 'fs' and 'pathModule' module.
const fs = window.require('fs');
const pathModule = window.require('path');


const WorkSpace = (props) => {

  // Handle content for the workpanel!
  const [content, setContent] = useState(); 
  const [value, setValue] = useState();

  // SidePanel component reference!
  const ref = useRef(null);

  // Calculate panel header height!
  const [panelHeader, setPanelHeader] = useState([]);

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
    var lastOccurence = data.lastIndexOf('/');
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

  function updatePanelHeight(data){    
    console.log(data);
  }

  return (
    <div className="brew-container">
      <div className="flex-1">
        <SidePanel ref = {ref} fileContent={(data) => handleContent(data)} height = {(x,y,z,a) => updateHeight(x,y,z,a)} openFile = {setPanelHeader} />
      </div>
      <div className="flex-2">
        {
          content !== undefined ? (
            <div>
              <WorkPanel panelHeader = {panelHeader} content = {content} height = {height} click = {click} 
              saveText = {() => save()} data = {setValue} fileOpen = {(data) => handleFileOpen(data)}
              fileClose = {(data) => handleClosePanel(data)} updatePanelHeight = {(data) => updatePanelHeight(data)} />
            </div>
          ) : (
            <EditorWelcome message = {workLang.preview} isReload = {false} height = {height} />
          )
        }
        <Control height = {footerHeight} />
      </div>
    </div>
  )
}

export default WorkSpace