import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import articleListReducer from './articleListReducer';
import articleDetailReducer from './articleDetailReducer';
import themeListReducer from './themeListReducer';
import layoutReducer from './layoutReducer';

const reducers = combineReducers({
  articleList: articleListReducer,
  articleDetail: articleDetailReducer,
  themeList: themeListReducer,
  layout: layoutReducer,
  routing: routerReducer
});

export default reducers;
