import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Modal, Typography, TextField, Select, MenuItem, InputLabel, Input } from '@material-ui/core';

import { connect } from 'react-redux';
import CircleMapper from '~/src/stores/mappers/CircleMapper';
import { getSearchAction } from '~/src/stores/actions/CircleAction';

const spaces = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S', 'あ', 'い','う','え','お', '痛'];

class SearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            penName: '',
            space: '',
            sortTarget: 'id',
            sortLogic: 'asc',
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
                        <div className={classes.inputDiv}>
                            <TextField 
                                label="サークル名で検索" 
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.changeField('name')}
                                margin="normal"/>
                        </div>
                        <div className={classes.inputDiv}>
                            <TextField 
                                label="ペンネームで検索" 
                                className={classes.textField}
                                value={this.state.penName}
                                onChange={this.changeField('penName')}
                                margin="normal"/>
                        </div>
                        <div className={classes.inputDiv}>
                            <InputLabel shrink htmlFor="space-search" className={classes.labelS}>
                                スペース記号で検索
                            </InputLabel>
                            <Select 
                                className={classes.textField}
                                value={this.state.space}
                                onChange={this.changeField('space')}
                                input={<Input name="space" id="space-search"/>}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {spaces.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)};
                            </Select>
                        </div>
                    </div>
                    <Typography variant="h6" align="center" className={classes.menuTitle}>
                        ソート
                    </Typography>
                    <div>
                        <div className={classes.inputDiv}>
                            <InputLabel shrink htmlFor="sort-target" className={classes.labelS}>
                                ソート対象項目
                            </InputLabel>
                            <Select
                                className={classes.textField}
                                value={this.state.sortTarget}
                                onChange={this.changeField('sortTarget')}
                                input={<Input name="sort-target" id="sort-target"/>}>
                                <MenuItem value="id">
                                    <em>default</em>
                                </MenuItem>
                                <MenuItem value="updatedAt">
                                    <em>更新日時</em>
                                </MenuItem>
                                <MenuItem value="name">
                                    <em>サークル名</em>
                                </MenuItem>
                                <MenuItem value="pen">
                                    <em>ペンネーム</em>
                                </MenuItem>
                                <MenuItem value="space">
                                    <em>スペース記号</em>
                                </MenuItem>
                                <MenuItem value="goods">
                                    <em>登録頒布物数</em>
                                </MenuItem>
                            </Select>
                        </div>
                        <div className={classes.inputDiv}>
                            <InputLabel shrink htmlFor="sort-logic" className={classes.labelS}>
                                ソート方法
                            </InputLabel>
                            <Select
                                className={classes.textField}
                                value={this.state.sortLogic}
                                onChange={this.changeField('sortLogic')}
                                input={<Input name="sort-logic" id="sort-logic"/>}>
                                <MenuItem value="asc">昇順</MenuItem>
                                <MenuItem value="desc">降順</MenuItem>
                            </Select>
                        </div>

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
        top: '27.5%',
        height: '45%',
        left: '40%',
        width: '20%',
        borderRadius: 10,
        [theme.breakpoints.down('lg')]: {
            left: '10%',
            width: '80%',
            height: '65%',
            top: '17.5%',
        }
    },
    inputDiv: {
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        [theme.breakpoints.down('lg')]: {
            marginLeft: theme.spacing.unit * 0.8

        }
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: theme.spacing.unit * 40,
        [theme.breakpoints.down('lg')]: {
            width: '93%',
        }
    },
    labelS: {
        display: 'block',
        width: '50%',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
    },
    menuTitle: {
        marginTop: theme.spacing.unit
    }
});


SearchModal = connect(CircleMapper)(SearchModal);

export default withStyles(styles)(SearchModal);
