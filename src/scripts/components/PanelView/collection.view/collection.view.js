import React, {useState} from 'react';
import './collection.view.css';


const CollectionView = (props) => {
  
  // State handler for expand and collapse action!
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Expand Action!
  function expandCollapseAction(){
    if(isExpanded){
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
    }
  }
  
  return(
    <div>
      <div className = "side-panel-collection-items" onClick = {() => expandCollapseAction()}>
         <span className = "brew-title-workspace side-align">
            Date
         </span>
      </div>
      {isExpanded && (
        <div className = "side-panel-items">
          <div className = "brew-title-workspace side-align">
            Hey there
          </div>
        </div>
      )}
    </div>
  )
}


export default CollectionView;