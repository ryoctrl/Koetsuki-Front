import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CircleMapper from '~/src/stores/mappers/CircleMapper';

import { withStyles } from '@material-ui/core/styles';

import { getCircles } from '~/src/stores/actions/CircleAction';

import DetailDisplay from './DetailDisplay';
import DetailEdit from './DetailEdit';

class CircleDetail extends Component {
    componentDidMount() {
        if(!this.props.circlesUpdatedAt) this.props.dispatch(getCircles());
    }

    render() {
        const { id } = this.props.match.params;
        const { circles } = this.props;
        const circle = circles.find(circle => circle.id === Number(id));
        if(typeof circle === 'undefined') {
            return (
                <div>
                    <p> Circle with id '{id}' does not exist.</p>
                </div>
            )
        }

        return (
            <div>
                <Route exact path='/circles/:id' render={() => <DetailDisplay circle={circle} />}/>
                <Route path='/circles/:id/edit' render={() => <DetailEdit circle={circle} />} />
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        padding: '5px',
    }
});

CircleDetail = connect(CircleMapper)(CircleDetail);
CircleDetail = withStyles(styles)(CircleDetail);

export default CircleDetail;
