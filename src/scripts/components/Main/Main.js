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
    const [key, setKey] = useState([]);
    const [values, setValues] = useState([]);

    // Data handler for body container!
    // Input handler for the body container!
    const [url, setUrl] = useState("");
    const [mode, setMode] = useState();
    const [body, setBody] = useState("");

    // Input handler for authorization container!
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            body: body,
            username: username,
            password: password
        }
        const result = await Handler(data);
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
        if(storage === mainLang.body || storage === mainLang.params || storage === mainLang.authorization){
            handleRequest(url+key+values, mode, body);
        } 
    }

    // Constructor!
    useEffect(() => {
        updateHeight();
    }, [footer])

    return (
        <div ref={mainRef}>
            <Header header={setHeader} />
            <Request request={setRequest} url = {setUrl} mode = {setMode}
            options={mainLang.options} getFunction = {() => getFunction()} params = {key} valueUrl = {url} valueParams = {values}/>
            <Pagination pagination={setPagination} catch={(item) => handleCatch(item)} />
            {/* <Editor height = {height} data = {setData} /> */}
            <Crumbs value={crumbs} height={height} data={setBody} keys = {setKey} values = {setValues} 
            username = {setUsername} password = {setPassword}/>
            <Responses footer={setFooter} result={response} loader={loader} />
        </div>
    )
}

export default Main;