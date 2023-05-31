import React, {useState} from 'react';
import './report.viewer.css';
import ReportPanel from './report.panel/report.viewer.panel';
import {getStorage} from '../../../Storage/Storage';

const ReportViewer = (props) => {
  
  // For value persistent, can be used only for report viewer type of component!
  const [value, setValue] = useState(JSON.parse(getStorage('report-content')))

  // Get height of the container from the parent component!
  function getHeight(){
    if(value.height === undefined){
      return props.getHeight();
    }
  }
  
  return(
    <div className = "report-viewer-tab" style = {{height: getHeight() + "px"}}>
      <div className = "row">
          <div className = "col-sm">
              <ReportPanel data = {value} header = {value.leftViewerHeader} id = {value.expectedResultId} />
          </div>
          <div className = "col-sm">
              <ReportPanel data = {value} header = {value.rightViewerHeader} id = {value.actualResultId}/>
          </div>
      </div>
    </div>
  )
}  

export default ReportViewer;