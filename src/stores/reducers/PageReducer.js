import { CHANGE_PAGE } from '../actions/PageAction';

const initState = {
    page: {},
}

const page = (state=initState, action) => {
    switch(action.type) {
        case CHANGE_PAGE:
            return {
                page: action.page,
            }
        default:
            return state
    }
}

export default page;
