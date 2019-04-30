import {
    CHANGE_FAVORITE,
    CREATE_FAV_SUCCESS,
    CREATE_FAV_FAILURE,
    DELETE_FAV_SUCCESS,
    DELETE_FAV_FAILURE,
    GET_FAV_SUCCESS,
    GET_FAV_FAILURE,
} from '../actions/FavoriteAction';

const initState = {
    favorites: []
}

const favorites = (state=initState, action) => {
    switch(action.type) {
        case CHANGE_FAVORITE:
            return changeFavorite(state, action);
        case CREATE_FAV_SUCCESS:
            return createFavSucceeded(state, action);
        case CREATE_FAV_FAILURE:
            return createFavFailured(state, action);
        case DELETE_FAV_SUCCESS:
            return deleteFavSucceeded(state, action);
        case DELETE_FAV_FAILURE:
            return deleteFavFailured(state, action);
        case GET_FAV_SUCCESS:
            return getFavSucceeded(state, action);
        case GET_FAV_FAILURE:
            return getFavFailured(state, action);
        default:
            return state
    }
}

const createFavSucceeded = (state, action) => {
    const favorite = action.favorite;
    const fav = {
        id: favorite.id,
        circleId: favorite.circleId,
    }
    const favorites = [].concat(state.favorites).filter(f => !(f.circleId === fav.circleId && f.id === -1));

    favorites.push(fav);
    return {
        favorites 
    }
};

const createFavFailured = (state, action) => {
    const favorite = action.favorite;
    const fav = {
        id: -1,
        circleId: favorite.circleId
    }
    const favorites = [].concat(state.favorites);
    favorites.push(fav);
    return {
        favorites
    }
};

const deleteFavSucceeded = (state, action) => {
    const favorite = action.favorite.favorite;
    const favorites = [].concat(state.favorites).filter(f => f.id !== favorite.id);
    return {
        favorites
    }
};

const deleteFavFailured = (state, action) => {
    const favorite = action.favorite;
    const favorites = [].concat(state.favorites).filter(f => f.circleId !== favorite.circleId);

    return {
        favorites
    }
};

const getFavSucceeded = (state, action) => {
    const nf = [].concat(state.favorites);
    const favorites = action.favorites;
    for(const fav of favorites) {
        const registered = state.favorites.filter(f => f.id === fav.id);
        if(registered.length !== 0) continue;
        nf.push(fav);
    }
    return {
        favorites: nf
    };
};

const getFavFailured = (state, action) => {
    return state;
};

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
