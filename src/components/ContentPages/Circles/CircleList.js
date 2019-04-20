import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import CircleMapper from '~/src/stores/mappers/CircleMapper';
import CircleCard from '~/src/components/common/CircleCard';

class CircleList extends Component {
    render() {
        const { classes, circles } = this.props;
        return (
            <Grid container justify="space-around" className={classes.list} spacing={10}>
                {
                    circles.map(circle => (
                        <Grid key={circle.id} item xs={6} lg={3} className={classes.card}>
                            <CircleCard component={Link} to={`/circles/${circle.id}`} circle={circle} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    }
}


const styles = theme => ({
    card: {
        width: '100%',
    },
    list: {
        paddingTop: '5px'
    }
});

CircleList = withStyles(styles)(CircleList);
CircleList = connect(CircleMapper)(CircleList);

export default CircleList;
