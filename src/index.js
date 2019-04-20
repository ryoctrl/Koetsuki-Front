import React from 'react';
import ReactDOM from 'react-dom';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './stores/reducers/RootReducer';
import { getCircles } from './stores/actions/CircleAction';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

const store = createStore(
    RootReducer,
    applyMiddleware(thunk, logger)
);

store.dispatch(getCircles());


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    }
});

const Application = () => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
)

ReactDOM.render(<Application /> , document.getElementById('root'));

