import React, { Component } from 'react';
import { GridListTile, GridListTileBar } from '@material-ui/core';

class GoodsGrid extends Component {
    render() {
        const { goods } = this.props;
        return (
            <GridListTile key={goods.id}>
                <img src={'/api/images/' + goods.image.path} alt={goods.name} />
                <GridListTileBar
                    title={goods.name}
                    subtitle={<span>{goods.isNew ? '新刊' : '既刊'} price: {goods.price}</span>}
                />
            </GridListTile>
        )
    }
}

export default GoodsGrid;
