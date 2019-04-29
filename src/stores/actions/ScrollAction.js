export const SCROLL_CIRCLES = 'SCROLL_CIRCLES';

export const getScrollCircles = (y) => {
    return {
        type: SCROLL_CIRCLES,
        y: y
    };
};
