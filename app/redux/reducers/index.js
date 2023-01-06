import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import userReducer from './userReducer';
const rootReducer = combineReducers({
  weather: weatherReducer,
  user: userReducer,
});

export default rootReducer;
