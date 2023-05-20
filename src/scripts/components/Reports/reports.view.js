import React, {useState, useLayoutEffect} from 'react';
import './reports.view.css';
import {reportLang} from './lang/lang';
import EditorWelcome from '../CodeEditor/WelcomeEditor/Editor';
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
  
  // Handler for selected object id!
  const [selectedId, setSelectedId] = useState({
    id: undefined,
    selectedObject: undefined
  })
  
  // Side panel populate model!
  const [panelModel, setPanelModel] = useState({
    header: "PERSONAL REPORTS",
    enableLoader: false,
    loaderStyle: "black",
    data: undefined,
    itemOnClick: _selectedObject
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
    setHeight(wrapper.current.offsetHeight + sidepanel.current.offsetHeight);
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
    setSelectedId(prevState => ({...prevState, id: objectId, selectedObject: options}));
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
          <EditorWelcome message = {reportLang.editorPreview} isReload = {false} height = {height} />
        </div>
      </div>
    </div>
  )
}


export default ReportsView;