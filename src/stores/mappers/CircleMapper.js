const CircleMapper = (state) => {
    const currentState = state.circles[state.circles.length - 1];
    return { circles: currentState.circles };
}

export default CircleMapper;
