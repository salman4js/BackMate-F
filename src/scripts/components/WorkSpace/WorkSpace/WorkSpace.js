import React, { useState, useEffect } from 'react';
import './workspace.css';
import SidePanel from '../SidePanel/SidePanel';
import WorkPanel from '../WorkPanel/WorkPanel';
import { setStorage } from '../../../Storage/Storage';

const WorkSpace = (props) => {

  // Handle content for the workpanel!
  const [content, setContent] = useState(); // Remove this later if not being used anywhere!

  // Height handler!
  const [height, setHeight] = useState();

  // Handle the file content to the editor!
  function handleContent(data) {
    setStorage("body-code", data);
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
        <WorkPanel height = {height} />
      </div>
    </div>
  )
}

export default WorkSpace