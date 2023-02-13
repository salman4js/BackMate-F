import React, { useState, useRef } from 'react';
import { mainLang } from './lang';
import Header from '../Header/Header';
import { getStorage } from '../../Storage/Storage';

// Importing pages!
import Home from '../Home/Home';
import WorkSpace from '../WorkSpace/WorkSpace/WorkSpace';


const Main = () => {

    // Header height state!
    const [header, setHeader] = useState();

    // Height of the parent container for all the pages!
    const mainRef = useRef(null);
    const workRef = useRef(null);

    // Handle selected cabinet!
    const [selected, setSelected] = useState(getStorage(mainLang.currentDirectory));

    // Render component selector!
    let root;
    if(selected === mainLang.home){
        root = <Home mainref={mainRef} header={header} />
    } else {
        root = <WorkSpace />
    }

    return (
        <div ref={mainRef}>
            <Header header={setHeader} select = {setSelected} />
            {root}
        </div>
    )
}

export default Main;