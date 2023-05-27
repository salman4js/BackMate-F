const axios = require("axios");
const brewDate = require('brew-date');
import { restResource } from '../Functions/RestResources/rest.resource';
import { getUserId } from '../Functions/CommonFunctions/common.functions';

// Login controller!
export async function loginUser(data){
  try{
    const result = await axios.post(restResource.loginUser, data)
    return result.data;
  } catch(err){
    return {success: false, message: "Please check your username and password!"}
  }
}

// Save reports controller!
export async function saveReport(data){
  try{
    const result = await axios.post(restResource.addReport, data);
    return result;
  } catch(err){
    return {status: "unknown", success: false, message: "Some Internal Error occured"}
  }
}

// Get all the reports controller!
export async function getAllReports(){
  
  const data = {
      userId : getUserId()
  }
  
  try{
    const result = await axios.post(restResource.getReport, data);
    return result;
  } catch(err){
    return {status: "unknown", success: false, message: "Error while fetching!"}
  }
}

// Add API collection to the server for history!
export async function addCollection(params){
  
  var currentUserId = getUserId();
  
  // Form the neccessary options!
  params['userId'] = currentUserId;
  params['date'] = brewDate.getFullDate("yyyy/mm/dd");
  
  try{
    const isAdded = await axios.post(restResource.addCollection, params);
    return isAdded.data;
  } catch(err) {
    return errorHandler(err);
  }
}

// Get all the collection from the server!
export async function getCollection(){
  var params = {};
  // Form the neccessary params!
  params['userId'] = getUserId();
    
  try{
    const allCollections = await axios.post(restResource.getCollection, params);
    return allCollections;
  } catch(err){
    return errorHandler(err);
  }
}


// error handler function for API calls!
function errorHandler(err){
  if(err.response && err.response.status){
    return err.response;
  }
}
