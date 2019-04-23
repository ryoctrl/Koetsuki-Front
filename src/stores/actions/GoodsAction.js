import axios from 'axios';
import { getCircles } from './CircleAction';

const API_HOST = process.env.REACT_APP_API_HOST;

export const CREATE_GOODS_REQUEST = 'CREATE_GOODS_REQUEST';
const createGoodsRequest = () => {
    return {
        type: CREATE_GOODS_REQUEST
    }
};

export const CREATE_GOODS_SUCCESS = 'CREATE_GOODS_SUCCESS';
const createGoodsSuccess = (json) => {
    return {
        type: CREATE_GOODS_SUCCESS,
        goods: json,
    }
};

export const CREATE_GOODS_FAILURE = 'CREATE_GOODS_FAILURE';
const createGoodsFailure = (error) => {
    return {
        type: CREATE_GOODS_FAILURE,
        error
    }
};

export const UPDATE_GOODS_SUCCESS = 'UPDATE_GOODS_SUCCESS';
const updateGoodsSuccess = (json) => {
    return {
        type: UPDATE_GOODS_SUCCESS,
        goods: json
    }
};

export const UPDATE_GOODS_FAILURE = 'UPDATE_GOODS_FAILURE';
const updateGoodsFailure = (error) => {
    return {
        type: UPDATE_GOODS_FAILURE,
        error
    }
};

export const createGoods = (data) => {
    return (dispatch) => {
        dispatch(createGoodsRequest());
        return axios.post('/api/goods/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
                dispatch(createGoodsSuccess(res.data))
                dispatch(getCircles());
        })
        .catch(err => {
                dispatch(createGoodsFailure(err))
                dispatch(getCircles());
        });
    }
};

export const updateGoods = (data) => {
    console.log(data);
    return (dispatch) => {
        return axios.post(API_HOST + '/api/goods/update', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            dispatch(updateGoodsSuccess(res.data))
            dispatch(getCircles());
        })
        .catch(err => {
            dispatch(updateGoodsFailure(err))
            dispatch(getCircles());
        });
    };
};
