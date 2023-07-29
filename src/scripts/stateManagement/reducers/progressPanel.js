const jobTrackerReducer = (state, action) => {
  switch(action.type){
    case 'SHOW':
      return action;
    case 'UPDATE':
    return action;
    case 'KILL':
      return false;
    default: 
      return false;
  }
}

export default jobTrackerReducer;