import React, { Component } from 'react';

import HeaderMenu from './components/HeaderMenu';
import Contents from './components/Contents';
import FooterMenu from './components/FooterMenu';

import PAGES from './pages';

class App extends Component {
    render() {
        return (
            <div>
                <HeaderMenu />
                <Contents pages={PAGES} />
                <FooterMenu pages={PAGES} />
            </div>
        );
    }
}

export default App;
