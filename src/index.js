import React from 'react';
import ReactDOM from 'react-dom';

// redux
import thunk from 'redux-thunk';
//import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './stores/reducers/RootReducer';

// redux-persist
import { persistStore, persistReducer } from 'redux-persist';
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

import * as serviceWorker from './serviceWorker';

// redux, persist initialize
const persistConfig = {
    key: 'koetuki',
    storage,
    blacklist: ['page'],
    whitelist: ['circles', 'favorites'],
}

const persistedRootReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(
    persistedRootReducer,
    applyMiddleware(thunk/*, logger*/)
);

const pstore = persistStore(store);

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

serviceWorker.register();
