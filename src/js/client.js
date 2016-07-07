import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';
import actions from './actions';
import App from './App';

const initialState = {};

const store = configureStore(initialState);
store.dispatch(actions.fetchLatest());
store.dispatch(actions.fetchThemes());

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}></Route>
    </Router>
  </Provider>,
document.getElementById('app'));
