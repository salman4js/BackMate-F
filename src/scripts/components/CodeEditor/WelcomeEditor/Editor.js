import React, {useEffect} from 'react';
import './Editor.css'

const EditorWelcome = (props) => {

  console.log(props.height);

  // Changing the state back!
  useEffect(() => {
    if(props.isReload !== false){
        props.reload(false);
    }
  }, [])

  return (
    <div className = "editor-container" style = {{height: props.height + "px"}}>
        <div className = "editor-content text-center" style = {{top: props.height / 2}}>
          <p className = "editor-preview-content">
            {props.message}
          </p>
        </div>
    </div>
  )
}

export default EditorWelcome;