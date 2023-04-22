const pathModule = require("path");

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

export function getPathSep(){
  return pathModule.sep;
}