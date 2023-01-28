const axios = require("axios");
const url = "http://localhost:3002"

export async function loginUser(data){
    const result = await axios.post(`${url}/loginuser`, data);
    return result.data;
}