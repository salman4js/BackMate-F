import React from 'react';
import { getStorage } from '../../Storage/Storage';

const ParamsBuilder = (props) => {

    return (
        <div className = "bottom-down">
            <div class="row">
                <div class="col">
                    <input type="email" class="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Enter Your Key" value = {getStorage(`params-key${props.options}`)} onChange = {(e) => props.keys(e.target.value, props.options)} />
                </div>
                <div class="col">
                    <input type="email" class="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Enter Your Value" value = {getStorage(`params-value${props.options}`)} onChange = {(e) => props.value(e.target.value, props.options)} />
                </div>
            </div>
        </div>
    )
}

export default ParamsBuilder