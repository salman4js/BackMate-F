const fs = require('fs');
const pathModule = require('path');
const assert = require("assert"); // Importing assert for comparision!

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
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            traverseJSON(obj[key], helperArr);
        } else {
          helperArr.push(key);
        }
    }
    
    // Check for the value if incase its a actual response!
    checkEqual(resp, helperArr);
    
}

// Checking equal value for propertyCheck!
export function isEqual(response, expected){
  try{
    const responseValue = Object.keys(response);
    const expectedValue = Object.keys(expected);
    
    assert.deepStrictEqual(responseValue.sort(), expectedValue.sort(), "Values doesn't match!");
    return true;
    
  } catch(err){
    return false;
  }
}

// Equal value for objects check!
export function isValueCheck(value, helperArr, resp){
  responseHelpers(value, helperArr, resp)
}

export function checkEqual(response, helperArr){
  console.log(response);
  if(response){
    console.log(helperArr)
  }
}




