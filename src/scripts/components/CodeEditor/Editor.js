import React, { useState, useEffect } from 'react';
import { setStorage, getStorage } from '../../Storage/Storage';
import '../NavCrumbs/Crumbs.css'
import { crumbsLang } from '../NavCrumbs/lang';
import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';


const Editor = (props) => {


    // Changes to make this component re-usable for the editor workspace!
    // Instanting storage variable!
    const storage = props.storage;

    // Editor instance!
    const [code, setCode] = useState(JSON.stringify(getStorage(storage)));

    if (props.height !== undefined) {

        return (
            <div>
                <CodeMirror
                    value={JSON.parse(code)}
                    height={props.height+"px"}
                    theme={dracula}
                    extensions= {[javascript()]}
                    onChange={(editor, change) => {
                        setStorage(storage, editor);
                        props.data(editor)
                    }}
                />
            </div>
        )
    } else {
        return (
            <div className="text-center bottom-40">
                {crumbsLang.loader}
            </div>
        )
    }

}

export default Editor