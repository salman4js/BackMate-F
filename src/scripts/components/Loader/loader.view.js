import React from 'react';

const Loader = (props) => {
  return(
    <div>
      <div class="text-center">
        <div class="spinner-border" role="status" style = {{color: props.data}}>
        </div>
      </div>
    </div>
  )
}

export default Loader;