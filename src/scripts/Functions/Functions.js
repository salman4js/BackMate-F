const axios = require("axios");
const brewDate = require('brew-date');
import { readJson, extractExpected, paramsExtractor, responseHelpers, getCountCase, getObject, isValueCheck, checkEqual } from "./Automation/Automate";
import { restResource } from './RestResources/rest.resource.js';
import { addCollection } from '../Controller/appController'

// Response Array!
var responseArr = [];

// Expected Value Array!
var expectedValueArr = [];

// Failed Scenarios!
var failedScenarios = {};

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
    try{
      const result = await axios.post(`${params.url}`, params.body);
      return result;
    } catch(err){
      if(err.response && err.response.status){
        return err.response;
      }
    }
}

// DELETE method for API call
async function deleteResource(params){
    try{
      const result = await axios.delete(`${params.url}`, {data: params.body});
      return result;
    } catch(err){
      if(err.response && err.response.status){
        return err.response;
      }
    }
}

// API call handler functions!
export async function initiateRequest(params){
  const isAdded = await addCollection(params); // Add the API params to the collection!
  const response = await Handler(params);
  return response;
}

// Call this function from the initiate request function!
async function Handler(params){
    if(params.mode === 'GET'){
        const result = await Get(params);
        return result;
    } else if(params.mode === 'POST') {
        const result = await Post(params);
        return result;
    } else if(params.mode === 'DELETE'){
        const result = await deleteResource(params);
        return result;
    } else {
        console.log("Please choose a valid mode!")
    }
}

// Get story name!
function getDetails(data){
  return {storyName: data.Story_Name, authorName: data.Author_Name, scenarioName: data.Scenario, apiName: data.API_Name};
}

// Clear helper arr values!
function clearHelperArrMemory(){
  return new Promise((resolve, reject) => {
    while(responseArr.length > 0){
      responseArr.pop();
    }
    
    while(expectedValueArr.length > 0){
      expectedValueArr.pop();
    }
    resolve();
  })
}

// Automate Functions
export function Automate(data){
  return new Promise(async (resolve, reject) => {
    
      // Before we proceed with the automation, Its mandatory to clear the helperArr's 
      await clearHelperArrMemory();
        
      const result = await readJson(data);
      const storyDetails = getDetails(result);

      const expectedValue = extractExpected(result);
      const params = paramsExtractor(result);
      const automate = await Handler(params);
      const countCase = getCountCase(data);
      const propertyCheck = await getObject(automate.data, expectedValue);

      if(propertyCheck.success){
        const valueCheckForResponse = isValueCheck(propertyCheck.respObj, responseArr, true);
        const valueCheckForExpected = isValueCheck(propertyCheck.expectedObj, expectedValueArr, false);
        const getFailed = checkEqual(responseArr, expectedValueArr); // If any!
        
        // Once the automation gets completed, add those into failedScenarios Model!
        const failedCases = _populateModel(storyDetails, getFailed);
        resolve(failedCases);
      } else {
        
        const getFailed = [];
        getFailed.push(propertyCheck);
        
        const failedCases = _populateModel(storyDetails, getFailed); // Populate the failed cases into failedScenarios model.
        resolve(failedCases);
      }
  })
}

// Populate the failed scenario model!
function _populateModel(details, failedCases){
  failedScenarios['actualResult'] = failedCases[0].actualResult;
  failedScenarios['expectedResult'] = failedCases[0].expectedResult;
  failedScenarios['storyName'] = details.storyName;
  failedScenarios['apiName'] = details.apiName;
  failedScenarios['authorName'] = details.authorName;
  failedScenarios['scenarioName'] = details.scenarioName;
  return failedScenarios;
}