import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import latestArticleListReducer from './latestArticleListReducer';
import articleReducer from './articleReducer';
import themeListReducer from './themeListReducer';

const reducers = combineReducers({
  latestArticleList: latestArticleListReducer,
  article: articleReducer,
  themeList: themeListReducer,
  routing: routerReducer
});

export default reducers;
