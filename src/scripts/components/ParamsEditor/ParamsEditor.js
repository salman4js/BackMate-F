import React from 'react';
import { crumbsLang } from '../NavCrumbs/lang';
import '../NavCrumbs/Crumbs.css'

const ParamsEditor = (props) => {
  if(props.height === undefined){
    return(
        <div className = "text-center">
            <div className='bottom-40'>
                {crumbsLang.loader}
            </div>
        </div>
    )
  }
}

export default ParamsEditor;