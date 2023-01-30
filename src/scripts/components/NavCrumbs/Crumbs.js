import React, {useState} from 'react';
import { paginationOptions } from '../Pagination/lang';
import Editor from '../CodeEditor/Editor';
import ParamsEditor from '../ParamsEditor/ParamsEditor';

const Crumbs = (props) => {

    // Editor container for the parent!
    const handleEditorData = (data) => {
        props.data(data);
    }
  
    if(props.value === paginationOptions.body){
        return(
            <Editor height = {props.height} data = {(data) => handleEditorData(data)} />
        )
    } else if(props.value === paginationOptions.params){
        return(
            <ParamsEditor height = {props.height} />
        )
    }
}

export default Crumbs;