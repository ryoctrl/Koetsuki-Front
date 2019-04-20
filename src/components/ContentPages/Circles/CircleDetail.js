import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircleMapper from '~/src/stores/mappers/CircleMapper';
import FavoriteMapper from '~/src/stores/mappers/FavoriteMapper';

import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

import { getChangeFavoriteAction } from '~/src/stores/actions/FavoriteAction';

const containerStyle = {
    border: '1px gray solid',
    display: 'inline-block',
    padding: 10
};

const contentStyle = {
    margin: 0
}

class CircleDetail extends Component {
    constructor(props) {
        super(props);
        this.changeFavorite = this.changeFavorite.bind(this);
    }
    changeFavorite() {
        const action = getChangeFavoriteAction(this.circle);
        const result = !this.circle.isFavorite;
        this.props.dispatch(action);
        this.setState({
            fav: result
        });
    }
    render() {
        const { id } = this.props.match.params;
        const { classes, circles, favorites } = this.props;
        const circle = circles.find(circle => circle.id === Number(id));
        if(typeof circle === 'undefined') {
            return (
                <div>
                    <p> Circle with id '{id}' does not exist.</p>
                </div>
            )
        }

        circle.isFavorite = typeof(favorites.find(f => f.id === circle.id)) !== 'undefined';
        this.circle = circle;
        const favColor = circle.isFavorite ? 'secondary' : 'default';

        return (
            <div className={classes.root}>
                <Typography variant="h5">
                    {circle.name}
                    <IconButton color={favColor} onClick={this.changeFavorite} className={classes.button} component="span">
                        <Favorite />
                    </IconButton>
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
