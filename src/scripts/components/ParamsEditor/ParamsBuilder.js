import React from 'react'

const ParamsBuilder = (props) => {

    return (
        <div>
            <div class="row">
                <div class="col">
                    <input type="email" class="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Enter Your Key" onChange = {(e) => props.keys(e.target.value)} />
                </div>
                <div class="col">
                    <input type="email" class="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Enter Your Value" onChange = {(e) => props.value(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default ParamsBuilder