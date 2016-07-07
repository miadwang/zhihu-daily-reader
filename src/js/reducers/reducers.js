import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import latestArticlesReducer from './latestArticlesReducer';
import articleReducer from './articleReducer';
import themeReducer from './themeReducer';

const reducers = combineReducers({
  latest: latestArticlesReducer,
  article: articleReducer,
  theme: themeReducer,
  routing: routerReducer
});

export default reducers;
