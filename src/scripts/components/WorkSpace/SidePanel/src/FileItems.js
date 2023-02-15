import React from 'react';
import { IconFile, IconFolder } from '../../Icons/IconsHolder';

const FileItems = (props) => {

  // Test function!
  function handleClick(names){
    props.navigation(names);
  }


  return (
    <div className = "brew-title-workspace file-items" onClick={() => handleClick(props.isDirectory, props.name)}>
     {props.isDirectory ? <IconFolder /> : <IconFile />}
     {props.name}
    </div>
  )
}

export default FileItems;

// brew-title-workspace file-items