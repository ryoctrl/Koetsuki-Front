import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class Contents extends Component {
    render() {
        const { pages } = this.props;
        return (
            <div>
                {pages.map(page => (
                    <Route exact={page.exact} key={page.path} path={page.path} component={page.component} />
                ))}
            </div>
        )
    }
}

export default Contents;
