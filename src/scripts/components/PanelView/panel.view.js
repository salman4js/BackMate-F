import React, {useRef, useEffect, useState} from 'react';
import Loader from '../Loader/loader.view';
import PanelItemView from './panel.item/panel.item.view';
import './panel.view.css';

const PanelView = (props) => {
    
  // Reference to required panel view component to calculate the height!
  const wrapperRef = useRef(null);
  const sidePanelRef = useRef(null);
  const workSpaceRef = useRef(null);
  
  
  // Send the height of the container to the parent class!
  useEffect(() => {
    props.getHeight(wrapperRef, sidePanelRef);
  }, [])
  
  return(
    <div className = "sidepanel-container">
      <div className = "wrapper" ref = {wrapperRef}>
        <div className = "sidepanel" ref = {sidePanelRef}>
          <div className = "sidepanel-title text-center" ref = {workSpaceRef}>
            <span className = "sidepanel-explorer">
              {props.panelData.header}
            </span>
          </div>
          <div className = "files">
            {props.showChildView()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelView;