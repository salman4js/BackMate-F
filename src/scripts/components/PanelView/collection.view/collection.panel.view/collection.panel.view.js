import React from 'react';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';


const CollectionPanelView = (props) => {
  
  const renderTooltip = (props) => (
    <Tooltip {...props}>Tooltip for the register button</Tooltip>
  );
  
  // Show item child view!
  function _showItemChildView(){
    return(
      props.data.map((options, key) => {
        return(
          <div className = "collection-sub-child-view" onClick = {() => props.subItemOnClick(options)}>
            <Tippy content = {options.url}>
              <div className = "side-panel-items">
                <span className = "brew-title-workspace side-align">
                  {options.method}
                </span>
                <span className = "brew-title-workspace side-align">
                  {options.url}
                </span>
              </div>
            </Tippy>
          </div>
        )
      })
    )
  }
  
  return(
    <div>
      {_showItemChildView()}
    </div>
  )
}

export default CollectionPanelView;