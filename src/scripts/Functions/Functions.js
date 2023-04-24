const axios = require("axios");
import { readJson, extractExpected, paramsExtractor, responseHelpers, getCountCase, isEqual, isValueCheck, checkEqual } from "./Automation/Automate";

// Response Array!
var responseArr = [];

// Expected Value Array!
var expectedValueArr = [];

// GET method for API call
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

// POST method for API call
async function Post(params){
    const result = await axios.post(`${params.url}`, params.body);
    return result;
}

// DELETE method for API call
async function Delete(params){
    const result = await axios.delete(`${params.url}`);
    return result;
}

// API call handler functions!
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
    const expectedValue = extractExpected(result);
    const params = paramsExtractor(result);
    const automate = await Handler(params);
    const countCase = getCountCase(data);
    const propertyCheck = isEqual(automate.data, expectedValue);
    if(propertyCheck){
      // const valueCheckForResponse = isValueCheck(automate.data, responseArr, true);
      const valueCheckForExpected = isValueCheck(expectedValue, expectedValueArr, false);
    } else {
      return {success: false, message: "Properties doesn't match!"}
    }
}