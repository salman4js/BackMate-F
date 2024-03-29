import React, {useState} from 'react';
import PanelItemView from '../panel.item/panel.item.view';
import CollectionPanelView from './collection.panel.view/collection.panel.view';
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
  
  // Enable sub child view!
  function _showSubChildView(){
    return(
      isExpanded && (
        <CollectionPanelView data = {props.data.links} subItemOnClick = {(status) => props.subItemOnClick(status)}  />
      )
    )
  }
  
  // Show child view!
  function _showChildView(){
    return(
      <PanelItemView data = {props.data.date} objectId = {props.data._id} onClick = {(objectId) => expandCollapseAction(objectId)} />
    )
  }
  
  return(
    <>
      {_showChildView()}
      {_showSubChildView()}
    </>
  )
}


export default CollectionView;