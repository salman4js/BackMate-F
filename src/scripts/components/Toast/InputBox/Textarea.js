import React from 'react';
import './Textarea.css'

const Textarea = (props) => {
  return (
    <div className = "bottom-align">
        <input className = "form-control" type = "name" placeholder = {props.placeholder} />
    </div>
  )
}

export default Textarea;