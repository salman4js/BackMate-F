import React, {useEffect, useRef, useState} from 'react';
import { headerLang } from './lang';
import {Link, useNavigate} from "react-router-dom";
import './Header.css'

const Header = (props) => {

    // Height calculation handler for the element!
    const headerRef = useRef(null);

    // Constructor!
    useEffect(() => {
        props.header(headerRef.current.offsetHeight);
    }, [])

    return (
        <div class="header" ref = {headerRef}>
            <div class="header-left">
                <Link to = {'/'} className = "brew-header-title">{headerLang.home}</Link>
                <Link to = {"/"} className = "brew-header-title">{headerLang.workspace}</Link>
                <Link to = {'/'} className = "brew-header-title">{headerLang.collection}</Link>
            </div>
        </div>
    )
}

export default Header