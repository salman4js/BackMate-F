import React from 'react';
import './common.view.functions.css';
import { getInlineStyle } from '../common.functions';
import Loader from '../../../components/Loader/loader.view';

// Spinner!
export function onLoader(loaderOptions){
  return(
    <div className = "loader-spinner" style = {getInlineStyle(loaderOptions)}>
      <Loader data = {loaderOptions} />
    </div>
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