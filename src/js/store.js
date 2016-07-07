import { createStore, applyMiddleware, } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers/reducers';

const middleware = applyMiddleware(logger());

export default function configureStore(initialState) {
  return createStore (reducers, initialState, middleware);
}
