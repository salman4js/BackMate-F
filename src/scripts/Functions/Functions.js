const axios = require("axios");
import { readJson, extractExpected, paramsExtractor, checkExpected } from "./Automation/Automate";

async function Get(params){
   try{
    const result = await axios.get(`${params.url}`, {
        auth: {
            username: params.username,
            password: params.password
        } 
    });
    return result;
   } catch(err){
        if(err.response && err.response.status){
            return err.response
        }
   }
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


// Automate Functions
export async function Automate(data){
    const result = await readJson(data);
    const expectedValue = await extractExpected(result);
    const params = await paramsExtractor(result);
    const automate = await Handler(params);
    const endResult = await checkExpected(automate.data, expectedValue);
    console.log(endResult);
}