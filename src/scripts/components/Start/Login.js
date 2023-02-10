import React, {useState} from 'react';
import {mainLang} from '../Main/lang';
import { setStorage, clearStorage } from '../../Storage/Storage';
import Toast from '../Toast/Toast';
import {Link, useNavigate} from 'react-router-dom';
import { loginUser } from '../../Controller/authController';
import './Login.css'

const Login = () => {

    let navigate = useNavigate();

    // Error toast handler!
    const [error, setError] = useState(false);
    const [errortext, setErrortext] = useState();
    const handleClose = () => {
        setError(false);
        setErrortext("")
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
        const result = await loginUser(data);
        if(result.success){
            setEmail("");
            setPassword("");
            // Handling important local memory for page persistant!
            setStorage(mainLang.bodyCode, ""); // Setting this as a empty string for the code editor!
            setStorage(mainLang.crumb, mainLang.body); // Seeting the body editor as the default value for the landing page!
            const options = [1];
            setStorage(mainLang.paramsOptions, JSON.stringify(options)); // Setting this array as the one for the params container!
            // Navigate to the next page!
            navigate("/core", {replace:  true})
        } else {
            setError(!error);
            setErrortext(result.message);
        }
    }


    return (
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
                                error === false ? (
                                    <div>
                                    </div>
                                ) : (
                                    <Toast show = {error} message = {errortext} handleClose = {() => handleClose()} />
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;