import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import CircleDetail from './CircleDetail';

class Circles extends Component {
    render() {
        return (
            <div>
                <Route path='/circles/:id' component={CircleDetail}/>
            </div>
        )
    }
}

export default Circles;
