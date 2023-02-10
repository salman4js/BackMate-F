import React, {useEffect, useRef} from 'react';
import './Header.css';
import { headerLang } from './lang';

const Header = (props) => {

    // Height calculation handler for the element!
    const headerRef = useRef(null);

    // Options mapping with the header lang file
    const options = headerLang;

    // Handle selection!
    function handleSelect(data){
        console.log(data)
        props.select(data);
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
        </div>
    )
}

export default Header