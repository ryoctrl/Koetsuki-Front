import axios from 'axios';

export const CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS';
const checkAuthSuccess = (json) => {
    return {
        type: CHECK_AUTH_SUCCESS,
        json: json
    }
}

export const CHECK_AUTH_FAILURE = 'CHECK_AUTH_FAILURE';
const checkAuthFailure = (error) => {
    return {
        type: CHECK_AUTH_FAILURE,
        error
    }
}


export const checkAuth = () => {
    return (dispatch) => {
        return axios.get('/api/check/auth')
            .then(res => dispatch(checkAuthSuccess(res.data)))
            .catch(err => dispatch(checkAuthFailure(err)))
    }
}
