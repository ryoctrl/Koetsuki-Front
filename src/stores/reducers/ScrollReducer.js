import { SCROLL_CIRCLES } from '../actions/ScrollAction';

const initState = {
    circleList: {},
}

const scrollCircles = (state, action) => {
    const circleList = {
        y: action.y,
    };

    const newS = Object.assign({}, state);
    newS.circleList = circleList;

    return newS;
};


const page = (state=initState, action) => {
    switch(action.type) {
        case SCROLL_CIRCLES:
            return scrollCircles(state, action);
        default:
            return state
    }
}


export default page;
