const axios = require("axios");
import { readJson, extractExpected, paramsExtractor, responseHelpers, getCountCase, getObject, isValueCheck, checkEqual } from "./Automation/Automate";

// Response Array!
var responseArr = [];

// Expected Value Array!
var expectedValueArr = [];

// Failed Scenarios!
var failedScenarios = [];

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

// Get story name!
function getDetails(data){
  try{
    return {storyName: data.Story_Name, authorName: data.Author_Name, scenario: data.Scenario, apiName: data.API_Name};
  } catch(err){
    console.log("There is no story name");
  }
}


// Automate Functions
export async function Automate(data){
  
    const storyDetails = getDetails(data);
  
    const result = await readJson(data);
    const expectedValue = extractExpected(result);
    const params = paramsExtractor(result);
    const automate = await Handler(params);
    const countCase = getCountCase(data);
    const propertyCheck = await getObject(automate.data, expectedValue);
    if(propertyCheck.isCompleted){
      const valueCheckForResponse = isValueCheck(propertyCheck.respObj, responseArr, true);
      const valueCheckForExpected = isValueCheck(propertyCheck.expectedObj, expectedValueArr, false);
    } else {
      return {success: false, message: "Properties doesn't match!"}
    }
    
    const getFailed = checkEqual(responseArr, expectedValueArr);
}