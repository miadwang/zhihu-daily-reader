import { createStore, applyMiddleware, } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import reducers from './reducers/reducers';

const middleware = applyMiddleware(promise(), logger());

export default function configureStore(initialState) {
  return createStore (reducers, initialState, middleware);
}
