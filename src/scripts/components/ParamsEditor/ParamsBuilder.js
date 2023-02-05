import React from 'react';
import { getStorage } from '../../Storage/Storage';

const ParamsBuilder = (props) => {

    return (
        <tr className = "bottom-down">
            <td >
                <input type="email" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Enter Your Key" 
                value={getStorage(`params-key${props.options}`)} onChange={(e) => props.keys(e.target.value, props.options)} />
            </td>
            <td>
                <input type="email" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Enter Your Value" 
                value={getStorage(`params-value${props.options}`)} onChange={(e) => props.value(e.target.value, props.options)} />
            </td>
            <td>
                <button className = "btn btn-secondary side-align-left side-align-right">
                    Add
                </button>
                <button className = "btn btn-danger">
                    Remove
                </button>
            </td>
        </tr>
    )
}

export default ParamsBuilder