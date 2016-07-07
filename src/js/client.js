import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';
import actions from './actions';
import App from './components/App';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails';

const initialState = {};

const store = configureStore(initialState);
store.dispatch(actions.fetchLatest());
store.dispatch(actions.fetchThemes());

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={ArticleList}>
          <Route path='/article/:id' component={ArticleDetails}/>
        </IndexRoute>
        <Route path='themes/:name' component={ArticleList}>
          <Route path='/article/:id' component={ArticleDetails}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
document.getElementById('app'));
