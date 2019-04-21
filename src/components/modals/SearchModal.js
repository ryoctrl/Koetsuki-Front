import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Modal, Button, Typography, TextField } from '@material-ui/core';

import { connect } from 'react-redux';
import CircleMapper from '~/src/stores/mappers/CircleMapper';
import { getSearchAction } from '~/src/stores/actions/CircleAction';

class SearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            penName: '',
        }
    }

    changeField = fieldName => event => {
        const newState = Object.assign({}, this.state);
        newState[fieldName] = event.target.value;
        this.props.dispatch(getSearchAction(newState));
        this.setState(newState);
    }

    render() {
        let { classes, open, handleClose } = this.props;
        return (
            <Modal 
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    <Typography variant="h6" align="center">
                        検索
                    </Typography>
                    <div>
                        <TextField 
                            label="サークル名で検索" 
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.changeField('name')}
                            margin="normal"/>
                        <TextField 
                            label="ペンネームで検索" 
                            className={classes.textField}
                            value={this.state.penName}
                            onChange={this.changeField('penName')}
                            margin="normal"/>
                    </div>
                </div>
            </Modal>
        )
    }
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        paddingTop: theme.spacing.unit,
        outline: 'none',
        margin: '0 auto',
        top: '35%',
        height: '30%',
        left: '25%',
        width: '50%',
        borderRadius: 10,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});


SearchModal = connect(CircleMapper)(SearchModal);

export default withStyles(styles)(SearchModal);
