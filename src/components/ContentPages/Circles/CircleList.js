import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { Grid, CircularProgress } from '@material-ui/core';

import CircleMapper from '~/src/stores/mappers/CircleMapper';
import CircleCard from '~/src/components/common/CircleCard';
import { getCircles } from '~/src/stores/actions/CircleAction';
import { checkAuth } from '~/src/stores/actions/UserAction';

import moment from 'moment';

class CircleList extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(checkAuth());
        if(this.props.lastUpdated) {
            const ts = moment(this.props.lastUpdated);
            const now = moment();
            const diffSec = now.diff(ts, 'seconds');
            if(diffSec < 30) return;
        }
        this.props.dispatch(getCircles());
    }
    render() {
        let { classes, circles, isFetching, results } = this.props;
        let displayingCircles = circles;
        let nonCirclesMessage = 'サークルが1件もないか取得できませんでした...';
        if(results) {
            displayingCircles = results;
            nonCirclesMessage = 'サークルが1件も見つかりませんでした...';
        }

        if(displayingCircles.length === 0) {
            if(isFetching) {
                return (
                    <CircularProgress className={classes.progress} color="primary"/>
                )
            } else {
                return (
                    <p>{nonCirclesMessage}</p>
                )
            }
        }
        return (
            <Grid container className={classes.list} spacing={24}>
                {
                    displayingCircles.map(circle => (
                        <Grid key={circle.id} item xs={6} lg={3} className={classes.card}>
                            <CircleCard key={circle.id} component={Link} to={`/circles/${circle.id}`} circle={circle} />
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
    },
    progress: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        left: '0px',
        bottom: '0px',
        margin: 'auto',
        width: theme.spacing.unit * 8,
        height: theme.spacing.unit * 8,
    }

});

CircleList = withStyles(styles)(CircleList);
CircleList = connect(CircleMapper)(CircleList);

export default CircleList;
