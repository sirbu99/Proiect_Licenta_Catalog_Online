import { combineReducers } from 'redux';
import authentication from './users/authReducer';

const rootReducer = combineReducers({
    authentication,
});

export default rootReducer;
