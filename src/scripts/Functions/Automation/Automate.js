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
        const body = data.body;
        const params = {
            url: url,
            mode: method,
            body: body
        }
        return params;
    } catch (err) {
        console.log("Error occured in extracting the params", err);
    }
}

// Used to read all the keys and value for the response and the expected value!
export function responseHelpers(result, helperArr, resp) {
    getProp(result, helperArr, resp)
} 


function getProp(data, helperArr, resp){
    data.map((options, key) => {
        const newArr = new Array();
        traverseJSON(options, newArr, helperArr, resp);
        
        if(newArr.length > 0){
          var loopResult = [...new Set(newArr)]; // Added to remove the duplicate value in case of array of multiple objects in the response!
          helperArr.push(loopResult);
        }
    })
    
}

function traverseJSON(obj, newArr, helperArr, resp) {
    if(!obj) return;
    if (obj.constructor === ({}).constructor) {
        Object.keys(obj).forEach((key,idx)=>{
            setValue(key, resp, helperArr, newArr);
            traverseJSON(obj[key], newArr, helperArr, resp)
        }
        );

    } else if (Array.isArray(obj)) {
        obj.forEach((item) => {
            traverseJSON(item, newArr, helperArr, resp)
        })
    }
}

// Push value into checking array!
function setValue(key, resp, helperArr, newArr){
  if(resp){
    newArr.push(key);
  } else {
    helperArr.push(key);
  }
}


// Check for array and iteratable!
function checkArray(value){
  const isArray = Array.isArray(value);
  if(isArray){
    return value.length > 0 ? true : false;
  } else {
    return true;
  }
}

// Checking equal value for propertyCheck!
export async function getObject(response, expected){
  // Check for the nested objects!
  var respObj = await checkObject(response);
  var expectedObj = await checkObject(expected);
  
  try{
    var responseValue = Object.keys(response);
    var expectedValue = Object.keys(expected);
    
    assert.deepStrictEqual(responseValue.sort(), expectedValue.sort(), "Values doesn't match!");    
    return {success: true, respObj: respObj, expectedObj: expectedObj};
    
  } catch(err){
    return {success: false, actualResult: responseValue, expectedResult: expectedValue}
  }
}

// Equal value for objects check!
export function isValueCheck(value, helperArr, resp){
  responseHelpers(value, helperArr, resp)
}

// Check properties of the object value in the response!
export function checkEqual(response, expected){
  var failedTest = [];
  
  for(let i = 0; i <= response.length - 1; i++){
    if(!_.isEqual(response[i].sort(), expected.sort())){
      const failed = {
        expectedResult: expected,
        actualResult: response[i]
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




