const fs = require('fs');
const pathModule = require('path');

export async function readJson(data) {
    try {
        const fileContent = fs.readFileSync(pathModule.join(data)).toString();
        return JSON.parse(fileContent);
    } catch (err) {
        console.log("Error occured in reading the JSON file!", err)
    }
}



export async function extractExpected(data) {
    try {
        return data.modelReturn;
    } catch (err) {
        console.log("Error occured while extracting expected value!")
    }
}



export async function paramsExtractor(data) {
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



export async function valueHelpers(result, value) {
    traverseJSON(result, value);
}


async function traverseJSON(obj, value) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            traverseJSON(obj[key], value);
        } else {
            // Check for the results matching with the expected values!
        }
    }
}

