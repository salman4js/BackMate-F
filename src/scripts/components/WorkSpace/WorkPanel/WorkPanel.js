import React, { useEffect } from 'react';
import { setStorage } from '../../../Storage/Storage';
import Editor from '../../CodeEditor/Editor';
import './WorkPanel.css';

const WorkPanel = (props) => {

  // Handling code editor data!
  function handleData(data){
    console.log(JSON.stringify(data));
  }

  return (
    <div className = "workpanel">
        <Editor height = {props.height} storage = {"editor-code"} data = {(data) => handleData(data)}  />
    </div>
  )
}

export default WorkPanel;