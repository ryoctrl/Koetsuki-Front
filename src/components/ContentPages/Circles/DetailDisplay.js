import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import FavoriteButton from '~/src/components/common/FavoriteButton';

import GoodsGridList from '~/src/components/common/GoodsGridList';

class DetailDisplay extends Component {
    render() {
        const { classes, circle } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h5">
                    {circle.name}
                    <FavoriteButton circle={circle}/>
                </Typography>
                <Typography variant="h5">
        {circle.penName} {circle.twitter ? <a href={'https://twitter.com/' + circle.twitter}>{'@'+circle.twitter}</a> : ''}
                </Typography>
                <Typography variant="h6">
                    スペース: {circle.spaceName}
                </Typography>
                <GoodsGridList circle={circle}/>
            </div>
        )

    }

}

const styles = theme => ({
    root: {
        padding: '5px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
});

DetailDisplay = withStyles(styles)(DetailDisplay);

export default DetailDisplay;

