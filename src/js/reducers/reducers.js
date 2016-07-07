import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import latestArticlesReducer from './latestArticlesReducer';
import articleReducer from './articleReducer';
import themesReducer from './themesReducer';

const reducers = combineReducers({
  latest: latestArticlesReducer,
  article: articleReducer,
  themes: themesReducer,
  routing: routerReducer
});

export default reducers;
