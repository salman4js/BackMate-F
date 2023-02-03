import React, { useState, useEffect, useRef } from 'react';
import { mainLang } from './lang';
import Header from '../Header/Header';
import Request from '../Requests/Request';
import Crumbs from '../NavCrumbs/Crumbs';
import Responses from '../Response/Response';
import Pagination from '../Pagination/Pagination';
import { Handler } from '../../Functions/Functions';

const Main = () => {

    // Loader handler!
    const [loader, setLoader] = useState(false);

    // Height calculation handler for the elements!
    const [header, setHeader] = useState();
    const [request, setRequest] = useState();
    const [pagination, setPagination] = useState();
    const [footer, setFooter] = useState();

    // Data handler for the params container!
    // Input handler for the params container!
    const [key, setKey] = useState("");
    const [values, setValues] = useState("");

    // Data handler for body container!
    // Input handler for the body container!
    const [url, setUrl] = useState("");
    const [mode, setMode] = useState();
    const [body, setBody] = useState("");

    // Height of the main parent container!
    const mainRef = useRef(null);

    // Set the editor height!
    const [height, setHeight] = useState();

    // Respons handler!
    const [response, setResponse] = useState("");

    // Pagination Child container catch handler!
    //const defaultCrumb = "Body";
    const crumbsView = localStorage.getItem(mainLang.crumb);
    const [crumbs, setCrumbs] = useState(crumbsView);
    const handleCatch = (val) => {
        localStorage.setItem(mainLang.crumb, val);
        setCrumbs(val);
    }

    // Request handler!
    const handleRequest = async (url, mode, body) => {
        setLoader(true);
        const data = {
            url: url,
            mode: mode,
            body: body
        }
        const result = await Handler(data);
        if (result.status === 200) {
            setResponse(result.data);
            setLoader(false);
        } else {
            // Error handling!
        }
    }

    // Update height of the code editor!
    function updateHeight() {
        if (footer !== undefined) {
            const mainElem = mainRef.current.offsetHeight; //  TODO: Comeup with a better calculation for this part!
            const topElem = header + pagination + request;
            setHeight(footer + topElem + mainElem);
        } else {
            return;
        }
    }

    // Get Function!
    function getFunction(){
        const storage = localStorage.getItem(mainLang.crumb);
        if(storage === mainLang.body || storage === mainLang.params){
            handleRequest(url+key+values, mode, body);
        } 
    }

    // Constructor!
    useEffect(() => {
        if(localStorage.getItem(mainLang.crumb) === null){
            localStorage.setItem(mainLang.crumb, mainLang.body);
        }
        updateHeight();
    }, [footer])

    return (
        <div ref={mainRef}>
            <Header header={setHeader} />
            <Request request={setRequest} url = {setUrl} mode = {setMode}
            options={mainLang.options} getFunction = {() => getFunction()} params = {key} valueUrl = {url + key + values} valueParams = {values}/>
            <Pagination pagination={setPagination} catch={(item) => handleCatch(item)} />
            {/* <Editor height = {height} data = {setData} /> */}
            <Crumbs value={crumbs} height={height} data={setBody} keys = {setKey} values = {setValues} />
            <Responses footer={setFooter} result={response} loader={loader} />
        </div>
    )
}

export default Main;