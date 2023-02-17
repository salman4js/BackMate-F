import React from 'react';
import { IconFile, IconFolder } from '../../Icons/IconsHolder';

const FileItems = (props) => {

  // Handle Folder Navigation only for the directories
  function navigation(isDirectory, names){
    if(isDirectory){
      props.navigation(names);
    } else {
      props.openFile(names);
    }
  }

  return (
    <div className = "file-items" onClick={() => navigation(props.isDirectory, props.name)}>
     <span className = "side-align brew-icon-workspace">
        {props.isDirectory ? <IconFolder /> : <IconFile />}
     </span>
     <span className = "brew-title-workspace side-align">
        {props.name}
     </span>
    </div>
  )
}

export default FileItems;

// brew-title-workspace file-items