import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import CircleMapper from '../../../stores/mappers/CircleMapper';

class CircleList extends Component {
    render() {
        const { circles } = this.props;
        return (
            <div>
                {
                    circles.map(circle => (
                        <li key={circle.id}>
                            <Link to={`/circles/${circle.id}`}>{circle.name}</Link>
                        </li>
                    ))
                }
            </div>
        )
    }
}

export default connect(CircleMapper)(CircleList);
