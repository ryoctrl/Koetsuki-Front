import { combineReducers } from 'redux';
import circles from './CircleReducer';
import page from './PageReducer';
import favorites from './FavoriteReducer';
import goods from './GoodsReducer';
import user from './UserReducer';
import { reducer as reduxFormReducer } from 'redux-form';

const RootReducer = combineReducers({
    circles,
    page,
    favorites,
    goods,
    user,
    form: reduxFormReducer
});

export default RootReducer;
