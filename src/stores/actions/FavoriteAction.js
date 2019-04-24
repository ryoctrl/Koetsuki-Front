import axios from 'axios';

export const CHANGE_FAVORITE = 'ADD_FAVORITE';
export const getChangeFavoriteAction = (circle) => {
    return {
        type: CHANGE_FAVORITE,
        circle: circle,
    }
}

export const CREATE_FAV_SUCCESS = 'CREATE_FAV_SUCCESS';
const createFavSuccess = (json) => {
    return {
        type: CREATE_FAV_SUCCESS,
        favorite: json
    }
}

export const CREATE_FAV_FAILURE = 'CREATE_FAV_FAILURE';
const createFavFailure = (favorite) => {
    return {
        type: CREATE_FAV_FAILURE,
        favorite
    }
}

export const createFav = (uid, cid) => {
    return (dispatch) => {
        return axios.post('/api/favorites/create', {uid, cid})
                .then(res => dispatch(createFavSuccess(res.data)))
            .catch(err => {
                dispatch(createFavFailure({userId: uid, circleId: cid}))
            });
    }
}

export const DELETE_FAV_SUCCESS = 'DELETE_FAV_SUCCESS';
const deleteFavSuccess = (json) => {
    return {
        type: DELETE_FAV_SUCCESS,
        favorite: json
    }
}

export const DELETE_FAV_FAILURE = 'DELETE_FAV_FAILURE';
const deleteFavFailure = (favorite) => {
    return {
        type: DELETE_FAV_FAILURE,
        favorite
    }
}

export const deleteFav = (favId, cid) => {
    return (dispatch) => {
        return axios.post('/api/favorites/delete', {id: favId})
                .then(res => dispatch(deleteFavSuccess(res.data)))
                .catch(err => {
                    dispatch(deleteFavFailure({id: favId, circleId: cid}))
                });
    }
}

export const GET_FAV_SUCCESS = 'GET_FAV_SUCCESS';
const getFavSuccess = (json) => {
    return {
        type: GET_FAV_SUCCESS,
        favorites: json
    }
}

export const GET_FAV_FAILURE = 'GET_FAV_FAILURE';
const getFavFailure = (err) => {
    return {
        type: GET_FAV_FAILURE,
        error: err
    }
}


export const getFav = (currentFavorites, user) => {
    return (dispatch) => {
        return axios.get('/api/favorites/')
            .then(res => {
                postFavsIfNeeded(dispatch, currentFavorites, user);
                dispatch(getFavSuccess(res.data))
            })
            .catch(err => dispatch(getFavFailure(err)));
    }
}

const postFavsIfNeeded = (dispatch, favorites, user) => {
    if(!user.authed) return;
    for(const fav of favorites) {
        if(fav.id !== -1) continue;
        dispatch(createFav(user.user.id, fav.circleId));
    }
};

