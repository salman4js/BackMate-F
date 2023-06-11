const jobTrackerReducer = (state, action) => {
  switch(action.type){
    case 'SHOW':
      return true;
    case 'KILL':
      return false;
    default: 
      return false;
  }
}

export default jobTrackerReducer;