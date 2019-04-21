import moment from 'moment';

const CircleMapper = (state) => {
    const currentState = state.circles[state.circles.length - 1];
    const returnObj = {
        circles: currentState.circles,
        page: state.page.page,
        favorites: state.favorites.favorites,
    }

    if(currentState.results) returnObj.results = currentState.results;
    const fetches = state.circles.reverse();
    for(const fetchd of fetches) {
        if(!fetchd.lastUpdated) continue;
        returnObj.circlesUpdatedAt = fetchd.lastUpdated;
        break;
    }
    return returnObj;
}

export default CircleMapper;
