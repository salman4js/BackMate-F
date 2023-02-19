import React, {useEffect} from 'react';
import './Editor.css'

const EditorWelcome = (props) => {

  // Changing the state back!
  useEffect(() => {
    if(props.isReload !== false){
        props.reload(false);
    }
  }, [])

  return (
    <div className = "editor-container">
        {props.message}
    </div>
  )
}

export default EditorWelcome;