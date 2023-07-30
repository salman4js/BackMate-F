import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { mainLang } from '../Main/lang';
import PanelView from '../PanelView/panel.view';
import Request from '../Requests/Request';
import Crumbs from '../NavCrumbs/Crumbs';
import Responses from '../Response/Response';
import Pagination from '../Pagination/Pagination';
import EditorWelcome from '../CodeEditor/WelcomeEditor/Editor';
import { initiateRequest } from '../../Functions/Functions';
import { getCollection } from '../../Controller/appController';
import { onLoader, commonLabel } from '../../Functions/CommonFunctions/common.view/common.view.functions';
import { getPersistedValues } from '../../Functions/CommonFunctions/common.functions';
import CollectionView from '../PanelView/collection.view/collection.view';
import Loader from '../Loader/loader.view';
import { getStorage, setStorage, defaultStorage } from '../../Storage/Storage';
// import useForceUpdate from '../hooks/ForceUpdate/force.update.render';

const Home = (props) => {

    // Loader handler!
    const [loader, setLoader] = useState(false);
    
    // Component wise reload!
    const [reload, setReload] = useState({
      triggerReload: _triggerReload,
      isReload: true
    })
    
    // Trigger reloading!
    function _triggerReload(value){
      setReload(prevState => ({...prevState, isReload: value}))
    }

    // Height calculation handler for the elements!
    const [request, setRequest] = useState();
    const [pagination, setPagination] = useState();
    const [footer, setFooter] = useState();

    // Data handler for the params container!
    // Input handler for the params container!
    const [key, setKey] = useState([]);
    const [values, setValues] = useState([]);

    // Data handler for body container!
    // Input handler for the body container!
    const [url, setUrl] = useState(getStorage('req-url'));
    const [mode, setMode] = useState();
    const [body, setBody] = useState("");

    // Input handler for authorization container!
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Set the editor height!
    const [height, setHeight] = useState();

    // Respons handler!
    const [response, setResponse] = useState("");
    
    // Side panel populate model!
    const [panelModel, setPanelModel] = useState({
      header: "API COLLECTIONS",
      enableLoader: false,
      loaderColor: "black",
      panelHeight: 0,
      data: [],
      onLoader: _triggerLoader,
      enableSubChildView: false
    })
    
    // Function to trigger the collection panel loader!
    function _triggerLoader(value){
      setPanelModel(prevState => ({...prevState, enableLoader: value}))
    }
    
    // Update side panel container height to determine loader place!!!
    function updatePanelHeight(wrapper, sidepanel){
      const calculatedHeight = wrapper.current.offsetHeight + sidepanel.current.offsetHeight;
      setPanelModel(prevState => ({...prevState, panelHeight: calculatedHeight}))
    }

    // Pagination Child container catch handler!
    //const defaultCrumb = "Body";
    const crumbsView = getStorage(mainLang.crumb);
    const [crumbs, setCrumbs] = useState(crumbsView);
    const handleCatch = (val) => {
        localStorage.setItem(mainLang.crumb, val);
        setCrumbs(val);
    }

    // Update URL handler!
    function updateUrl(data){
        setUrl(url => {
            setStorage("req-url", data);
            const newValue = data;
            return newValue;
        })
    }
    
    // Get body value in all possible scenarios!
    function getBodyValue(value){
      if(typeof(value) === "object"){
        return body;
      } else {
        const result = value.length > 0 ? JSON.parse(value) : value;
        return result;
      }
    }

    // Request handler!
    const handleRequest = async (url, mode, body) => {
        const bodyValue = getBodyValue(body);
        setLoader(true);
        const data = {
            url: getStorage("req-url"),
            mode: mode,
            body: bodyValue,
            username: username,
            password: password
        }
        const result = await initiateRequest(data);
        if (result.status === 200) {
            setResponse(result.data);
            setLoader(false);
        } else {
            setResponse(result);
            setLoader(false);
        }
        
        fetchCollection(); // Call the function again here, to get the latest collection!
    }

    // Update height of the code editor!
    function updateHeight() {
        if (footer !== undefined) {
            const mainRef = props.mainref
            const mainElem = mainRef.current.offsetHeight; //  TODO: Comeup with a better calculation for this part!
            const topElem = props.header + pagination + request;
            setHeight(footer + topElem + mainElem);
        } else {
            return;
        }
    }
    
    // Fetch collection for side panel view!
    async function fetchCollection(){
      _triggerLoader(true);
      const result = await getCollection();
      if(result.status === 200){
        setPanelModel(prevState => ({...prevState, data: result.data.message.reverse(), enableLoader: false}))
      }
    }

    // Get Function!
    function getFunction() {
        const storage = getStorage(mainLang.crumb);
        if (storage === mainLang.body || storage === mainLang.params || storage === mainLang.authorization) {
            handleRequest(url + key + values, mode, body);
        }
    }

    // The following two blocks performing appending the url to the url from the params container!
    function appendUrl(data) {
        setUrl(url => {
            if (url.indexOf("?") !== -1) {
                const newValue = url + '&' + data;
                return newValue;
            } else {
                const newValue = url + '?' + data;
                return newValue;
            }
        })
    }

    function appendUrlValue(data) {
        setUrl(url => {
            const newValue = url + data;
            return newValue;
        })
    }

    // Replace value for the params container!
    function replaceValues(dataKey, dataValue) {
        const val = dataKey + "=" + dataValue;
        setUrl(url => {
            const indexOfdataKey = url.indexOf(dataKey);
            const escapeChar = url[indexOfdataKey - 1];
            if (escapeChar === "?" || escapeChar === "&") {
                const replaceValue = url.replace(escapeChar + val, "");
                return replaceValue;
            } else {
                return url;
            }
        })
    }
    
    // Sub collection item on click function!
    function subItemOnClick(status){
      _triggerReload(false);
      populateReqValue(status); // Populate the request value for persistent!
      setTimeout(function(){ // Timeout needed to let the storage state changes and to re render the component!
        _triggerReload(true);
      }, 100)
    }
    
    // Persist request values!
    function populateReqValue(status){
      // Club the data together!
      const data = {
        "body-code" : status.reqBody,
        "req-url": status.url,
        "req-method": status.method
      }
      defaultStorage(data); // Store the clubed data into the localstorage!
      setUrl(status.url); // Update the state here, instead of reloading the component
    }
    
    // Show child view for the panel view!
    function _showChildView(){
      if(panelModel.data !== undefined && panelModel.data.length === 0 && panelModel.enableLoader === false){
        return _showCommonLabel();
      }
      
      if(panelModel.enableLoader === false && panelModel.data !== undefined){
        return(
          panelModel.data.map((options, key) => {
            return(
              <CollectionView data = {options} subItemOnClick = {(status) => subItemOnClick(status)}/>
            )
          })
        )
      }
      
      if(panelModel.data.length === 0 && panelModel.enableLoader){
        return _showLoader();
      }
    }
    
    // Show loader for the panel view!
    function _showLoader(){
      var loaderOptions = {
        color: panelModel.loaderColor,
        marginTop: panelModel.panelHeight / 2.2
      }
      return onLoader(loaderOptions)
    }
    
    // Show common label!
    function _showCommonLabel(){
      return(
        <div className = "text-center" style = {{marginTop: (panelModel.panelHeight) / 2.2 + "px"}}>
          {commonLabel(mainLang.noHistory)}
        </div>
      )
    }
    
    // Get value for the input text area field box!
    function getValue(){
      if(reload.isReload){
        return getStorage('req-url');
      } else {
        return mainLang.requestLoading
      }
    }
    
    // Set default values (persisted value) when the component load for the first time!~
    function setDefaultValues(){
      var data = getPersistedValues();
      setUrl(data.reqUrl);
      setBody(data.reqBody);
      setMode(data.reqMethod)
    }

    // OnRender!
    useEffect(() => {
        updateHeight();
        fetchCollection();
    }, [footer])
    
    // Whenever the state gets changes, add the value to the storage!
    useEffect(() => {
      _triggerReload(false);
      setDefaultValues();
      _triggerReload(true);
    }, [url])
    
    return (
        <div className = "brew-container">
          <div className = "flex-1">
            <PanelView panelData = {panelModel} getHeight = {(wrapper, sidepanel) => updatePanelHeight(wrapper, sidepanel)} showChildView = {() => _showChildView()} />
          </div>
          <div className = "flex-2">
            <div className = "home-container" style = {{paddingTop: "43px"}}>
            
                <Request request={setRequest} url={(data) => updateUrl(data)} mode={setMode}
                options={mainLang.options} getFunction={() => getFunction()} params={key} valueUrl={getValue()} valueParams={values} />
                
                <Pagination pagination={setPagination} catch={(item) => handleCatch(item)} />
                {/* <Editor height = {height} data = {setData} /> */}
                {reload.isReload ? (
                    <Crumbs value={crumbs} height={height} data={setBody} keys={(data) => appendUrl(data)}
                      values={(data) => appendUrlValue(data)}
                      username={setUsername} password={setPassword} replaceValue={(key, value) => replaceValues(key, value)}
                      storage = {"body-code"}
                    />
                  ) : (
                    <EditorWelcome height = {height} isReload = {false} message = {mainLang.editorLoading} />
                  )
                }
                <Responses footer={setFooter} result={response} loader={loader} />
            </div>
          </div>
        </div>
    )
}

export default Home;
