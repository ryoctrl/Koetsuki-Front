import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography, /*Button, IconButton*/ } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1
    },
};


class HeaderMenu extends Component {
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
