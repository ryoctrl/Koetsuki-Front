import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Route } from 'react-router-dom';

import HeaderMenu from './components/HeaderMenu';
import Contents from './components/Contents';
import FooterMenu from './components/FooterMenu';

import CircleList from './components/ContentPages/Circles/CircleList';

import PAGES from './pages';

class App extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <HeaderMenu pages={PAGES} />
                <div className={classes.content}>
                    <Route path='/' component={CircleList} />
                    <Contents pages={PAGES} />
                </div>
                <FooterMenu pages={PAGES} />
            </div>
        );
    }
}

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 0.5,
        paddingTop: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 8,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    }
});

export default withStyles(styles)(App);
