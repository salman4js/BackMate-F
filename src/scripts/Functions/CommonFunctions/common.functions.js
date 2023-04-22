const pathModule = require("path");


export function handlePathSep(value){
    const separator = pathModule.sep;
    const newPath = value.endsWith(separator) ? value : value + separator;
    return newPath;
}