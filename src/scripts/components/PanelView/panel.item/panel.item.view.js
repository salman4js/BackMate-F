import React from 'react';

const PanelItemView = (props) => {
  return(
    <div className = "side-panel-items">
     <span className = "brew-title-workspace side-align" onClick = {() => props.onClick(props.objectId)}>
        {props.data}
     </span>
    </div>
  )
}

export default PanelItemView;