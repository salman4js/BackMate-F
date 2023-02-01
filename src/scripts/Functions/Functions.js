const axios = require("axios");

async function Get(params){
    const result = await axios.get(`${params.url}`);
    return result;
}

async function Post(params){
    const result = await axios.post(`${params.url}`, params.body);
    return result;
}

async function Delete(params){
    const result = await axios.delete(`${params.url}`);
    return result;
}

export async function Handler(params){
    if(params.mode === 'GET'){
        const result = await Get(params);
        return result;
    } else if(params.mode === 'POST') {
        const result = await Post(params);
        return result;
    } else if(params.mode === 'DELETE'){
        const result = await Delete(params);
        return result;
    } else {
        console.log("Please choose a valid mode!")
    }
}