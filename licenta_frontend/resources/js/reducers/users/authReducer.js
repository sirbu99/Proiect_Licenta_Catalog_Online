import _ from 'lodash';
import { authConstants } from '../../constants/users/authConstants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = { loggedIn: isLoggedIn(user), user };

function isLoggedIn(user = {}) {
    return _.get(user, 'id') > 0;
}

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
        return {
            loggedIn: false,
            user: action.user,
        };
        case authConstants.LOGIN_SUCCESS:
        case authConstants.LOGIN_REFRESH:
            return {
                loggedIn: true,
                user: action.user,
            };
        case authConstants.LOGIN_FAILURE:
        case authConstants.LOGOUT:
            return {
                loggedIn: false,
                user: {},
                status: _.get(action, 'data.status', null),
            };
        default:
            return state;
    }
}
