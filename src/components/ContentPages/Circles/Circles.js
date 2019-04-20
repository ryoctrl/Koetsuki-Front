import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import CircleList from './CircleList';
import CircleDetail from './CircleDetail';

class Circles extends Component {
    render() {
        return (
            <div>
                <Route exact path='/circles' component={CircleList}/>
                <Route path='/circles/:id' component={CircleDetail}/>
            </div>
        )
    }
}

export default Circles;
