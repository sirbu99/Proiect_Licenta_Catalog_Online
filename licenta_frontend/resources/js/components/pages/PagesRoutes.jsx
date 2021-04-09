import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';

import AboutUs from './AboutUs';

const routes = {
    all: [
        <Route key="route-home-page" exact path="/" component={HomePage} />,
        <Route key="route-about-us-page" exact path="/about-us" component={AboutUs} />,
    ],
    loggedIn: [

    ],
    byPermission: {

    },
};

export default {
    routes,
};
