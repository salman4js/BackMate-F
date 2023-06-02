import React, { useState, useEffect } from 'react';
import { setStorage, getStorage } from '../../Storage/Storage';
import '../NavCrumbs/Crumbs.css'
import { crumbsLang } from '../NavCrumbs/lang';
import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';


const Editor = (props) => {

    // Save the code in ctrl + save!
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault();
                props.saveText();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });


    // Changes to make this component re-usable for the editor workspace!
    // Instanting storage variable!
    const storage = props.storage;
    
    // Determins if to parse the coming value or not!
    function getEditorValue(){ // Check this condition later and reduce it as it makes no sense!
      if(code.length > 0 && props.parse_it){
        return code
      } else if(code.length == 0 && props.parse_it) {
        return code;
      }
    }

    // Editor instance!
    const [code, setCode] = useState(getStorage(storage));

    if (props.height !== undefined) {

        return (
            <div>
                <CodeMirror
                    value={getEditorValue()}
                    height={props.height + "px"}
                    theme={dracula}
                    extensions={[javascript()]}
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