// Set storage!
export function setStorage(key, value, local){
    if(local){
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
}

// Get storage!
export function getStorage(key, local){
    var result;
    if(local){
      result = localStorage.getItem(key);
    } else {
      result = sessionStorage.getItem(key);
    }
    return result;
}

// Set storage!
export function defaultStorage(data, local){
    for (const key in data){
        setStorage(key, data[key], local);
    }
}

// clear storage!
export function clearStorage(local){
    if(local){
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
}