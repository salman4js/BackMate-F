import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import './Header.css'

const Header = () => {
    return (
        <div class="header">
            <div class="header-left">
                <Link to = {'/'} className = "brew-header-title">Home</Link>
                <Link to = {"/"} className = "brew-header-title">WorkSpace</Link>
                <Link to = {'/'} className = "brew-header-title">Collections</Link>
            </div>
        </div>
    )
}

export default Header