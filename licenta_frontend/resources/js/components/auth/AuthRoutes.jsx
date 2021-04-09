import React from 'react';
import { Route } from 'react-router-dom';

import LoginForm from './LoginForm';
import HomePage from '../pages/HomePage'

const routes = {
    all: [

    ],
    loggedIn: [
    ],
    byPermission: {

    },
    anonymous: [
        <Route exact key="route-auth-login" path="/login" component={LoginForm} />,
    ],
};

export default {
    routes,
};
