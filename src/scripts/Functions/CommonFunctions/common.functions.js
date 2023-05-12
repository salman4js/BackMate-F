const pathModule = require("path");
const { execSync } = require('child_process');


// Handle path separation for cross platforms
export function handlePathSep(value){
    const separator = pathModule.sep;
    const newPath = value.endsWith(separator) ? value : value + separator;
    return newPath;
}

// Get current path
export function getCurrentPath(){
  const currentPath = process.cwd();
  const path = handlePathSep(currentPath);
  return path;
}

// Get path separator!
export function getPathSep(){
  return pathModule.sep;
}

// Get git branch!
export function gitBranch(){
  var branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  return branch;
}