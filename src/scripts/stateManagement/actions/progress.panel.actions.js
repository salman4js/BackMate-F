// Create new global message with required params!
export const createGlobalMessage = (options) => {
  return{
    type: "SHOW",
    color: "black",
    loaderSize: 'small',
    message: options.message,
    progressStatus: options.progressStatus,
    status: true
  }
}

// Kill the global message!
export const killGlobalMessage = () => {
  return {
    type: "KILL",
    status: false
  }
}

// Update the exisiting global message!
export const updateGlobalMessage = (options) => {
  return{
    type: "UPDATE",
    color: "black",
    loaderSize: 'small',
    message: options.message,
    closeOperation: options.closeOperation,
    progressStatus: options.progressStatus,
    status: true
  }
}