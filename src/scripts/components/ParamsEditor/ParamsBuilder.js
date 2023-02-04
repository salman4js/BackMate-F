import React from 'react';
import { getStorage } from '../../Storage/Storage';

const ParamsBuilder = (props) => {

    return (
        <div>
            <div class="row">
                <div class="col">
                    <input type="email" class="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Enter Your Key" value = {getStorage("params-key")} onChange = {(e) => props.keys(e.target.value)} />
                </div>
                <div class="col">
                    <input type="email" class="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Enter Your Value" value = {getStorage("params-value")} onChange = {(e) => props.value(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default ParamsBuilder