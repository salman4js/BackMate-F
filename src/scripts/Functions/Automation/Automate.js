const fs= require('fs');
const pathModule = require('path');

export async function readJson(data){
    try{
        const fileContent = fs.readFileSync(pathModule.join(data)).toString();
        return JSON.parse(fileContent);
    } catch(err){
        console.log("Error occured in reading the JSON file!", err)
    }
}

export async function extractExpected(data){
    try{
        return data.expectedValue;
    } catch(err){
        console.log("Error occured while extracting expected value!")
    }
}

export async function paramsExtractor(data){
    try{
        const url = data.url;
        const method = data.method;
        const params = {
            url : url,
            mode : method
        }
        return params;
    } catch(err){
        console.log("Error occured in extracting the params", err);
    }
}

export async function checkExpected(result, value){
    console.log(result, value);
}

