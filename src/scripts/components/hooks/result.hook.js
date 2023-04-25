import React, {useState, useEffect} from 'react';

const useResultHandler = () => {
  
  const [result, setResult] = useState({
    storyName: undefined,
    scenarioName: undefined
  });
  
  function handleResult(data){
    try{
      setResult(prevState => ({storyName: data.storyName, scenarioName: data.scenarioName}));
    } catch(err){
      console.log("Error in setting up the result state handler!")
    }
  }
  
  return [result, handleResult];
  
}

export default useResultHandler;