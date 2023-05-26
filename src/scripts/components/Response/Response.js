import React, {useRef, useEffect, useState} from 'react';
import { onLoader, commonLabel } from '../../Functions/CommonFunctions/common.view/common.view.functions'
import ResponseController from './response.controller.view/response.controller.view'
import { lang } from './lang';
import './Response.css'

const Responses = (props) => {

    // Height of the element calculation handler!
    const footerRef = useRef(null);
    
    // Response controller state handler!
    const [controller, setController] = useState({
      mini: false,
      maxi: false,
      height: '350px'
    })
    
    // Response controller handler!
    function responseController(value){
      if(value === "maxi"){
        setController(prevState => ({...prevState, height: getMaxFooterHeight(), maxi: true, mini: false}))
      } else {
        setController(prevState => ({...prevState, height: getMinFooterHeight(), mini: true, maxi: false}))
      }
    }
    
    // Get maximium footer height!
    function getMaxFooterHeight(){
      return (calculateResponseSpaceHeight() * 2) + "px"
    }
    
    // Get minimium footer height!
    function getMinFooterHeight(){
      return ((calculateResponseSpaceHeight() / 2) + "px");
    }
    
    // calculate height of the response space for the loader calculation!
    function calculateResponseSpaceHeight(){
      try{
        const footerHeight = footerRef.current.offsetHeight;
        return footerHeight
      } catch(err){
        console.warn("_response view renderer")
      }
    }

    // Construstor!
    useEffect(() => {
        props.footer(footerRef.current.offsetHeight)
    }, [controller.height])
    

  if(props.loader === true){
    return(
        <div className = "footer response-space" ref = {footerRef} style={{height: controller.height}}>
            <div className = "result-section text-center lang" style = {{marginTop: calculateResponseSpaceHeight() / 4 + "px"}}>
                <div className = "loader-spinner">
                  {onLoader()}
                </div>
            </div>
        </div>
    )
  } else {
    if(props.result.length === 0){
        return(
            <div className = "footer response-space" ref = {footerRef} style={{height: controller.height}}>
                <div>
                    <ResponseController onClick = {(value) => responseController(value)} />
                </div>
                <div className = "result-section text-center lang" style = {{marginTop: calculateResponseSpaceHeight() / 4 + "px"}}>
                    {lang.default}
                </div>
            </div>
        )
    } else {
        return (
            <div className = "footer response-space" ref = {footerRef} style={{height: controller.height}}>
                <div className = "sticky">
                  <ResponseController onClick = {(value) => responseController(value)} />
                </div>
                <div className = "result-section">
                    <pre>
                        {JSON.stringify(props.result, null, 4)}
                    </pre>
                </div>
            </div>
          )
    }
  }
}

export default Responses;