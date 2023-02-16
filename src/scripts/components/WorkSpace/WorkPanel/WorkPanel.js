import React from 'react';
import './WorkPanel.css'

const WorkPanel = (props) => {
  return (
    <div className = "workpanel">
        <pre className= "content">
            {props.content}
        </pre>
    </div>
  )
}

export default WorkPanel;