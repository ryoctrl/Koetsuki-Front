import { GET_CIRCLES_REQUEST, GET_CIRCLES_SUCCESS, GET_CIRCLES_FAILURE } from '../actions/CircleAction';

const initState = {
    isFetching: false,
    circles: []
};

const circles = (state=[initState], action) => {
    switch(action.type) {
        case GET_CIRCLES_REQUEST:
            return [
                ...state,
                {
                    isFetching: true,
                    circles: []
                }
            ];
        case GET_CIRCLES_SUCCESS:
            return [
                ...state,
                {
                    isFetching: false,
                    circles: action.circles,
                    lastUpdated: action.receivedAt
                }
            ];
        case GET_CIRCLES_FAILURE:
            return [
                ...state,
                {
                    isFetching: false,
                    error: action.error
                }
            ];
        default:
            return state
    }
}

export default circles;
