import React from 'react';
import './Control.css';
import {lang} from './root/lang';

const Control = (props) => {

  return (
    <div className="control-center-container" style={{ height: props.height + "px" }}>
      <div className = 'acting-keys-container'>
          <div className = "git-branch">
            <svg fill="#ffffff" width="22px" height="22px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5-d</title><path d="M416,160a64,64,0,1,0-96.27,55.24c-2.29,29.08-20.08,37-75,48.42-17.76,3.68-35.93,7.45-52.71,13.93V151.39a64,64,0,1,0-64,0V360.61a64,64,0,1,0,64.42.24c2.39-18,16-24.33,65.26-34.52,27.43-5.67,55.78-11.54,79.78-26.95,29-18.58,44.53-46.78,46.36-83.89A64,64,0,0,0,416,160ZM160,64a32,32,0,1,1-32,32A32,32,0,0,1,160,64Zm0,384a32,32,0,1,1,32-32A32,32,0,0,1,160,448ZM352,192a32,32,0,1,1,32-32A32,32,0,0,1,352,192Z"></path></g></svg>         
            {props.branch}*     
         </div>
      </div>
      <div className='control-key'>
        <div className = "button-trigger" onClick={() => props.triggerAutomate()}>
          <button className='control-key-config'>
            <svg fill = "green" xmlns="http://www.w3.org/2000/svg" width="22" height="24" class="bi bi-play-fill" viewBox="0 0 16 18">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
            {lang.automation}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Control;