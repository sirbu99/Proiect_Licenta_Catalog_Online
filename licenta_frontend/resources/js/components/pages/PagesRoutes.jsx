import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import UniversitiesPage from './uniPages/UniversitiesPage';
import FacultiesPage from './facultyPages/Faculties';
import EditUniversityPage from './uniPages/EditUniversityPage';
import EditFacultyPage from './facultyPages/EditFaculty';
import Students from './facultyPages/Students';
import FacultyInfoPage from './facultyPages/FacultyInfo';
import Teachers from './facultyPages/Teachers';
import Schedule from './facultyPages/Schedule';
import Announcements from './facultyPages/Announcements';

const routes = {
    all: [
        <Route key="route-home-page" exact path="/" component={HomePage} />,
        <Route key="route-about-us-page" exact path="/about-us" component={AboutUs} />,
        <Route key="route-universities" exact path="/universities" component={UniversitiesPage} />,
        <Route key="route-faculties" exact path="/universities/:id" component={FacultiesPage} />,
    ],
    loggedIn: [
        <Route key="route-faculties-students" exact path="/universities/:id/:facultyId/students" component={Students} />,
        <Route key="route-faculties-teachers" exact path="/universities/:id/:facultyId/teachers" component={Teachers} />,
        <Route key="route-faculties-info" exact path="/universities/:id/:facultyId/info" component={FacultyInfoPage} />,
        <Route key="route-faculties-schedule" exact path="/universities/:id/:facultyId/schedule" component={Schedule} />,
        <Route key="route-faculties-announcements" exact path="/universities/:id/:facultyId/announcements" component={Announcements} />,
    ],
    byPermission: {
        "edit_university": [
            <Route key="route-universities-edit" exact path="/universities/:id/edit" component={EditUniversityPage} />,
        ],
        "edit_faculty": [
            <Route key="route-faculties-edit" exact path="/universities/:id/:facultyId/edit" component={EditFacultyPage} />,
        ]
    },
};

export default {
    routes,
};
