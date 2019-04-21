import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';

import { Favorite } from '@material-ui/icons';
import CircleMapper from '~/src/stores/mappers/CircleMapper';

import FavoriteButton from './FavoriteButton';


const IMAGE_PATH = process.env.REACT_APP_API_HOST + 'images/';

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%',
    }
};

class CircleCard extends Component {
    render() {
        const { classes, circle, favorites } = this.props;
        let img;
        if(!circle.image) img = '/img/no-image.svg';
        else img = IMAGE_PATH + circle.image;

        const faved = favorites.find(f => f.id === circle.id);

        const favColor = typeof(faved) !== 'undefined'  ? 'secondary' : 'default';

        return (
            <Card>
                <CardActionArea component={Link} to={`/circles/${circle.id}`}>
                    <CardMedia className={classes.media}image={img} title={circle.name}/>
                    <CardContent>
                        <Typography variant="subtitle1" component="h2">
                            {circle.name}
                            <FavoriteButton circle={circle}/>
        {/*
                            <IconButton color={favColor} className={classes.button} component="span">
                                <Favorite />
                            </IconButton>
                            */}
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
