import React from 'react';
import { Route } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import RegisterConfirmView from './RegisterConfirmView';

const routes = {
    all: [

    ],
    loggedIn: [
    ],
    byPermission: {

    },
    anonymous: [
        <Route exact key="route-auth-login" path="/login" component={LoginForm} />,
        <Route exact key="route-auth-register" path="/register" component={RegisterForm} />,
        <Route exact key="route-auth-register-confirm" path="/register/confirm" component={RegisterConfirmView} />,
    ],
};

export default {
    routes,
};
