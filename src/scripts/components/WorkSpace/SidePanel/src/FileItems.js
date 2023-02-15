import React from 'react';
import { IconFile, IconFolder } from '../../Icons/IconsHolder';

const FileItems = (props) => {
  return (
    <div className = "brew-title-workspace file-items">
     {props.isDirectory ? <IconFolder /> : <IconFile />}
     {props.name}
    </div>
  )
}

export default FileItems;

// brew-title-workspace file-items