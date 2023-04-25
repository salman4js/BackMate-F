const fs = require('fs');
const pathModule = require('path');
const assert = require("assert"); // Importing assert for comparision!
const _ = require("lodash");

// Read the JSON value!
export async function readJson(data) {
    try {
        const fileContent = fs.readFileSync(pathModule.join(data)).toString();
        return JSON.parse(fileContent);
    } catch (err) {
        console.log("Error occured in reading the JSON file!", err)
    }
}

// Extract expected value from the model JSON
export function extractExpected(data) {
    try {
        return data.modelReturn;
    } catch (err) {
        console.log("Error occured while extracting expected value!")
    }
}

// Get count case from the model JSON value
export function getCountCase(data){
  try{
    return data.countCase;
  } catch(err){
    console.log("There is no count case in the JSON model!");
  }
}

// Extract the params method from the model JSON
export function paramsExtractor(data) {
    try {
        const url = data.url;
        const method = data.method;
        const params = {
            url: url,
            mode: method
        }
        return params;
    } catch (err) {
        console.log("Error occured in extracting the params", err);
    }
}

// Used to read all the keys and value for the response and the expected value!
export function responseHelpers(result, helperArr, resp) {
   traverseJSON(result, helperArr, resp)
} 

// Helper function for responseHelpers!
function traverseJSON(obj, helperArr, resp) {
    var newArr = new Array();
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            traverseJSON(obj[key], helperArr, resp);
        } else {
          if(resp){
            newArr.push(key);
          } else {
            helperArr.push(key);
          }
        }
    }
    
    // When we find the value of the object, push that separate arrays into the helperArr!
    if(newArr.length > 0){
      helperArr.push(newArr);
    }        
}

// Checking equal value for propertyCheck!
export async function getObject(response, expected){
  try{
    const responseValue = Object.keys(response);
    const expectedValue = Object.keys(expected);
    
    const respObj = await checkObject(response);
    const expectedObj = await checkObject(expected);
    
    assert.deepStrictEqual(responseValue.sort(), expectedValue.sort(), "Values doesn't match!");
    return {isCompleted: true, respObj: respObj, expectedObj: expectedObj};
    
  } catch(err){
    return false;
  }
}

// Equal value for objects check!
export function isValueCheck(value, helperArr, resp){
  responseHelpers(value, helperArr, resp)
}

// Check properties of the object value in the response!
export function checkEqual(response, expected){
  var failedTest = [];
  for(let resp in response){
    if(!_.isEqual(response[resp], expected)){
      const failed = {
        expected: expected,
        actualResult: response[resp]
      }
      
      failedTest.push(failed);
      
    }
  }
  return failedTest;
}

// Check if there are any object in the value response!
function checkObject(responseValue){
  return new Promise(function(resolve, reject){
    for(let key in responseValue){
      if(typeof responseValue[key] === "object"){
        resolve(responseValue[key]);
      }
    }
    resolve(null);
  })
}




