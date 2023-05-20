import React from 'react';

const PanelItemView = (props) => {
  return(
    <div className = "side-panel-items" onClick = {() => props.onClick(props.objectId)}>
       <span className = "brew-title-workspace side-align">
          {props.data}
       </span>
    </div>
  )
}

export default PanelItemView;