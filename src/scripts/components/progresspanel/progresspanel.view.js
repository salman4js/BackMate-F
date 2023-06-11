import React from 'react';
import './Progresspanel.css';

const ProgressPanel = (props) => {
  return(
    <div className = "progresspanel-view" style = {{marginLeft: `${props.position}px`}}>
      <span className = "progresspanel-message text-center">
        {props.message}
      </span>
    </div>
  )
}

export default ProgressPanel;