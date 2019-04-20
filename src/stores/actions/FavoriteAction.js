export const CHANGE_FAVORITE = 'ADD_FAVORITE';
export const getChangeFavoriteAction = (circle) => {
    return {
        type: CHANGE_FAVORITE,
        circle: circle,
    }
}
