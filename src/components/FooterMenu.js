import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import { getChangePageAction } from '~/src/stores/actions/PageAction';

const styles = {
    root: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0
    }
}

class FooterMenu extends Component {
    constructor(props) {
        super(props);
        let val = 0;
        if(props.location.pathname.indexOf('/circles') !== -1) {
            val = 0;
        } else if(props.location.pathname.indexOf('/favorites') !== -1) {
            val = 1;
        } else if(props.location.pathname.indexOf('/settings') !== -1) {
            val = 2;
        }

        this.state = {
            value: val,
        }
    }

    handleChange = (e, value) => {
        const page = this.props.pages[value + 1];
        const action = getChangePageAction(page);
        this.props.dispatch(action);
        this.setState({value});
    }

    render() {
        const { classes, pages } = this.props;
        const { value } = this.state;
        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}>

                {pages.filter(page => typeof(page.icon) !== 'undefined').map(page => (
                    <BottomNavigationAction
                        component={Link}
                        key={page.label}
                        to={page.path}
                        label={page.label}
                        icon={page.icon}/>
                ))}
            </BottomNavigation>
        )
    }
}

FooterMenu = connect(s => s)(FooterMenu);
FooterMenu = withRouter(FooterMenu);
FooterMenu = withStyles(styles)(FooterMenu);

export default FooterMenu;

