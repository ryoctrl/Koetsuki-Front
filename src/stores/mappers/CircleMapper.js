const CircleMapper = (state) => {
    const storeCircles = state.circles[0] || null;
    let circles = [];
    let lastUpdated = false;
    if(storeCircles) {
        circles = storeCircles.circles;
        lastUpdated = storeCircles.lastUpdated;
    }     
    const currentState = state.circles[state.circles.length - 1];
    const user = [].concat(state.user);
    user.reverse();
    const returnObj = {
        circles: circles,
        isFetching: currentState.isFetching,
        lastUpdated: lastUpdated,
        page: state.page.page,
        favorites: state.favorites.favorites,
        user: user[0],
        scroll: state.scroll
    }

    if(storeCircles.results) returnObj.results = storeCircles.results;
    return returnObj;
}

export default CircleMapper;
