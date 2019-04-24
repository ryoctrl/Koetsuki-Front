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
    let results = circles;
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
        case 'name':
            algo = (a, b) => a.name - b.name;
            break;
        case 'pen':
            algo = (a, b) => a.penName - b.penName;
            break;
        case 'space':
            algo = (a, b) => a.space - b.space;
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
