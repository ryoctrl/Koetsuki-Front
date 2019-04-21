import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import { getChangePageAction } from '~/src/stores/actions/PageAction';

const styles = {
    root: {
        position: 'fixed',
        width: '100%',
        bottom: 0
    }
}

class FooterMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }

    handleChange = (e, value) => {
        console.log('onchange!!');
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
FooterMenu = withStyles(styles)(FooterMenu);

export default FooterMenu;

