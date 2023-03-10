import React, { useState, useEffect, useRef } from 'react';
import Editor from '../../CodeEditor/Editor';
import PanelHeader from './PanelHeader/PanelHeader';
import EditorWelcome from '../../CodeEditor/WelcomeEditor/Editor';
import { workLang } from '../WorkSpace/lang';
import './WorkPanel.css';
import { getStorage } from '../../../Storage/Storage';

const WorkPanel = (props) => {

  // Reload state handler!
  const [reload, setReload] = useState(false);

  // Reference handler for panel header element
  const panelHeaderRef = useRef(null);

  // Handling code editor data!
  function handleData(data) {
    props.data(data);
  }

  function saveText() {
    props.saveText();
  }

  // Handle the file open state from the panel header!
  function handleFileOpen(data){
    props.fileOpen(data);
  }

  // Handle the file-close panel state from the panel header!
  function handleClosePanel(data){
    props.fileClose(data)
  }

  // Update reload state!
  function updateState(data) {
    if (data === false) {
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
      <div>
        <div className="panel-header" ref = {panelHeaderRef}>
          {
            props.panelHeader.map((item, key) => {
              return (
                <PanelHeader fileName={item.split("/").pop()} pathWithDir = {item} 
                handleFileOpen = {(data) => handleFileOpen(data)}
                handleClosePanel = {(data) => handleClosePanel(data)} />
              )
            })
          }
        </div>
        <div className="workpanel">
           {/* Hard Coding height - 5 cause of the code mirror leaves 5px space down by default, the calculation for height of the code editor is correct in the parent container! */}
          <Editor height={props.height - 5} storage={"editor-code"} data={(data) => handleData(data)} content={props.content}
            saveText={() => saveText()} />
        </div>
      </div>
    ) : (
      <EditorWelcome message={workLang.reload} isReload={true} reload={(data) => updateState(data)} height={props.height} />
    )
  )
}

export default WorkPanel;