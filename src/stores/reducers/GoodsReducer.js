import {
    CREATE_GOODS_REQUEST,
    CREATE_GOODS_SUCCESS,
    CREATE_GOODS_FAILURE,
} from '../actions/GoodsAction';

const initState = {
    isRequesting: false,
};

const goods = (state=[initState], action) => {
    switch(action.type) {
        case CREATE_GOODS_REQUEST:
            return [
                ...state,
                {
                    isRequesting: true,
                }
            ]
        case CREATE_GOODS_SUCCESS:
            return [
                ...state,
                {
                    isRequesting: false,
                    goods: action.goods
                }
            ];
        case CREATE_GOODS_FAILURE:
            return [
                ...state,
                {
                    isRequesting: false,
                    error: action.error
                }
            ];
        default:
            return state;
    }
}

export default goods;
