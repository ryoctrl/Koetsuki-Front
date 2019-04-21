import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import CircleMapper from '~/src/stores/mappers/CircleMapper';
import CircleCard from '~/src/components/common/CircleCard';
import { getCircles } from '~/src/stores/actions/CircleAction';

class CircleList extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(getCircles());
    }
    render() {
        let { classes, circles } = this.props;
        if(!circles) {
            return (
                <p>サークルが1件もないか取得できませんでした...</p>
            )

        }
        return (
            <Grid container justify="space-around" className={classes.list}>
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
