import React from 'react';

const ResponseController = (props) => {
  return(
    <div className = "response-controller-view">
      <div className = "response-controls">
        <div className = "row">
          <div className = "col-2">
            <div className = "response-controller-minimize" onClick = {() => props.onClick("mini")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"/>
            </svg>
            </div>
          </div>
          <div className = "col-2">
            <div className = "response-controller-maximize" onClick = {() => props.onClick("maxi")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-caret-up-square-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default ResponseController;


