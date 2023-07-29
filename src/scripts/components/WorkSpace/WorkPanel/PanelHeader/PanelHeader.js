import React, { useState, useEffect } from 'react';
import { getStorage } from '../../../../Storage/Storage';
import './PanelHeader.css'

const PanelHeader = (props) => {

    // State to handle show/hide behaviour of the close-panel!
    const [isHovered, setIsHovered] = useState(false);

    // State to handle the highlight
    const [highlight, setHighlight] = useState(false);

    function onMouseEnter() {
        setIsHovered(true);
    }

    function onMouseLeave() {
        setIsHovered(false);
    }

    // Check for file state change

    function checkFileState(){
      // Last opened file is the one previewing on the screen!
      if(props.pathWithDir === getStorage('wdf')){
        setHighlight(true);
      } else {
        return;
      }
    }

    useEffect(() => {
        checkFileState();
    }, [props.pathWithDir])

    return (
        <div className="panel-header-src">
            <div className={highlight ? "panel-header-content-highlight" : "panel-header-content text-center"} 
            onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={() => props.handleFileOpen(props.pathWithDir)}>
                <span className="panel-header-name">
                    {props.fileName}
                </span>
                <span className="close-panel" onClick={() => props.handleClosePanel(props.pathWithDir)} style = {{display: isHovered ? "block" : 'none'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                    </svg>
                </span>
            </div>
        </div>
    )
}

export default PanelHeader;