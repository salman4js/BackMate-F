const axios = require("axios");

const Get = async (params) => {
    console.log(params.url);
    const result = await axios.get(`${params.url}`);
    return result;
}


export async function Handler(params){
    if(params.mode === 'GET'){
        const result = await Get(params);
        return result;
    } else {
        console.log("Please choose a valid mode!")
    }
}