import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Modal, CardMedia, Typography, GridListTileBar} from '@material-ui/core';

const Component = props => props.goods ? (
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
    >
        <div className={props.classes.paper}>
            <CardMedia className={props.classes.image} image={'/api/images/' + props.goods.image.path} title={props.goods.name} />

            <GridListTileBar
                title={props.goods.name}
                subtitle={<span>{props.goods.isNew ? '新刊' : '既刊'} price: {props.goods.price}</span>}
            >
            </GridListTileBar>
        </div>
    </Modal>
) : null;

const styles = theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
        margin: '0 auto',
        borderRadius: 10,
        top: '15%',
        height: '70%',
        left: '10%',
        width: '80%',
        overflow: 'hidden',
        [theme.breakpoints.up('lg')]: {
            top: '10.0%',
            height: '80%',
            left: '25%',
            width: '50%',
        }
    },
    image: {
        height: 0,
        paddingTop: '150%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: '69.8%',
        },
        backgroundSize: 'contain',
    }
});

export default withStyles(styles)(Component);
