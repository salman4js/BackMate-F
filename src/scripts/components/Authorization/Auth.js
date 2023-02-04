import React, {useState} from 'react';
import { setStorage, getStorage } from '../../Storage/Storage';
import { crumbsLang } from '../NavCrumbs/lang';
import './Auth.css';

const Auth = (props) => {

    function handleUsername(val){
        // Handle Memory Storage!
        setStorage("auth-username", val);
        props.username(val);
    }

    function handlePassword(val){
        // Handle Memory Storage!
        setStorage("auth-password", val);
        props.password(val);
    }


    if (props.height === undefined) {
        return (
            <div className="text-center">
                {crumbsLang.loader}
            </div>
        )
    } else {
        return (
            <div className="body-container" style={{ height: props.height + "px" }}>
                {/* Have to work on inside header for all the authorization capabilies */}
               <div className = "text-center brew-sm-title">
                    Basic Auth
               </div>
                <div className="text-center center auth-section">
                    <div className="form-group">
                        <label style={{ color: 'white', marginRight: "20px" }}> Username </label>
                        <input type="text" className="form-control-inline" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Id" 
                        value = {getStorage("auth-username")} onChange = {(e) => handleUsername(e.target.value)}/>
                        <br />
                        <br />
                        <label style={{ color: "white", marginRight: "20px" }}> Password </label>
                        <input type="password" className="form-control-inline" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password"
                        value = {getStorage("auth-password")} onChange = {(e) => handlePassword(e.target.value)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;