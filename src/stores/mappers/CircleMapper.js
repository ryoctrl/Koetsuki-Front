const CircleMapper = (state) => {
    const currentState = state.circles[state.circles.length - 1];
    return { 
        circles: currentState.circles,
        page: state.page.page,
        favorites: state.favorites.favorites
    };
}

export default CircleMapper;
