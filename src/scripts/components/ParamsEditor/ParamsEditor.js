import React, {useState} from 'react';
import ParamsBuilder from './ParamsBuilder';
import { crumbsLang } from '../NavCrumbs/lang';
import '../NavCrumbs/Crumbs.css';
import './Params.css'

const ParamsEditor = (props) => {

  function handleDataValue(data){
    if(data.length === 0){
      props.values("");
    } else {
      props.values("="+data);
    }
  }

  function handleDataKey(data){
    if(data.length === 0){
      props.keys("");
    } else {
      props.keys("?"+data);
    }
  }


  if (props.height === undefined) {
    return (
      <div className="text-center">
        <div className='bottom-40'>
          {crumbsLang.loader}
        </div>
      </div>
    )
  } else {
    return (
      <div className = "body-container" style= {{height: props.height + "px"}}>
        <div className = "row bottom-40">
            <div className = "col brew-label">
              {crumbsLang.key}
            </div>
            <div className = "col brew-label">
              {crumbsLang.value}
            </div>
        </div>
        <ParamsBuilder keys = {(data) => handleDataKey(data)} value = {(data) => handleDataValue(data)} />
      </div>
    )
  }
}

export default ParamsEditor;