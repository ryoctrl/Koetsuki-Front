import { combineReducers } from 'redux';
import circles from './CircleReducer';
import page from './PageReducer';

const RootReducer = combineReducers({
    circles,
    page
});

export default RootReducer;
