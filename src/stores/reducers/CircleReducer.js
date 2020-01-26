import { 
    GET_CIRCLES_REQUEST, 
    GET_CIRCLES_SUCCESS, 
    GET_CIRCLES_FAILURE,
    SEARCH_CIRCLE,
} from '../actions/CircleAction';

const initState = {
    isFetching: false,
    circles: [],
};

const circles = (state=[initState], action) => {
    switch(action.type) {
        case GET_CIRCLES_REQUEST:
            return [
                ...state,
                {
                    isFetching: true,
                    circles: [],
                }
            ];
        case GET_CIRCLES_SUCCESS:
            action.circles.forEach(circle => {
                circle.goods.forEach(item => {
                    if(!item.image) {
                        item.image = {
                            path: 'no_image_480_20200126.png',
                        };
                    }
                });
            });
            return [
                {
                    isFetching: false,
                    circles: action.circles,
                    lastUpdated: action.receivedAt
                }
            ];
        case GET_CIRCLES_FAILURE:
            return [
                ...state,
                {
                    isFetching: false,
                    error: action.error
                }
            ];
        case SEARCH_CIRCLE:
            return searchCircle(state, action);
        default:
            return state
    }
}


const searchCircle = (state, action) => {
    const options = action.options;
    const prevState = getFetchedCircles(state);
    const circles = prevState.circles;
    let results = circles.slice();
    //サークル名検索
    if(options.name) {
        results = results.filter(c => {
            return c.name.indexOf(options.name) !== -1;
        });
    }

    //ペンネーム検索
    if(options.penName) {
        results = results.filter(c => {
            return c.penName.indexOf(options.penName) !== -1;
        });
    }

    if(options.space) {
        results = results.filter(c => {
            return c.spaceName.startsWith(options.space);
        });
    }

    let algo;
    switch(options.sortTarget) {
        case 'id':
            algo = (a, b) => options.sortLogic === 'asc' ? a.id - b.id : b.id - a.id;
            break;
        case 'updatedAt':
            algo = (a, b) => options.sortLogic === 'asc' ? new Date(a.updatedAt) - new Date(b.updatedAt) : new Date(b.updatedAt) - new Date(a.updatedAt);
            break;
        case 'name':
            algo = (a, b) => {
                if(options.sortLogic === 'asc') {
                    if(a.name > b.name) return 1;
                    else if(a.name < b.name) return -1;
                    else return 0;
                } else {
                    if(b.name > a.name) return 1;
                    else if(b.name < a.name) return -1;
                    else return 0;
                }
            };
            break;
        case 'pen':
            algo = (a, b) => {
                if(options.sortLogic === 'asc') {
                    if(a.penName > b.penName) return 1;
                    else if(a.penName < b.penName) return -1;
                    else return 0;
                } else {
                    if(b.penName > a.penName) return 1;
                    else if(b.penName < a.penName) return -1;
                    else return 0;
                }
            };

            break;
        case 'space':
            algo = (a, b) => {
                if(options.sortLogic === 'asc') {
                    if(a.space > b.space) return 1;
                    if(a.space < b.space) return -1;
                    return 0;
                } else {
                    if(b.space > a.space) return 1;
                    if(b.space < a.space) return -1;
                    return 0;
                }
            };
            break;
        case 'goods':
            algo = (a, b) => {
                if(options.sortLogic === 'asc') {
                    if(a.goods.length > b.goods.length) return 1;
                    if(a.goods.length < b.goods.length) return -1;
                    return 0;
                } else {
                    if(b.goods.length > a.goods.length) return 1;
                    if(b.goods.length < a.goods.length) return -1;
                    return 0;
                }
            };
            break;
        default:
            break;
    }

    results.sort(algo);

    return [
        {
            isFetching: false,
            circles: circles,
            results: results,
            lastUpdated: prevState.lastUpdated
        }
    ]
};

const getFetchedCircles = (states) => {
    states = states.reverse();
    for(const state of states) {
        if(!state.hasOwnProperty('lastUpdated')) continue;
        return state;
    }
}

export default circles;
