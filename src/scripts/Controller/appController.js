const axios = require("axios");
const url = "http://localhost:3002"

export async function loginUser(data){
  try{
    const result = await axios.post(`${url}/loginuser`, data)
    return result.data;
  } catch(err){
    return {success: false, message: "Please check your username and password!"}
  }
}

export async function saveReport(data){
  try{
    const result = await axios.post(`${url}/addreport`, data);
    return result;
  } catch(err){
    return {status: "unknown", success: false, message: "Some Internal Error occured"}
  }
}