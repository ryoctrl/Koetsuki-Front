import { combineReducers } from 'redux';
import circles from './CircleReducer';
const RootReducer = combineReducers({
    circles
});

export default RootReducer;
