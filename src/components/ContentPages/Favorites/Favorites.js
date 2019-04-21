import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import CircleMapper from '~/src/stores/mappers/CircleMapper';

import { Link } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import CircleCard from '~/src/components/common/CircleCard';

class Favorites extends Component {
    render() {
        const { classes, favorites } = this.props;
        return (
            <Grid container spacing={24}>
                {favorites.map(fav => (
                    <Grid key={fav.id} item xs={6} lg={3} className={classes.card}>
                        <CircleCard component={Link} to={`/circles/${fav.id}`} circle={fav} />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

const styles = theme => ({
    card: {
        width: '100%'
    },
});

Favorites = withStyles(styles)(Favorites);

export default connect(CircleMapper)(Favorites);
