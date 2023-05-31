import React, {useState} from 'react';

const useForceUpdate = () => {
  
  // State to handle refreshing of component!
  const [refresh, setRefresh] = useState(0);
  
  // Function to handle the separate component update universally!
  function domRefresh(){
    return () => setRefresh(prevState => prevState + 1);
  }
  
  return [refresh, domRefresh];
  
}

export default useForceUpdate;


