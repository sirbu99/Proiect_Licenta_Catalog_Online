import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import UniversitiesPage from './UniversitiesPage';
import FacultiesPage from './FacultiesPage';

const routes = {
    all: [
        <Route key="route-home-page" exact path="/" component={HomePage} />,
        <Route key="route-about-us-page" exact path="/about-us" component={AboutUs} />,
        <Route key="route-universities" exact path="/universities" component={UniversitiesPage} />,
        <Route key="route-faculties" exact path="/universities/:id" component={FacultiesPage} />,
    ],
    loggedIn: [

    ],
    byPermission: {

    },
};

export default {
    routes,
};
