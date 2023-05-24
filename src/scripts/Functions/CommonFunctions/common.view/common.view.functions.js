import React from 'react';
import './common.view.functions.css';
import Loader from '../../../components/Loader/loader.view';


// Common UI functions!

// Spinner!
export function onLoader(data){
  return(
    <Loader data = {data} />
  )
}

// Common indicate label!
export function commonLabel(data){
  return(
    <div className = "common-label">
      {data}
    </div>
  )
}