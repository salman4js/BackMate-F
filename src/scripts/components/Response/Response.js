import React, {useRef, useEffect} from 'react';
import { lang } from './lang';
import './Response.css'

const Responses = (props) => {

    // Height of the element calculation handler!
    const footerRef = useRef(null);

    // Construstor!
    useEffect(() => {
        props.footer(footerRef.current.offsetHeight)
    }, [])


  if(props.loader === true){
    return(
        <div className = "footer response-space" ref = {footerRef}>
            <div className = "result-section text-center lang">
                {lang.loader}
            </div>
        </div>
    )
  } else {
    if(props.result.length === 0){
        return(
            <div className = "footer response-space" ref = {footerRef}>
                <div className = "result-section text-center lang">
                    {lang.default}
                </div>
            </div>
        )
    } else {
        return (
            <div className = "footer response-space" ref = {footerRef} style={{height: '350px'}}>
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