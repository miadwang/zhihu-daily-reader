import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';
import actions from './actions';
import App from './containers/App';
import ContentArea from './containers/ContentArea';
import ArticleDetail from './containers/ArticleDetail';

const initialState = {};

const store = configureStore(initialState);
store.dispatch(actions.fetchLatestArticleList());
store.dispatch(actions.fetchThemeList());

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={ContentArea}>
          <Route path='/article/:id' component={ArticleDetail}/>
        </IndexRoute>
        <Route path='themes/:name' component={ContentArea}>
          <Route path='/article/:id' component={ArticleDetail}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
document.getElementById('app'));
