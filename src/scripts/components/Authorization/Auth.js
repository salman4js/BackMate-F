import React, { useState } from 'react';
import { setStorage, getStorage } from '../../Storage/Storage';
import { crumbsLang } from '../NavCrumbs/lang';
import './Auth.css';

const Auth = (props) => {


    // Handle password visibility!
    const [isChecked, setIsChecked] = useState(false);

    function handleUsername(val) {
        // Handle Memory Storage!
        setStorage("auth-username", val);
        props.username(val);
    }

    function handlePassword(val) {
        // Handle Memory Storage!
        setStorage("auth-password", val);
        props.password(val);
    }

    // Handle checkbox!
    function handleCheckbox(){
        setIsChecked(!isChecked);
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
                <div className="text-center brew-sm-title">
                    {crumbsLang.basic}
                </div>
                <div className="text-center center auth-section">
                    <div className="form-group">
                        <label style={{ color: 'white', marginRight: "20px" }}> Username </label>
                        <input type="text" className="form-control-inline" placeholder = "Username"
                            value={getStorage("auth-username")} onChange={(e) => handleUsername(e.target.value)} />
                        <br />
                        <br />
                        <label style={{ color: "white", marginRight: "20px" }}> Password </label>
                        <input type={isChecked ? "text" : "password"} className="form-control-inline" placeholder="Password"
                            value={getStorage("auth-password")} onChange={(e) => handlePassword(e.target.value)} />
                        <div class="form-check side-align">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => handleCheckbox()} />
                                <label class="form-check-label" for="flexCheckDefault">
                                    {crumbsLang.checkbox}
                                </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;