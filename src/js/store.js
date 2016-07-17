import { createStore, applyMiddleware, } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import reducers from './reducers/reducers';

var env = process.env.NODE_ENV;

const middleware = env === 'production' ? applyMiddleware(promise()) : applyMiddleware(promise(), logger());

export default function configureStore(initialState) {
  return createStore (reducers, initialState, middleware);
}
