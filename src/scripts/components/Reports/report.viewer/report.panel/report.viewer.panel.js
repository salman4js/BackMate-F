import React from 'react';
import './report.viewer.panel.css';

const ReportPanel = (props) => {
  
  // Shoe selected report data object!
  function _showReportData(){

    const elements = [];
    for (let key in props.data.objectData){
      if(props.data.objectData.hasOwnProperty(key)){
        var value = props.data.objectData[key];
        if(key !== "_id" && key !== "__v" && key !== "user"){
          elements.push(
            <div className = "report-viewer-result">
              {key} : {value}
            </div>
          )
        }
      }
    }
    
    return elements
  }
  
  
  return(
    <div className = "report-viewer-panel" style = {{height: props.data.height + "px"}}>
      <div className = "report-viewer-header text-center">
          {props.header}
      </div>
      {_showReportData()}
    </div>
  )
}

export default ReportPanel;