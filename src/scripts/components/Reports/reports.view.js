import React, {useState, useEffect} from 'react';
import './reports.view.css';
import {reportLang} from './lang/lang';
import EditorWelcome from '../CodeEditor/WelcomeEditor/Editor';
import PanelView from '../PanelView/panel.view';
import {getAllReports} from '../../Controller/appController';

const ReportsView = () => {
  
  // Height of the right side panel container!
  const [height, setHeight] = useState();
  
  // Side panel data model!
  const [reportData, setReportData] = useState([]);
  
  // Side panel populate model!
  const [panelModel, setPanelModel] = useState({
    name: reportData
  })
  
  // Calculate height for the right panel!
  function calculateHeight(wrapper, sidepanel){
    setHeight(wrapper.current.offsetHeight + sidepanel.current.offsetHeight);
  }
  
  // Get reports!
  async function getReports(){
    const result = await getAllReports();
    if(result.status === 200){
      setReportData(result.data.message);
    } else {
      // Error handling through modal!
    }
  }
  
  // Get current report of the logged in user!
  useEffect(() => {
    getReports();
  }, [])
  
  return(
    <div className = "brew-container">
      <div className = "flex-1">
        <PanelView getHeight = {(wrapper, sidepanel) => calculateHeight(wrapper, sidepanel)} />
      </div>
      <div className = "flex-2">
        <div className = "container-header">
          <EditorWelcome message = {reportLang.editorPreview} isReload = {false} height = {height} />
        </div>
      </div>
    </div>
  )
}


export default ReportsView;