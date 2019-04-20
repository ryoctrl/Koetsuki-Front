import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';

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
        const { classes, page } = this.props;
        console.log(page);
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" align="center" color="inherit" className={classes.grow}>
                            {page.page.title || "トップ"}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

HeaderMenu = connect(s => s)(HeaderMenu);
HeaderMenu = withStyles(styles)(HeaderMenu);

export default HeaderMenu;
