import {
    CHECK_AUTH_SUCCESS,
    CHECK_AUTH_FAILURE
} from '../actions/UserAction';

const initState = {
    authed: false
}

const user = (state=[initState], action) => {
    switch(action.type) {
        case CHECK_AUTH_SUCCESS:
            return [
                ...state,
                {
                    authed: true,
                    user: action.json.user
                }
            ];
        case CHECK_AUTH_FAILURE:
            return [
                ...state,
                {
                    authed: false,
                    error: action.error
                }
            ]
        default:
            return state;
    }
}

export default user;
