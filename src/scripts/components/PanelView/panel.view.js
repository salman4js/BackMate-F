import React, {useRef, useEffect} from 'react';
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
        <div className = "workspace-title" ref = {workSpaceRef}>
          <span className = "explorer">
            Hey there!
          </span>
        </div>
        <div className = "sidepanel" ref = {sidePanelRef}>
          <div className = "files">
            <PanelItemView />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelView;