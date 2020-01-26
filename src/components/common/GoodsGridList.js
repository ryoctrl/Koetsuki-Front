import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core';
import GoodsModal from '../modals/GoodsModal';
import Img from 'react-image';

class GoodsGridList extends Component {
    state = {
        modalOpen: false,
        goods: null,
    }

    openModal = goods => {
        this.setState({
            modalOpen: true,
            goods
        });
    }

    renderImage = goods => {
        const { classes } = this.props;
        const url = '/api/images/' + goods.image.path;
        if(url.indexOf('no_image') === -1) {
            return (<Img className={classes.ReactImage} src={url} alt={goods.name} />);
        }

        return (
            <div className={classes.imageBlock}>
                <p className={classes.imageWrapper}>
                    <Img className={classes.image} src={url} alt={goods.name} />
                </p>
            </div>

        );
    }

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
                    <GoodsModal open={this.state.modalOpen} handleClose={() => this.setState({ modalOpen: false})} goods={this.state.goods} />
                    {circle.goods.length === 0 && <div>まだ頒布物はないよ</div>}
                    {circle.goods.map(goods => (
                        <GridListTile key={goods.id} onClick={() => this.openModal(goods)}>
                            {this.renderImage(goods)}
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
    imageBlock: {
        display: 'table',
        width: '100%',
        height: '100%',
    },
    imageWrapper: {
        display: 'table-cell',
        verticalAlign: 'middle',

    },
    image: {
        width: '100%',
        height: 'auto',
        margin: '0 auto',
        //objectFit: 'cover',
    },
    ReactImage: {
        left: '50%',
        height: '100%',
        position: 'relative',
        transform: 'translateX(-50%)',
    }
});

GoodsGridList = withStyles(styles)(GoodsGridList);
GoodsGridList = withWidth()(GoodsGridList);
export default GoodsGridList;
