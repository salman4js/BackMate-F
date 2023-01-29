import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';


const Editor = (props) => {

    // Editor instance!
    const [code, setCode] = useState();

    if (props.height !== undefined) {

        return (
            <div>
                <CodeMirror
                    value={code}
                    height={props.height+"px"}
                    theme={dracula}
                    extensions= {[javascript()]}
                    onChange={(editor, change) => {
                        props.data(JSON.parse(editor))
                    }}
                />
            </div>
        )
    } else {
        return (
            <div className="text-center">
                Creating your code editor, Just a sec...
            </div>
        )
    }

}

export default Editor