import React, { useState, useRef, useEffect } from 'react';
import { mainLang } from '../Main/lang';
import '../../App.css';
import { getStorage, setStorage } from '../../Storage/Storage';

const Request = (props) => {

    // Height of the element handler!
    const requestRef = useRef(null);

    const value = props.valueUrl;
    
    function updateUrl(e){
        if(e.keyCode !== 8){
            props.url(e.target.value)
        }
    }
    
    // Get item for value persisten!
    function getItem(){
      const storageMethod = getStorage('req-method');
      if(storageMethod !== null){
        return storageMethod;
      } else {
        return "Choose..."
      }
    }
    
    // Send the selected method name to parent component!
    function setMode(value){
      props.mode(value);
      setStorage('req-method', value);
    }

    // Constructor!
    useEffect(() => {
        props.request(requestRef.current.offsetHeight);
    }, [])

    return (
        <div className="input-group-prepend" ref={requestRef}>
            <select class="form-control" style={{ width: '120px' }} onChange={(e) => setMode(e.target.value)}>
                <option selected value="0">{getItem()}</option>
                {
                    props.options.map((item, key) => {
                        return (
                            <option>{item}</option>
                        )
                    })
                }
            </select>
            <input type="text" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Enter your request url" value={value} onChange={(e) => updateUrl(e)} />
            <button className="btn btn-success" style={{ width: '120px' }} onClick={() => props.getFunction()}>
                {mainLang.send}
            </button>
        </div>
    )
}

export default Request;