import React, {useState} from 'react';
import { paginationOptions } from '../Pagination/lang';
import Editor from '../CodeEditor/Editor';
import Auth from '../Authorization/Auth';
import ParamsEditor from '../ParamsEditor/ParamsEditor';

const Crumbs = (props) => {

    // Editor container for the parent!
    const handleEditorData = (data) => {
        props.data(data);
    }

    // Handle replace!
    function handleReplace(key, value){
        props.replaceValue(key, value)
    }
    
  
    if(props.value === paginationOptions.body){
        return(
            <Editor height = {props.height} data = {(data) => handleEditorData(data)} />
        )
    } else if(props.value === paginationOptions.params){
        return(
            <ParamsEditor height = {props.height} keys = {props.keys} values = {props.values} replace = {(key, value) => handleReplace(key, value)} />
        )
    } else if(props.value === paginationOptions.authorization){
        return(
            <Auth height = {props.height} username = {props.username} password = {props.password} />
        )
    }
}

export default Crumbs;