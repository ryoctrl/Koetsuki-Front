import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircleMapper from '~/src/stores/mappers/CircleMapper';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import FavoriteButton from '~/src/components/common/FavoriteButton';

class CircleDetail extends Component {
    render() {
        const { id } = this.props.match.params;
        const { classes, circles } = this.props;
        const circle = circles.find(circle => circle.id === Number(id));
        if(typeof circle === 'undefined') {
            return (
                <div>
                    <p> Circle with id '{id}' does not exist.</p>
                </div>
            )
        }

        return (
            <div className={classes.root}>
                <Typography variant="h5">
                    {circle.name}
                    <FavoriteButton circle={circle}/>
                </Typography>
                <Typography variant="h5">
                    {circle.penName} {circle.twitter ? '@'+circle.twitter : ''}
                </Typography>
                <Typography variant="h6">
                    スペース: {circle.spaceName}
                </Typography>
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
