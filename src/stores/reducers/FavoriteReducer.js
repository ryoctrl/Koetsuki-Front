import {
    CHANGE_FAVORITE
} from '../actions/FavoriteAction';

const initState = {
    favorites: []
}

const favorites = (state=initState, action) => {
    switch(action.type) {
        case CHANGE_FAVORITE:
            return changeFavorite(state, action);
        default:
            return state
    }
}

const changeFavorite = (state, action) => {
    const newState = Object.assign({}, state);
    const favorites = newState.favorites;
    const circle = action.circle;
    const target = favorites.find(f => f.id === circle.id);
    if(target) {
        newState.favorites = newState.favorites.filter(f => f.id !== circle.id);
    } else {
        newState.favorites.push(action.circle);
    }
    return newState;
}

export default favorites;
