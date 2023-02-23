import React, { useState,useEffect } from 'react';
import Editor from '../../CodeEditor/Editor';
import PanelHeader from './PanelHeader/PanelHeader';
import EditorWelcome from '../../CodeEditor/WelcomeEditor/Editor';
import { workLang } from '../WorkSpace/lang';
import './WorkPanel.css';

const WorkPanel = (props) => {

  // Reload state handler!
  const [reload, setReload] = useState(false);

  // Handling code editor data!
  function handleData(data){
    props.data(data);
  }

  function saveText(){
    props.saveText();
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
        <div className = "panel-header">
          <PanelHeader />
        </div>
        <Editor height = {props.height} storage = {"editor-code"} data = {(data) => handleData(data)} content = {props.content}
        saveText = {() => saveText()}  />
      </div>
    ) : (
      <EditorWelcome message = {workLang.reload} isReload = {true} reload = {(data) => updateState(data)} height = {props.height} />
    )
  )
}

export default WorkPanel;