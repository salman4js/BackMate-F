import React, { useState } from 'react';
import './Params.css';
import { getStorage, setStorage } from '../../Storage/Storage';

const ParamsBuilder = (props) => {


    // Handling input check box!
    const [isChecked, setIsChecked] = useState(false);
    function handleSelected() {
        if (tempKey === null || tempValue === null) {
            console.log("This is getting called!")
            return;
        } else {
            setIsChecked(option => {
                const val = option;
                return !val;
            })
            setValues();
        }
    }

    const [tempKey, setTempKey] = useState("");
    const [tempValue, setTempValue] = useState("");
    function handleKeys(e, opt) {
        setTempKey(val => {
            const value = e;
            setStorage(`params-key${props.options}`, e);
            return value;
        })
    }

    function handleValues(e, opt) {
        setTempValue(val => {
            const value = e;
            setStorage(`params-value${props.options}`, e);
            return value;
        })
    }

    function setValues() {
        props.keys(tempKey, props.options);
        props.value(tempValue, props.options);
    }

    return (
        <tr>
            <td>
                <input type="checkbox" className="table-view" onClick={() => handleSelected()} />
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