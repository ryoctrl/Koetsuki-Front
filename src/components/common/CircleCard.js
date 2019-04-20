import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';

const IMAGE_PATH = process.env.REACT_APP_API_HOST + 'images/';

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%',
    }
};

class CircleCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, circle } = this.props;
        let img;
        if(!circle.image) img = '/img/no-image.svg';
        else img = IMAGE_PATH + circle.image;
        return (
            <Card>
                <CardActionArea component={Link} to={`/circles/${circle.id}`}>
                    <CardMedia className={classes.media}image={img} title={circle.name}/>
                    <CardContent>
                        <Typography variant="subtitle1" component="h2">
                            {circle.name}
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

export default withStyles(styles)(CircleCard);
