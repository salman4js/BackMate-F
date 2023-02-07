import React, { useEffect, useState } from 'react';
import { setStorage, getStorage } from '../../Storage/Storage';
import ParamsBuilder from './ParamsBuilder';
import { crumbsLang } from '../NavCrumbs/lang';
import '../NavCrumbs/Crumbs.css';
import './Params.css'

const ParamsEditor = (props) => {

  // Number of query params!
  const [options, setOptions] = useState(JSON.parse(getStorage("params-options")))

  function handleDataValue(data, node) {
    if (data.length === 0) {
      props.values("");
    } else {
      props.values("=" + data);
    }
  }

  function handleDataKey(data, node) {
    if (data.length === 0) {
      props.keys("");
    } else {
      props.keys(data, node);
    }
  }


  // Handle options!
  function handleShowMore() {
    // Calling the setStorage method synchronizingly to keep the updation stable
    setOptions(options => {
      const updatedOptions = [...options, options.length + 1];
      setStorage("params-options", JSON.stringify(updatedOptions));
      return updatedOptions;
    })
  }

  function handleShowLess() {
    if (options.length === 1) {
      return;
    } else {
      // Calling the setStorage method synchronizingly to keep the updaion stable
      setOptions(options => {
        const updatedOptions = options.slice(0, -1);
        setStorage("params-options", JSON.stringify(updatedOptions));
        return updatedOptions;
      })
    }
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
      <div className="overFlow-Paramseditor">
        <div className="body-container" style={{ height: props.height + "px" }}>
          <div className="container">
            <div className = "container">
                  <div className = "bottom-down">
                    <div className="btn btn-success side-align-right" onClick={() => handleShowMore()}>
                      {crumbsLang.showMore}
                    </div>
                    <div className="btn btn-secondary" onClick={() => handleShowLess()}>
                      {crumbsLang.showLess}
                    </div>
                  </div>
                <table style = {{width: "100%"}}>
                  <tr>
                    <td className = "brew-label">
                      
                    </td>
                    <td className = "brew-label">
                      {crumbsLang.key}
                    </td>
                    <td className = "brew-label">
                      {crumbsLang.value}
                    </td>
                  </tr>
                  {
                    options.map((item, key) => {
                      return (
                        <ParamsBuilder keys={(data, node) => handleDataKey(data, node)} value={(data, node) => handleDataValue(data, node)} options={item} />
                      )
                    })
                  }
                </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ParamsEditor;


