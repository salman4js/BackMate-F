import React from 'react';
import ReactDOM  from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { createStore } from 'redux';
import allReducers from './stateManagement/reducers/index';
import { Provider } from 'react-redux';

const store = createStore(allReducers);

ReactDOM.render(<Provider store = {store}> <App /> </Provider>, document.getElementById("root"));