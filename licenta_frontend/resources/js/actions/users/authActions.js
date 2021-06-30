import toastr from 'toastr';
import { authConstants } from '../../constants/users/authConstants';
import { authService } from '../../services/users/authService';

function login(userData) {
    function request(user) {
        return { type: authConstants.LOGIN_REQUEST, user };
    }

    function success(user) {
        return { type: authConstants.LOGIN_SUCCESS, user };
    }

    function failure(data) {
        return { type: authConstants.LOGIN_FAILURE, data };
    }

    return (dispatch) => {
        dispatch(request({ userData }));

        authService.login(userData.email, userData.password)
            .then(
                (user) => {
                    dispatch(success(user));
                },
                (data) => {
                    toastr.error(data.error.toString());
                    dispatch(failure(data));
                },
            );
    };
}

function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
}

function refresh(userData = null) {
    function success(user) {
        return { type: authConstants.LOGIN_REFRESH, user };
    }

    if (!_.isNull(userData)) {
        const user = JSON.parse(localStorage.getItem('user'));
        const newUser = _.assign(user, userData);
        localStorage.setItem('user', JSON.stringify(newUser));
        return success(userData);
    }

    return (dispatch) => {
        authService.refresh()
            .then(
                (user) => {
                    dispatch(success(user));
                },
                (data) => {
                    // something went wrong => do not refresh user
                },
            )
    };
}

export const authActions = {
    login,
    logout,
    refresh,
};