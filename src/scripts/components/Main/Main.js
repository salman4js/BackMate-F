import React, { useState, useRef } from 'react';
import { mainLang } from './lang';
import Home from '../Home/Home';
import Header from '../Header/Header';
import { getStorage } from '../../Storage/Storage';



const Main = () => {

    // Header height state!
    const [header, setHeader] = useState();

    // Height of the main parent container!
    const mainRef = useRef(null);

    // Handle selected cabinet!
    const [selected, setSelected] = useState(getStorage(mainLang.landingPage));

    // Render component selector!
    let root;

    if(selected === mainLang.home){
        root = <Home mainref={mainRef} header={header} />
    } else {
        root = <p>Hey there!</p>
    }

    return (
        <div ref={mainRef}>
            <Header header={setHeader} select = {setSelected} />
            {root}
        </div>
    )
}

export default Main;