import React, { useState, useEffect, useRef } from 'react';
import { mainLang } from '../Main/lang';
import PanelView from '../PanelView/panel.view';
import Request from '../Requests/Request';
import Crumbs from '../NavCrumbs/Crumbs';
import Responses from '../Response/Response';
import Pagination from '../Pagination/Pagination';
import { initiateRequest } from '../../Functions/Functions';
import { getCollection } from '../../Controller/appController';
import { onLoader, commonLabel } from '../../Functions/CommonFunctions/common.view/common.view.functions'
import CollectionView from '../PanelView/collection.view/collection.view';
import Loader from '../Loader/loader.view';
import { getStorage, setStorage } from '../../Storage/Storage';


const Home = (props) => {

    // Loader handler!
    const [loader, setLoader] = useState(false);

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
    const [url, setUrl] = useState(getStorage("req-url"));
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
      loaderStyle: "black",
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
    const crumbsView = localStorage.getItem(mainLang.crumb);
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

    // Request handler!
    const handleRequest = async (url, mode, body) => {
        setLoader(true);
        const data = {
            url: url,
            mode: mode,
            body: body,
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
        setPanelModel(prevState => ({...prevState, data: result.data.message, enableLoader: false}))
      }
    }

    // Get Function!
    function getFunction() {
        const storage = localStorage.getItem(mainLang.crumb);
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
    
    // Show child view for the panel view!
    function _showChildView(){
      if(panelModel.data !== undefined && panelModel.data.length === 0 && panelModel.enableLoader === false){
        return _showCommonLabel();
      }
      
      if(panelModel.enableLoader === false && panelModel.data !== undefined){
        return(
          panelModel.data.map((options, key) => {
            return(
              <CollectionView data = {options}/>
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
      return(
        <div className = "loader-spinner" style = {{marginTop: (panelModel.panelHeight) / 2.2 + "px"}}> 
            {onLoader(panelModel.loaderStyle)}
        </div>
      )
    }
    
    // Show common label!
    function _showCommonLabel(){
      return(
        <div className = "text-center" style = {{marginTop: (panelModel.panelHeight) / 2.2 + "px"}}>
          {commonLabel(mainLang.noHistory)}
        </div>
      )
    }

    // OnRender!
    useEffect(() => {
        updateHeight();
        fetchCollection();
    }, [footer])

    return (
        <div className = "brew-container">
          <div className = "flex-1">
            <PanelView panelData = {panelModel} getHeight = {(wrapper, sidepanel) => updatePanelHeight(wrapper, sidepanel)} showChildView = {() => _showChildView()} />
          </div>
          <div className = "flex-2">
            <div className = "home-container" style = {{paddingTop: "43px"}}>
                <Request request={setRequest} url={(data) => updateUrl(data)} mode={setMode}
                    options={mainLang.options} getFunction={() => getFunction()} params={key} valueUrl={url} valueParams={values} />
                <Pagination pagination={setPagination} catch={(item) => handleCatch(item)} />
                {/* <Editor height = {height} data = {setData} /> */}
                <Crumbs value={crumbs} height={height} data={setBody} keys={(data) => appendUrl(data)}
                    values={(data) => appendUrlValue(data)}
                    username={setUsername} password={setPassword} replaceValue={(key, value) => replaceValues(key, value)}
                    storage = {"body-code"}
                    />
                <Responses footer={setFooter} result={response} loader={loader} />
            </div>
          </div>
        </div>
    )
}

export default Home;