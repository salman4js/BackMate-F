import React, {useRef, useEffect, useState} from 'react';
import Loader from '../Loader/loader.view';
import PanelItemView from './panel.item/panel.item.view';
import './panel.view.css';

const PanelView = (props) => {
  
  // Reference to required panel view component to calculate the height!
  const wrapperRef = useRef(null);
  const sidePanelRef = useRef(null);
  const workSpaceRef = useRef(null);
  
  // State handler for loader height!
  const [loaderHeight, setLoaderHeight] = useState(0);
  
  // Show loader in the center of the side panel container!
  function _showLoader(){
    return(
      <div className = "loader-spinner" style = {{marginTop: (loaderHeight) / 2.2 + "px"}}> 
          <Loader data = {props.panelData.loaderStyle} />
      </div>
    )
  }
  
  // Show panel item view!
  function _showPanelItemView(){
    if(!props.panelData.enableLoader && props.panelData.data !== undefined){ // When the components load, the states are tends to be undefined!
      return(
        props.panelData.data.map((options, key) => {
            return(
              <PanelItemView data = {options.storyName} objectId = {options._id} onClick = {(object_id) => props.panelData.itemOnClick(object_id, options)} />
            )
        })
      )
    } else { // Render the loader here, as the values are still getting fetched from the API!
      return _showLoader();
    }
  }
  
  // Calculate the height of the sidepanel container!
  function _calculateHeight(wrapperRef,sidePanelRef){
    const wrapperContainer = wrapperRef.current.offsetHeight;
    const sidePanelContainer = sidePanelRef.current.offsetHeight;
    return (sidePanelContainer - wrapperContainer);
  }
  
  
  // Send the height of the container to the parent class!
  useEffect(() => {
    props.getHeight(wrapperRef, sidePanelRef);
    setLoaderHeight(_calculateHeight(wrapperRef, sidePanelRef)); // This method handles where the loader has to be placed!
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
            {_showPanelItemView()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelView;