import React from 'react';
import './miniToast.css'

const MiniToast = (props) => {
  return (
    <div className = "mini-viewer ">
        <p className = "mini-message">
            {props.message}
        </p>
    </div>
  )
}

export default MiniToast;