import React, {useState, useEffect, useRef} from 'react';
import Header from '../Header/Header';
import Request from '../Requests/Request';
import Editor from '../CodeEditor/Editor';
import Responses from '../Response/Response';
import Pagination from '../Pagination/Pagination';
import { Handler } from '../../Functions/Functions';

const Main = () => {

    // Request options!
    const options = ['GET', 'POST', 'PUT', 'DELETE']; // Import it from the server later!

    // Loader handler!
    const [loader, setLoader] = useState(false);

    // Height calculation handler for the elements!
    const [header, setHeader] = useState();
    const [request, setRequest] = useState();
    const [pagination, setPagination] = useState();
    const [footer, setFooter] = useState();

    // Data handler for params body container!
    const [data, setData] = useState("");

    // Height of the main parent container!
    const mainRef = useRef(null);
    const [main, setMain] = useState();


    // Set the editor height!
    const [height, setHeight] = useState();


    // Respons handler!
    const [response, setResponse] = useState("");

    // Pagination Child container catch handler!
    const handleCatch = (val) => {
        console.log(val)
    }

    // Request handler!
    const handleRequest = async (url, mode, body) => {
        setLoader(true);
        const data = {
            url : url,
            mode : mode,
            body: body
        }
        const result = await Handler(data);
        if(result.status === 200){
            setResponse(result.data);
            setLoader(false);
        } else {
            // Error handling!
        }
    }

    // Update height of the code editor!
    function updateHeight(){
        if(footer !== undefined){
            const mainElem = mainRef.current.offsetHeight; //  TODO: Comeup with a better calculation for this part!
            const topElem = header + pagination + request;
            setHeight(footer + topElem + mainElem);
        } else {
            return;
        }
    }

    // Constructor!
    useEffect(() => {
        updateHeight();
    }, [footer])

    return (
        <div ref = {mainRef}>
            <Header  header = {setHeader} />
            <Request request = {setRequest} handleRequest = {(url, mode, body) => handleRequest(url, mode, body)} options = {options} data = {data} />
            <Pagination pagination = {setPagination} catch = {(item) => handleCatch(item)}/>
            <Editor height = {height} data = {setData} />
            <Responses footer = {setFooter} result = {response} loader = {loader} />
        </div>
    )
}

export default Main;