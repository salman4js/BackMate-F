import React from 'react';
import {reportLang} from '../../lang/lang'
import './report.viewer.panel.css';

const ReportPanel = (props) => {
  
  // Shoe selected report story details!
  function _showReportData(){

    const elements = [];
    for (let key in props.data.objectData){
      if(props.data.objectData.hasOwnProperty(key)){
        var value = props.data.objectData[key];
        if(key !== "_id" && key !== "__v" && key !== "user" && key !== "actualResult" && key !== "expectedResult"){
          elements.push(
            <div className = "report-viewer-result">
              <span className = "report-viewer-data">
                {key} : {value}
              </span>
            </div>
          )
        }
      }
    }
    
    return elements
  }
  
  // Show selected report result details!
  function _showResultData(){
    var resultPanel = props.id === "left-side-viewer-panel" ? "expectedResult" : "actualResult"
    const elements = [];
    for (let key in props.data.objectData){
      if(props.data.objectData.hasOwnProperty(key)){
        var value = props.data.objectData[key];
        if(key === resultPanel){
          if (Array.isArray(value)){
            value = value.join(",  "); // Convert array to a string with comma-separated values
          }
          elements.push(
            <div className = "report-viewer-result">
              <span className = "report-viewer-data">
                {key} : {value}
              </span>
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
      <div className = "report-viewer-result">
          <div className = "report-viewer-data" style = {{fontWeight: "bold"}}>
              {reportLang.storyHeader}
          </div>
          <div>
              {_showReportData()}
          </div>
      </div>
      <div className = "report-viewer-result">
          <div className = "report-viewer-data" style = {{fontWeight: "bold"}}>
              {reportLang.resultHeader}
          </div>
          <div id = {props.id}>
              {_showResultData()}
          </div>
      </div>
    </div>
  )
}

export default ReportPanel;