import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST;

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

export const SEARCH_CIRCLE = 'SERCH_CIRCLE';
export const getSearchAction = (options) => {
    return {
        type: SEARCH_CIRCLE,
        options
    }
}

export const UPDATE_CIRCLE_SUCCESS = 'UPDATE_CIRCLE_SUCCESS';
export const updateCircleSuccess = (json) => {
    return {
        type: UPDATE_CIRCLE_SUCCESS,
        circle: json
    }
}

export const UPDATE_CIRCLE_FAILURE = 'UPDATE_CIRCLE_FAILURE';
export const updateCircleFailure = (error) => {
    return {
        type: UPDATE_CIRCLE_FAILURE,
        error
    }
}

export const CREATE_CIRCLE_SUCCESS = 'CREATE_CIRCLE_SUCCESS';
export const createCircleSuccess = (json) => {
    return {
        type: CREATE_CIRCLE_SUCCESS,
        circle: json
    }
}

export const CREATE_CIRCLE_FAILURE = 'CREATE_CIRCLE_FAILURE';
export const createCircleFailure = (error) => {
    return {
        type: CREATE_CIRCLE_FAILURE,
        error
    }
}

export const getCircles = () => {
    return (dispatch) => {
        dispatch(getCirclesRequest());
        return axios.get(API_HOST + '/api/circles')
            .then(res => dispatch(getCirclesSuccess(res.data)))
            .catch(err => dispatch(getCirclesFailure(err)))
    };
};

export const createCircle = () => {
    return (dispatch) => {
        return axios.post(API_HOST + '/api/circles/create')
            .then(res => dispatch(createCircleSuccess(res.data)))
            .catch(err => dispatch(createCircleFailure(err)))
    };
}

export const updateCircle = (data) => {
    return (dispatch) => {
        return axios.post(API_HOST + '/api/circles/update', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            dispatch(updateCircleSuccess(res.data))
            dispatch(getCircles());
        })
        .catch(err => {
            dispatch(updateCircleFailure(err))
            dispatch(getCircles());
        });
    };
};
