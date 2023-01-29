import React, {useState, useRef, useEffect} from 'react';
import '../../App.css';

const Request = (props) => {

    // Input handler!
    const [url, setUrl] = useState();
    const [mode, setMode] = useState();
    

    // Height of the element handler!
    const requestRef = useRef(null);

    // Constructor!
    useEffect(() => {
        props.request(requestRef.current.offsetHeight);
    }, [])

    return (
        <div className="input-group-prepend" ref = {requestRef}>
            <select class="form-control" style = {{width: '120px'}} onChange = {(e) => setMode(e.target.value)}>
                <option selected value="0">Choose...</option>
                {
                    props.options.map((item,key) => {
                        return(
                            <option>{item}</option>
                        )
                    })
                }
            </select>
            <input type="text" class="form-control" id="exampleInputEmail1" 
            aria-describedby="emailHelp" placeholder="Enter your request url" name = {url} value = {url} onChange = {(e) => setUrl(e.target.value)} />
            <button className="btn btn-success" style = {{width: '120px'}} onClick = {() => props.handleRequest(url, mode, props.data)}>
                Send
            </button>
        </div>
    )
}

export default Request;