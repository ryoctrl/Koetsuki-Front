import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import CircleMapper from '~/src/stores/mappers/CircleMapper';
import CircleCard from '~/src/components/common/CircleCard';
import { getCircles } from '~/src/stores/actions/CircleAction';

import moment from 'moment';

class CircleList extends Component {
    constructor(props) {
        super(props);
        if(this.props.circlesUpdatedAt) {
            const ts = moment(this.props.circlesUpdatedAt);
            const now = moment();
            const diffSec = now.diff(ts, 'seconds');
            if(diffSec < 30) return;
        }
        this.props.dispatch(getCircles());
    }
    render() {
        let { classes, circles, results } = this.props;
        if(results) {
            if(results.length === 0) {
                return (
                    <p>サークルが1件も見つかりませんでした...</p>
                )
            }
            return (
                <Grid container className={classes.list} spacing={24}>
                    {
                        results.map(circle => (
                            <Grid key={circle.id} item xs={6} lg={3} className={classes.card}>
                                <CircleCard component={Link} to={`/circles/${circle.id}`} circle={circle} />
                            </Grid>
                        ))
                    }
                </Grid>
            )
        }
        if(!circles) {
            return (
                <p>サークルが1件もないか取得できませんでした...</p>
            )

        }
        return (
            <Grid container className={classes.list} spacing={24}>
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
