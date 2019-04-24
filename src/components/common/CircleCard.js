import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import CircleMapper from '~/src/stores/mappers/CircleMapper';

import FavoriteButton from './FavoriteButton';


const IMAGE_PATH = '/api/images/';

const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    content: {
        padding: theme.spacing.unit
    }
});

class CircleCard extends Component {
    render() {
        const { classes, circle } = this.props;
        let img;
        if(!circle.circleCut) img = '/img/no-image.svg';
        else img = IMAGE_PATH + circle.circleCut;

        return (
            <Card>
                <CardActionArea component={Link} to={`/circles/${circle.id}`}>
                    <CardMedia className={classes.media}image={img} title={circle.name}/>
                    <CardContent className={classes.content}>
                        <Typography variant="subtitle2" component="h2">
                            {circle.name}
                            <FavoriteButton circle={circle}/>
                        </Typography>
                        <Typography variant="body1" component="h2">
                            {circle.penName}
                        </Typography>
                        <Typography variant="body1" component="h2">
                            {circle.spaceName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

CircleCard = connect(CircleMapper)(CircleCard);
export default withStyles(styles)(CircleCard);
