import React from 'react';
import './report.viewer.css';
import ReportPanel from './report.panel/report.viewer.panel';

const ReportViewer = (props) => {

  return(
    <div className = "report-viewer-tab" style = {{height: props.viewerData.height + "px"}}>
      <div className = "row">
          <div className = "col-sm">
              <ReportPanel data = {props.viewerData} header = {props.viewerData.leftViewerHeader} id = {props.viewerData.expectedResultId} />
          </div>
          <div className = "col-sm">
              <ReportPanel data = {props.viewerData} header = {props.viewerData.rightViewerHeader} id = {props.viewerData.actualResultId}/>
          </div>
      </div>
    </div>
  )
}  

export default ReportViewer;