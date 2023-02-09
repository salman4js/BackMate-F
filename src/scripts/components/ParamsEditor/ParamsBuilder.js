import React, { useEffect, useState } from 'react';
import { crumbsLang } from '../NavCrumbs/lang';
import './Params.css';
import { getStorage, setStorage } from '../../Storage/Storage';


const ParamsBuilder = (props) => {

    // Handling input check box!
    const [isChecked, setIsChecked] = useState(false);
    function handleSelected() {
        setIsChecked(option => {
            const val = option;
            return !val;
        })
        
        // Updating the local storage for value persistant!
        setStorage(`params-key${props.options}`, tempKey);
        setStorage(`params-value${props.options}`, tempValue);

        if (isChecked) {
            setStorage(`params-checkbox${props.options}`, false);
            props.replace(tempValue);
        } else {
            updateValue();
        }
    }

    function updateValue() {
        if (tempKey !== "" && tempValue !== "") {
            // Handling the local memory for the input check box!
            setStorage(`params-checkbox${props.options}`, true);
            setValues();
        } else {
            activateToast();
        }
    }

    const [tempKey, setTempKey] = useState("");
    const [tempValue, setTempValue] = useState("");
    function handleKeys(e, opt) {
        setTempKey(val => {
            const value = e;
            setStorage(`params-key${opt}`, e);
            return value;
        })
    }

    function handleValues(e, opt) {
        setTempValue(val => {
            const value = e;
            setStorage(`params-value${opt}`, e);
            return value;
        })
    }

    function setValues() {
        // Updating the local state here!
        props.keys(tempKey, props.options);
        props.value(tempValue, props.options);
    }

    function activateToast() {
        if (!isChecked) {
            props.error(true);
            props.errorTxt(crumbsLang.paramsError);
        } else {
            return;
        }
    }

    function updateState() {
        setTempKey(getStorage(`params-key${props.options}`));
        setTempValue(getStorage(`params-value${props.options}`));

        // Updating the checkbox value!
        setIsChecked(getStorage(`params-checkbox${props.options}`))
    }

    useEffect(() => {
        if (getStorage(`params-value${props.options}`) !== null) {
            updateState();
        }
    }, [])


    return (
        <tr>
            <td>
                <input type="checkbox" id="paramsCheckbox" checked={getStorage(`params-checkbox${props.options}`) === 'true' ? true : false} className="table-view" onClick={() => handleSelected()} />
            </td>
            <td>
                <input type="email" class="form-control form-control-sm" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Enter Your Key"
                    value={(getStorage(`params-key${props.options}`) === undefined ? tempKey : getStorage(`params-key${props.options}`))} onChange={(e) => handleKeys(e.target.value, props.options)} />
            </td>
            <td>
                <input type="email" class="form-control form-control-sm" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Enter Your Value"
                    value={(getStorage(`params-value${props.options}`) === undefined ? tempKey : getStorage(`params-value${props.options}`))} onChange={(e) => handleValues(e.target.value, props.options)} />
            </td>
        </tr>
    )
}

export default ParamsBuilder