export const CHANGE_PAGE = 'CHANGE_PAGE';

export const getChangePageAction = (page) => {
    return {
        type: CHANGE_PAGE,
        page: page,
    };
}
