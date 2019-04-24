import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import GoodsEditor from '~/src/components/common/GoodsEditor';
import CircleEditor from '~/src/components/common/CircleEditor';

class DetailEdit extends Component {
    render() {
        console.log('detail edit rendering');
        const { classes, circle } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="body1" align="center">
                    サークル編集
                </Typography>
                <CircleEditor circle={circle} initialValues={circle}/>
                {(circle.goods.length > 0 &&
                    <Typography variant="body1" align="center">
                        頒布物編集
                    </Typography>
                )}
                {circle.goods.map(goods => {
                    const init = Object.assign({}, goods);
                    delete init.image;
                    init.isNew = String(init.isNew);
                    return (
                        <GoodsEditor 
                            key={goods.id}
                            circle={circle} 
                            goods={goods} 
                            initialValues={init} 
                            form={'goods' + goods.id + '-form'}
                        />
                    )
                }
                )}
                <Typography variant="body1" align="center">
                    頒布物を追加
                </Typography>
                <GoodsEditor circle={circle} form={'goodsnew-form'} initialValues={{}}/>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        padding: '5px',
    }
});

DetailEdit = withStyles(styles)(DetailEdit);

export default DetailEdit;

