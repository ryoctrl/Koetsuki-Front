import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircleMapper from '~/src/stores/mappers/CircleMapper';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import { getChangeFavoriteAction } from '~/src/stores/actions/FavoriteAction';

class FavoriteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.changeFavorite = this.changeFavorite.bind(this);
    }
    changeFavorite(e,currentFavorited) {
        e.preventDefault();
        const action = getChangeFavoriteAction(this.circle);
        this.props.dispatch(action);
        this.setState({
            fav: !currentFavorited
        });
    }
    render() {
        const { classes, circle, favorites } = this.props;
        let favColor, favorited;
        console.log(this.state);
        if(this.state.hasOwnProperty('fav')) {
            favColor = this.state.fav ? 'secondary' : 'default';
            favorited = this.state.fav;
        } else {
            favorited = typeof(favorites.find(f => f.id === circle.id)) !== 'undefined';
            this.circle = circle;
            favColor = favorited ? 'secondary' : 'default';
        }
        return (
            <IconButton color={favColor} 
                onClick={(e) => this.changeFavorite(e, favorited)} className={classes.button} component="span">
                <Favorite />
            </IconButton>
        )
    }
}

const styles = theme => ({

});

FavoriteButton = withStyles(styles)(FavoriteButton);

export default connect(CircleMapper)(FavoriteButton);
