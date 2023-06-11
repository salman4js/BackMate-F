import jobTrackerReducer from './progressPanel';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  jobTracker: jobTrackerReducer
})

export default allReducers;
