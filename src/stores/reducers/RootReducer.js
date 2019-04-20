import { combineReducers } from 'redux';
import circles from './CircleReducer';
import page from './PageReducer';
import favorites from './FavoriteReducer';

const RootReducer = combineReducers({
    circles,
    page,
    favorites
});

export default RootReducer;
