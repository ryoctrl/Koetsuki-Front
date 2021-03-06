import React from 'react';
import ReactDOM from 'react-dom';

// redux
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './stores/reducers/RootReducer';

// redux-persist
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple,/* orange, green, pink, blue, yellow*/ } from '@material-ui/core/colors';
//purple:500, orange:700, green:600, pink:500, blue: 500, yellow:500

// react-router
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from '~/src/components/common/ScrollToTop';

import App from './App';

const transform = createTransform(
    store => store,
    outbound => {
        if(outbound.length !== 1) return outbound;
        delete outbound[0].results;
        console.log('results deleted!');
        return outbound;
    },
    { whitelist: [ 'circles' ]}
);

// redux, persist initialize
const persistConfig = {
    key: 'koetuki',
    storage,
    blacklist: ['page'],
    whitelist: ['circles', 'favorites'],
    transforms: [transform]
}

const persistedRootReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(
    persistedRootReducer,
    applyMiddleware(thunk/*, logger*/)
);

const pstore = persistStore(store);

//store.dispatch(getCircles());

// theme initialize

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        type: 'light',
    },
    typography: {
        useNextVariants: true,
    }
});

const Application = () => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <PersistGate loading={<p>loading...</p>} persistor={pstore}>
                <BrowserRouter>
                    <ScrollToTop>
                        <App />
                    </ScrollToTop>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </MuiThemeProvider>
)

ReactDOM.render(<Application /> , document.getElementById('root'));
