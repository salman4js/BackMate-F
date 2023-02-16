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
    <div className = "brew-title-workspace file-items" onClick={() => navigation(props.isDirectory, props.name)}>
     {props.isDirectory ? <IconFolder /> : <IconFile />}
     {props.name}
    </div>
  )
}

export default FileItems;

// brew-title-workspace file-items