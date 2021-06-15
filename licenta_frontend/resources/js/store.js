import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const middleware = applyMiddleware(thunkMiddleware, createLogger());

export default createStore(rootReducer, middleware);