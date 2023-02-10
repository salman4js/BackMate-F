export function setStorage(key, value){
    localStorage.setItem(key, value);
}

export function getStorage(key, value){
    const result = localStorage.getItem(key);
    return result;
}

export function clearStorage(){
    const result = localStorage.clear();
    return result;
}
