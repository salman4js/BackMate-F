import React, {useState} from 'react';
import ParamsBuilder from './ParamsBuilder';
import { crumbsLang } from '../NavCrumbs/lang';
import '../NavCrumbs/Crumbs.css';
import './Params.css'

const ParamsEditor = (props) => {

  function handleKeyValue(data){
    props.values(data);
  }

  function handleKeyData(data){
    props.keys(data);
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
        <ParamsBuilder keys = {(data) => handleKeyData(data)} value = {(data) => handleKeyValue(data)} />
      </div>
    )
  }
}

export default ParamsEditor;