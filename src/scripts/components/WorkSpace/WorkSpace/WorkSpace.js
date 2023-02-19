import React, { useState, useEffect } from 'react';
import './workspace.css';
import SidePanel from '../SidePanel/SidePanel';
import WorkPanel from '../WorkPanel/WorkPanel';
import { setStorage } from '../../../Storage/Storage';
import EditorWelcome from '../../CodeEditor/WelcomeEditor/Editor';

const WorkSpace = (props) => {

  // Handle content for the workpanel!
  const [content, setContent] = useState(); // Remove this later if not being used anywhere!

  // Editor State handler!
  const [editorCount, setEditorCount] = useState([1]);

  // Height handler!
  const [height, setHeight] = useState();

  // Handle the file content to the editor!
  function handleContent(data) {
    setContent(data); // For working around with the content, if not usable remove this later!

    // Setting the editor count here to render the number of editor as the user opens!
    setEditorCount(editorCount => {
      const updatedValue = [...editorCount, editorCount.length + 1];
      return updatedValue;
    })

    // Setting the editor value to the storage for value persistant!
    setStorage("editor-code", data);
  }

  // Update height for the code editor!
  function updateHeight(workSpaceRef, sideRef, footerRef){
    setHeight(workSpaceRef.current.offsetHeight + sideRef.current.offsetHeight + footerRef)
  }

  return (
    <div className="brew-container">
      <div className="flex-1">
        <SidePanel fileContent={(data) => handleContent(data)} height = {(x,y,z) => updateHeight(x,y,z)} />
      </div>
      <div className="flex-2">
        {
          content !== undefined ? (
            <WorkPanel content = {content} height = {height} />
          ) : (
            <EditorWelcome />
          )
        }
      </div>
    </div>
  )
}

export default WorkSpace