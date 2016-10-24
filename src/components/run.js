import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';
import RVAModule from './RVAModule';

const store = configureStore();

Provider.childContextTypes = {
    store: React.PropTypes.object
}

// Render the main component into the dom
ReactDOM.render(
    <Provider store={store}>
    <RVAModule />
    </Provider>,
    document.getElementById('app')
);
