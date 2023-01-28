import React, {useState} from 'react';
import Header from '../Header/Header';
import Request from '../Requests/Request';
import Responses from '../Response/Response';
import Pagination from '../Pagination/Pagination';
import { Handler } from '../../Functions/Functions';

const Main = () => {

    // Request options!
    const options = ['GET', 'POST', 'PUT']; // Import it from the server later!

    // Loader handler!
    const [loader, setLoader] = useState(false);

    // Respons handler!
    const [response, setResponse] = useState("");

    // Request handler!
    const handleRequest = async (url, mode) => {
        setLoader(true);
        const data = {
            url : url,
            mode : mode
        }
        const result = await Handler(data);
        if(result.status === 200){
            setResponse(result.data);
            setLoader(false);
        } else {
            // Error handling!
        }
    }

    return (
        <div>
            <Header />

            <Request handleRequest = {handleRequest} options = {options} />
            <Pagination />
            <Responses result = {response} loader = {loader} />
        </div>
    )
}

export default Main;