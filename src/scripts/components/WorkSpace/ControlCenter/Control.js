import React from 'react';
import './Control.css';

const Control = (props) => {
  console.log(props.height);
  return (
    <div className = "control-center-container" style = {{height : props.height + "px"}}>
        Control
    </div>
  )
}

export default Control;