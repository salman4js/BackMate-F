import React from 'react';
import { setStorage } from '../../../Storage/Storage';
import Editor from '../../CodeEditor/Editor';
import './WorkPanel.css';

const WorkPanel = (props) => {

  return (
    <div className = "workpanel">
        <Editor height = {props.height}/>
    </div>
  )
}

export default WorkPanel;