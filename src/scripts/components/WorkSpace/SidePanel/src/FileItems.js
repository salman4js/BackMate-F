import React from 'react';
import { IconFile, IconFolder } from '../../Icons/IconsHolder';

const FileItems = (props) => {

  // Handle Folder Navigation only for the directories
  function navigation(names){
    props.navigation(names);
  }

  return (
    <div className = "brew-title-workspace file-items" onClick={() => props.isDirectory && navigation(props.name)}>
     {props.isDirectory ? <IconFolder /> : <IconFile />}
     {props.name}
    </div>
  )
}

export default FileItems;

// brew-title-workspace file-items