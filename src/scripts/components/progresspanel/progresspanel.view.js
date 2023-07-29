import React from 'react';
import Loader from '../Loader/loader.view';
import { useSelector, useDispatch } from 'react-redux';
import { killGlobalMessage } from '../../stateManagement/actions/progress.panel.actions'
import { getInlineStyle } from '../../Functions/CommonFunctions/common.functions';
import { onLoader } from '../../Functions/CommonFunctions/common.view/common.view.functions'
import './Progresspanel.css';

const ProgressPanel = (props) => {
  
  // Dispatch instance1
  const dispatch = useDispatch();
  
  // Get style for the progresspanel!
  function getStyle(){
    var options = {marginLeft: props.position()}
    return getInlineStyle(options);
  }
  
  // Enable loader incase the props for enable loader is set to true!
  function _enableLoader(){
    // Options to pass for the loader!
    var opts = {
      color: props.data.color,
      loaderSize: props.data.loaderSize
    }
    return onLoader(opts)
  }
  
  // Progress successfully completed!
  function _successView(){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </svg>
    )
  }
  
  // Processing view!
  function processingView(){
    if(props.data.progressStatus === 'initiating'){
      return _enableLoader();
    }
    
    if(props.data.progressStatus === 'completed'){
      return _successView()
    }
  }
  
  // Stop operation!
  function closeMessage(){
    dispatch(killGlobalMessage())
  }
  
  return(
    <div className="progresspanel-view" style={getStyle()}>
      <span className="progresspanel-loader">
        {processingView()}
      </span>
      <span className="progresspanel-message">
        {props.data.message}
      </span>
      <span className="progresspanel-stop" onClick = {() => closeMessage()}>
        {props.data.closeOperation}
      </span>
    </div>
  )
}

export default ProgressPanel;