import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircleMapper from '~/src/stores/mappers/CircleMapper';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import { getChangeFavoriteAction, createFav, deleteFav } from '~/src/stores/actions/FavoriteAction';

class FavoriteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    changeFavorite = (e, favorited) => {
        e.preventDefault();
        const favorite = this.props.favorites.filter(f => f.circleId === this.props.circle.id);
        const circle = this.props.circle;

        //Testing
        if(favorited && favorite.length > 0) {
            this.props.dispatch(deleteFav(favorite[0].id, circle.id))
        } else {
            const user = this.props.user.user || { id: -1 } ;
            this.props.dispatch(createFav(user.id, circle.id));
        }
        //Testing
            /*
        const action = getChangeFavoriteAction(this.props.circle);
        this.props.dispatch(action);
        this.setState({
            fav: !favorited
        });
        */
    }
    render() {
        const { classes, circle, favorites } = this.props;
        const favorite = favorites.filter(f => f.circleId === circle.id);
        let favColor = 'default', favorited = false;
        if(favorite.length > 0) {
            favColor = 'secondary';
            favorited = true;
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
    button: {
        margin: 0,
        height: 20,
        width: 20,
        paddingBottom: theme.spacing.unit * 2,
        float: 'right',
    }
});

FavoriteButton = withStyles(styles)(FavoriteButton);

export default connect(CircleMapper)(FavoriteButton);
