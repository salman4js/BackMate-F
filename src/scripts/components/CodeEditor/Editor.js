import React, { useState, useEffect } from 'react';
import { setStorage, getStorage } from '../../Storage/Storage';
import '../NavCrumbs/Crumbs.css'
import { crumbsLang } from '../NavCrumbs/lang';
import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';


const Editor = (props) => {


    // Update the value for everytime the file has been opened in the side panel!
    useEffect(() => {
        setCode(getStorage("body-code"))
    }, [code])

    // Editor instance!
    const [code, setCode] = useState(getStorage("body-code"));

    if (props.height !== undefined) {

        return (
            <div>
                <CodeMirror
                    value={code}
                    height={props.height+"px"}
                    theme={dracula}
                    extensions= {[javascript()]}
                    onChange={(editor, change) => {
                        setStorage("body-code", editor);
                        props.data(JSON.parse(editor))
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