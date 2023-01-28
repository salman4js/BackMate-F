import React from 'react';
import './App.css';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
// Importing pages!
import Login from './components/Start/Login';
import Main from './components/Main/Main';



export default function App(){
    return(
       <div>
            <Router>
                <Routes>
                    <Route path = "/" exact element = {<Login />} />
                    <Route path = "/core" exact element = {<Main />} />
                </Routes>
            </Router>
       </div>
    )
}