import React from 'react';
import { Route } from 'react-router-dom';

import ProfileView from './profile/ProfileView';
import ProfileForm from './profile/ProfileForm';

import UsersOverview from './UsersOverview';
import UserForm from './UserForm';

const routes = {
    all: [
        <Route exact key="route-users-view" path="/manage/users" component={UsersOverview} />,
        <Route exact key="route-users-edit" path="/manage/users/new" component={UserForm} />,
        <Route exact key="route-users-edit" path="/manage/users/:userId/edit" component={UserForm} />,
    ],
    loggedIn: [
        <Route exact key="route-users-profile-view" path="/manage/profile" component={ProfileView} />,
        <Route exact key="route-users-profile-edit" path="/manage/profile/edit" component={ProfileForm} />,
    ],
    byPermission: {
        'users.view': [
            <Route exact key="route-users-view" path="/manage/users" component={UsersOverview} />,
        ],
        'users.create': [
            <Route exact key="route-users-edit" path="/manage/users/new" component={UserForm} />,
        ],
        'users.edit': [
            <Route exact key="route-users-edit" path="/manage/users/:userId/edit" component={UserForm} />,
        ],
    },
};


export default {
    routes,
};
