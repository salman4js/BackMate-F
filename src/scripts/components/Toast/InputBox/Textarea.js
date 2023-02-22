import React from 'react';
import MiniToast from '../miniToast/miniToast';
import './Textarea.css';

const Textarea = (props) => {
  
  return (
    <div className = "bottom-align">
        <input className = "form-control" type = "name" placeholder = {props.placeholder} value = {props.value} onChange = {(e) => props.data(e.target.value)} />
        {
          props.error !== undefined ? (
            <MiniToast message = {props.error} />
          ) : (
            null
          )
        }
    </div>
  )
}

export default Textarea;