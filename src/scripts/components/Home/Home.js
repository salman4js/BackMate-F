import React, { useState, useEffect, useRef } from 'react';
import { mainLang } from '../Main/lang';
import Request from '../Requests/Request';
import Crumbs from '../NavCrumbs/Crumbs';
import Responses from '../Response/Response';
import Pagination from '../Pagination/Pagination';
import { Handler } from '../../Functions/Functions';
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
            const mainRef = props.mainref
            const mainElem = mainRef.current.offsetHeight; //  TODO: Comeup with a better calculation for this part!
            const topElem = props.header + pagination + request;
            setHeight(footer + topElem + mainElem);
        } else {
            return;
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

    // Constructor!
    useEffect(() => {
        updateHeight();
    }, [footer])

    return (
        <div>
            <Request request={setRequest} url={(data) => updateUrl(data)} mode={setMode}
                options={mainLang.options} getFunction={() => getFunction()} params={key} valueUrl={url} valueParams={values} />
            <Pagination pagination={setPagination} catch={(item) => handleCatch(item)} />
            {/* <Editor height = {height} data = {setData} /> */}
            <Crumbs value={crumbs} height={height} data={setBody} keys={(data) => appendUrl(data)}
                values={(data) => appendUrlValue(data)}
                username={setUsername} password={setPassword} replaceValue={(key, value) => replaceValues(key, value)} />
            <Responses footer={setFooter} result={response} loader={loader} />
        </div>
    )
}

export default Home;