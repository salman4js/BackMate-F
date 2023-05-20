import React, {useState, useLayoutEffect} from 'react';
import './reports.view.css';
import {reportLang} from './lang/lang';
import EditorWelcome from '../CodeEditor/WelcomeEditor/Editor';
import ReportViewer from './report.viewer/report.viewer';
import PanelView from '../PanelView/panel.view';
import {getAllReports} from '../../Controller/appController';

const ReportsView = () => {
  
  // Height of the right side panel container!
  const [height, setHeight] = useState();
  
  // Loader State Handler!
  const [loader, setLoader] = useState({
    isLoader: false,
    onHide: _triggerLoader
  })
  
  // Side panel populate model!
  const [panelModel, setPanelModel] = useState({
    header: "PERSONAL REPORTS",
    enableLoader: false,
    loaderStyle: "black",
    data: undefined,
    itemOnClick: _selectedObject
  })
  
  // Report Viewer State Handler!
  const [viewerData, setViewerData] = useState({
    height: height,
    leftViewerHeader: "Expected Result",
    rightViewerHeader: "Actual Result",
    id: undefined,
    objectData: undefined
  })
  
  // Trigger loader method!
  function _triggerPanelLoader(value){
    setPanelModel(prevState => ({...prevState, enableLoader: value}));
  }
  
  // Trigger workspace loader!
  function _triggerLoader(value){
    setLoader(prevState => ({...prevState, isLoader: value}));
  }
  
  // Calculate height for the right panel!
  function calculateHeight(wrapper, sidepanel){
    const calculatedHeight = wrapper.current.offsetHeight + sidepanel.current.offsetHeight
    setHeight(calculatedHeight);
    setViewerData(prevState => ({...prevState, height: calculatedHeight }))
  }
  
  // Get reports!
  async function getReports(){
    _triggerPanelLoader(true); // Start the loader!
    const result = await getAllReports();
    if(result.status === 200){
      setPanelModel(prevState => ({...prevState, data: result.data.message}));
      _triggerPanelLoader(false);
    } else {
      // Error handling through modal!
    }
  }
  
  // This function handle getting the specific report from the objectId from the panel.item.view
  function _selectedObject(objectId, options){
    setViewerData(prevState => ({...prevState, id: objectId, objectData: options}));
  }

  // Get current report of the logged in user!
  useLayoutEffect(() => {
    getReports();
  }, [])
  
  return(
    <div className = "brew-container">
      <div className = "flex-1">
        <PanelView getHeight = {(wrapper, sidepanel) => calculateHeight(wrapper, sidepanel)} panelData = {panelModel} />
      </div>
      <div className = "flex-2">
        <div className = "container-header">
          {viewerData.id !== undefined ? (
            <ReportViewer viewerData = {viewerData} />
          ) : (
            <EditorWelcome message = {reportLang.editorPreview} isReload = {false} height = {height} />
          )
        }
        </div>
      </div>
    </div>
  )
}


export default ReportsView;