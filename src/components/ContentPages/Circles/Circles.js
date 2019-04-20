import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Route } from 'react-router-dom';

import CircleList from './CircleList';
import CircleDetail from './CircleDetail';

import CircleMapper from '../../../stores/mappers/CircleMapper';

const CIRCLES = [{"id":1,"name":"のらくら劇場","penName":"トロメラ","spaceName":"A-01","createdAt":"2019-04-20T11:59:56.000Z","updatedAt":"2019-04-20T11:59:56.000Z"},{"id":2,"name":"スリーズ","penName":"チェリ子","spaceName":"A-02","createdAt":"2019-04-20T12:05:45.000Z","updatedAt":"2019-04-20T12:05:45.000Z"}];

const circleById = id => CIRCLES.find(circle => circle.id === Number(id));

class Circles extends Component {
    render() {
        const { circles } = this.props;
        console.log(circles);
        return (
            <div>
                <h2>Circles</h2>
                <Route exact path='/circles' component={CircleList}/>
                <Route path='/circles/:id' render={({match}) => <CircleDetail circleById={circleById} match={match}/>}/>
            </div>
        )
    }
}

export default connect(CircleMapper)(Circles);
