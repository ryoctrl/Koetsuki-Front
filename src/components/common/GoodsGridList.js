import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';

class GoodsGridList extends Component {
    render() {
        const { classes, circle, width } = this.props;
        let cellHeight = 640, cols = 4;

        if(!['xl', 'lg'].includes(width)) {
            cellHeight = 320;
            cols = 2;
        }
        return (
            <div className={classes.root}>
                <GridList cellHeight={cellHeight} cols={cols} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={cols} style={{ height: 'auto' }}>
                        <ListSubheader component="div">頒布物</ListSubheader>
                    </GridListTile>
                    {circle.goods.length === 0 && <div>まだ頒布物はないよ</div>}
                    {circle.goods.map(goods => (
                        <GridListTile key={goods.id}>
                            <img src={'/api/images/' + goods.image.path} alt={goods.name} />
                            <GridListTileBar 
                                title={goods.name}
                                subtitle={<span>{goods.isNew ? '新刊' : '既刊'} price: {goods.price}</span>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-arond',
        overFlow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height:'100%',
    },
});

GoodsGridList = withStyles(styles)(GoodsGridList);
GoodsGridList = withWidth()(GoodsGridList);
export default GoodsGridList;
