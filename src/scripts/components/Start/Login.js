import React, {useState} from 'react';
import {mainLang} from '../Main/lang';
import { setStorage, clearStorage, defaultStorage } from '../../Storage/Storage';
import Toast from '../Toast/Toast';
import {Link, useNavigate} from 'react-router-dom';
import { loginUser } from '../../Controller/appController';
import './Login.css'

const Login = () => {

    let navigate = useNavigate();

    // Error toast handler!
    const [toast, setToast] = useState({
      error: false,
      errorText: undefined,
      alignment: undefined,
      onHide: handleClose
    });
    
    // Close the toast message!
    function handleClose(){
      setToast(prevState => ({...prevState, error: false, errorText: undefined}))
    }
    
    // trigger the toast message!
    function _triggerToast(value, message){
      setToast(prevState => ({...prevState, error: value, errorText: message}))
    }

    // Input handler
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const processData = async (e) => {
        // Clear out the old storage data!
        clearStorage();
        e.preventDefault();
        const data = {
            email: email,
            password : password
        }        

        // Assign the dafault storafe system for the Home cabinet!
        const options = [1]
        const defaultValue = []
        const defaultSet = {
            "body-code" : "",
            "Crumbs": mainLang.body,
            "params-options": JSON.stringify(options),
            "landing-page": mainLang.landingPage,
            "req-url": "",
            "current-directory": mainLang.home,
            "openFile" : defaultValue
        }

        const result = await loginUser(data);
        if(result.success){
            // Adding user id to the default set to store it in the database!
            defaultSet['userId'] = result.userid;
            setEmail("");
            setPassword("");
            // Handling mandatory local storage memory!
            defaultStorage(defaultSet);
            navigate("/core", {replace:  true})
        } else {
            _triggerToast(true, result.message);
        }
    }


    return (
        <div className = "login-container">
            <div className="text-center">
            <div className="heading-top">
                <h1 className = "branding-logo">
                    BackMate
                </h1>
                <p>
                    | Powered by Brew
                </p>
            </div>
            <div className="text-center">
                <div className="loginSection">
                    <form>
                        <div className="form-group">
                            <br />
                            <br />
                            <input type="text" className="form-control-inline form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Id" name = {email} value = {email} onChange = {(e) => setEmail(e.target.value)} />
                            <br />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            <br />
                            <input type="password" className="form-control-inline form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password" name = {password} value = {password} onChange = {(e) => setPassword(e.target.value)} />
                        </div>
                        <br />
                        <br />
                        <div className="submitButton text-center">
                            <button className="btn btn-outline-success" onClick = {(e) => processData(e)} > Get Me In! </button>
                            <br />
                            <br />
                            {
                                toast.error === false ? (
                                    <div>
                                    </div>
                                ) : (
                                    <Toast show = {toast.error} message = {toast.errorText} data = {toast} />
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login;