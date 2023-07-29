import React from 'react';

const Loader = (props) => {
  
  // Get the proper className based on the props!
  function getClassName(){
    return props.data?.loaderSize === 'small' ? "spinner-border spinner-border-sm" : "spinner-border"
  }
  
  return(
    <div>
      <div class="text-center">
        <div className = {getClassName()} role="status" style = {{color: props.data?.color}}>
        </div>
      </div>
    </div>
  )
}

export default Loader;