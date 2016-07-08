import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import articleListReducer from './articleListReducer';
import articleDetailReducer from './articleDetailReducer';
import themeListReducer from './themeListReducer';

const reducers = combineReducers({
  articleList: articleListReducer,
  articleDetail: articleDetailReducer,
  themeList: themeListReducer,
  routing: routerReducer
});

export default reducers;
