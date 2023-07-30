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
  
  // Progress encountered with error1
  function _errorView(){
    return(
      <svg width="22" height="22" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill="red" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"/>
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
    
    if(props.data.progressStatus === 'failed'){
      return _errorView()
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