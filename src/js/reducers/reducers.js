import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import titleBarReducer from './titleBarReducer';
import articleListReducer from './articleListReducer';
import articleDetailReducer from './articleDetailReducer';
import themeListReducer from './themeListReducer';
import layoutReducer from './layoutReducer';

const reducers = combineReducers({
  titleBar: titleBarReducer,
  articleList: articleListReducer,
  articleDetail: articleDetailReducer,
  themeList: themeListReducer,
  layout: layoutReducer,
  routing: routerReducer
});

export default reducers;
