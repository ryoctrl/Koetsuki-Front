import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button/*, IconButton*/ } from '@material-ui/core';

import { EditRounded as EditIcon, SearchRounded as SearchIcon } from '@material-ui/icons';

import CircleMapper from '~/src/stores/mappers/CircleMapper';

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
    rightGrow: {
        marginLeft: theme.spacing.unit * 8,
        flexGrow: 1
    },
    grow: {
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
        let { classes, page, pages, location, user } = this.props;
        page.page= pages.find(page => {
            const pagePath = page.path;
            const currentPath = location.pathname;
            const pagePaths = pagePath.split('/');
            const currentPaths = currentPath.split('/');
            if(pagePaths.length !== currentPaths.length) return false;

            for(const index in pagePaths) {
                const pp = pagePaths[index];
                const cp = currentPaths[index];
                if(pp.startsWith(':')) {
                    const ppType = pp.substring(1, pp.length);
                    if(ppType === 'number' && Number.isNaN(Number(cp))) return false;
                } else {
                    if(cp !== pp) return false;
                }
            }
            return true;
        });

        const searchable = (page.page && page.page.searchable) || false;
        let editable = (page.page && page.page.editable) || false;
        editable = editable && user.authed;
        const title = page.page === undefined ? 'NoTitle' :page.page.title;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography 
                            variant="h6" 
                            align="center" 
                            color="inherit" 
                            className={searchable || editable ? classes.rightGrow : classes.grow}>
                            {title}
                        </Typography>
                        {searchable && (
                            <Button onClick={this.onClickSearch} color="inherit">
                                <SearchIcon />
                            </Button>
                        )}
                        {searchable && (
                            <SearchModal open={this.state.open} handleClose={this.handleClose}/>
                        )}

                        {editable &&(
                            <Button component={Link} to={location.pathname + '/edit'} color="inherit">
                                <EditIcon />
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

HeaderMenu = connect(CircleMapper)(HeaderMenu);
HeaderMenu = withStyles(styles)(HeaderMenu);
HeaderMenu = withRouter(HeaderMenu);

export default HeaderMenu;
