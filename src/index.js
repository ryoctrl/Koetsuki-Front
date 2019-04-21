import React from 'react';
import ReactDOM from 'react-dom';

// redux
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './stores/reducers/RootReducer';
import { getCircles } from './stores/actions/CircleAction';

// redux-persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// react-router
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

const persistConfig = {
    key: 'koetuki',
    storage,
}

const persistedRootReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(
    persistedRootReducer,
    //RootReducer,
    applyMiddleware(thunk, logger)
);

const pstore = persistStore(store);

store.dispatch(getCircles());

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    }
});

const Application = () => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <PersistGate loading={<p>loading...</p>} persistor={pstore}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </MuiThemeProvider>
)

ReactDOM.render(<Application /> , document.getElementById('root'));

