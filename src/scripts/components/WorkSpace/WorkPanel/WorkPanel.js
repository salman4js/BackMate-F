import React, { useState,useEffect } from 'react';
import { setStorage } from '../../../Storage/Storage';
import Editor from '../../CodeEditor/Editor';
import EditorWelcome from '../../CodeEditor/WelcomeEditor/Editor';
import './WorkPanel.css';

const WorkPanel = (props) => {

  // Reload state handler!
  const [reload, setReload] = useState(false);

  // Handling code editor data!
  function handleData(data){
    console.log(JSON.stringify(data));
  }

  // Update reload state!
  function updateState(data){
    if(data === false){
      setReload(!data);
    } else {
      setReload(!data);
    }
  }

  useEffect(() => {
    updateState(reload)
  }, [props.click])

  return (
    reload === true ? (
      <div className = "workpanel">
        <Editor height = {props.height} storage = {"editor-code"} data = {(data) => handleData(data)} content = {props.content}  />
      </div>
    ) : (
      <EditorWelcome message = {"Reloading!"} isReload = {true} reload = {(data) => updateState(data)}/>
    )
  )
}

export default WorkPanel;