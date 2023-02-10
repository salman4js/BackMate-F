import React, {useEffect, useRef} from 'react';
import './Header.css';
import { headerLang } from './lang';
import { mainLang } from '../Main/lang';
import {Link, useNavigate} from 'react-router-dom';
import { clearStorage } from '../../Storage/Storage';

const Header = (props) => {

    // Initializing navigate route!
    let navigate = useNavigate();

    // Height calculation handler for the element!
    const headerRef = useRef(null);

    // Options mapping with the header lang file
    const options = headerLang;

    // Handle selection!
    function handleSelect(data){
        console.log(data)
        props.select(data);
    }

    // Handle universal logout!
    function handleLogout(){
        // Clear off the entire local storage!
        clearStorage();
        // Navigate to the login route!
        navigate("/", {replace: true});
    }

    // Constructor!
    useEffect(() => {
        props.header(headerRef.current.offsetHeight);
    }, [])

    return (
        <div class="header" ref = {headerRef}>
            <div className = "header-left">
                {
                    options.map((item, key) => {
                        return(
                            <a className = "brew-header-title" onClick = {() => handleSelect(item)}>
                                {item}
                            </a>
                        )
                    })
                }
            </div>
            <div className = "header-right">
                <Link to = {'/'} className = "brew-header-title" onClick={() => handleLogout()}>{mainLang.logout}</Link>
            </div>
        </div>
    )
}

export default Header