import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import CircleMapper from '~/src/stores/mappers/CircleMapper';

import { Link } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import CircleCard from '~/src/components/common/CircleCard';

import { getFav } from '~/src/stores/actions/FavoriteAction';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(getFav(this.props.favorites, this.props.user));
    }
    render() {
        const { classes, circles, results, favorites } = this.props;
        let displayCircles = [];
        for(const fav of favorites) {
            let c = circles.filter(c => c.id === fav.circleId);
            if(!c || !c[0]) continue;
            c = c[0];
            if(!results || results.length === circles.length) {
                displayCircles.push(c);
                continue;
            }
            c = results.filter(r => r.id === c.id);
            if(!c[0]) continue;
            displayCircles.push(c[0]);
        }
        return (
            <Grid container spacing={24}>
                {displayCircles.map(fav => (
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
