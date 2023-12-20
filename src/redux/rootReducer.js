// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  // Add other reducers if needed
});

export default rootReducer;
