import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button/*, IconButton*/ } from '@material-ui/core';

import { SearchRounded as SearchIcon } from '@material-ui/icons';

import SearchModal from '~/src/components/modals/SearchModal';

const styles = theme => ({
    root: {
        flexGrow: 1,
        top: 0,
        left: 0,
        right: 0,
        position: 'fixed',
        zIndex: 999
    },
    grow: {
        marginLeft: theme.spacing.unit * 8,
        flexGrow: 1
    },
});

class HeaderMenu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    handleClose = () => {
        this.setState({
            open: false
        });
    }
    onClickSearch = () => {
        this.setState({
            open: true
        });
    }
    render() {
        let { classes, page, pages, location } = this.props;
        if(!page.page || !page.page.title) page.page = pages.find(p => p.path === location.pathname);
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" align="center" color="inherit" className={classes.grow}>
                            {page.page.title}
                            
                        </Typography>
                        {page.page.searchable && (
                            <Button onClick={this.onClickSearch} color="inherit">
                                <SearchIcon />
                            </Button>
                        )}
                        {page.page.searchable && (
                            <SearchModal open={this.state.open} handleClose={this.handleClose}/>
                        )}

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

HeaderMenu = connect(s => s)(HeaderMenu);
HeaderMenu = withStyles(styles)(HeaderMenu);
HeaderMenu = withRouter(HeaderMenu);

export default HeaderMenu;
