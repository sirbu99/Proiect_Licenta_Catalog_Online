import _ from 'lodash';
import { getApiHost } from '../commonService';

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    };

    return fetch(`${getApiHost()}/login`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            if (!response.data) return null;

            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        });
}

function logout() {
    if (localStorage.getItem('user') === null) {
        return false;
    }
    return $.post(`${getApiHost()}/logout`)

    .always(() => {
        localStorage.clear();
        // location.assign('/');
    });
}

function refresh(userData) {
    if (localStorage.getItem('user') === null) {
        return false;
    }

    return $.get(`${getApiHost()}/profile`)
        .then((response) => {
            if (!response.data) return null;

            const user = JSON.parse(localStorage.getItem('user'));
            const newUser = _.assign(user, response.data);
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        });
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (response.status === 401) {
            logout();
        }
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject({
                status: response.status,
                error,
            });
        }

        return data;
    });
}


export const authService = {
    login,
    logout,
    refresh,
};