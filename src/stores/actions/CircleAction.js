import axios from 'axios';

export const GET_CIRCLES_REQUEST = 'GET_CIRCLES_REQUEST';
const getCirclesRequest = () => {
    return {
        type: GET_CIRCLES_REQUEST
    }
};

export const GET_CIRCLES_SUCCESS = 'GET_CIRCLES_SUCCESS';
const getCirclesSuccess = (json) => {
    return {
        type: GET_CIRCLES_SUCCESS,
        circles: json,
        receivedAt: Date.now()
    }
};

export const GET_CIRCLES_FAILURE = 'GET_CIRCLES_FAILURE';
const getCirclesFailure = (error) => {
    return {
        type: GET_CIRCLES_FAILURE,
        error
    }
};

export const getCircles = () => {
    return (dispatch) => {
        dispatch(getCirclesRequest());
        return axios.get('https://koetuki-back.mosin.jp/circles')
            .then(res => dispatch(getCirclesSuccess(res.data)))
            .catch(err => dispatch(getCirclesFailure(err)))
    };
};