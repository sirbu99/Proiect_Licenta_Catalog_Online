import React from 'react';
import { Route } from 'react-router-dom';
import UniversitiesPage from './uniPages/Universities';
import FacultiesPage from './facultyPages/Faculties';
import EditUniversity from './uniPages/EditUniversity';
import EditFaculty from './facultyPages/EditFaculty';
import Students from './facultyPages/Students';
import FacultyInfo from './facultyPages/FacultyInfo';
import Teachers from './facultyPages/Teachers';
import Schedule from './facultyPages/Schedule';
import Announcements from './facultyPages/Announcements';
import StudentInfoForm from '../faculties/StudentInfoForm';
import TeacherInfoForm from '../faculties/TeacherInfoForm';
import AnnouncementsForm from '../faculties/AnnouncementsForm';
import ScheduleInfoForm from '../faculties/ScheduleInfoForm';
import GetStudentGrades from '../faculties/GetStudentGrades';
import GradesTable from '../faculties/GradesTable';
import ProfileView from '../users/ProfileView';
import Grades from './facultyPages/Grades';

const routes = {
    all: [
        <Route key="route-home-page" exact path="/" component={UniversitiesPage} />,
        <Route key="route-universities" exact path="/universities" component={UniversitiesPage} />,
        <Route key="route-faculties" exact path="/universities/:id" component={FacultiesPage} />,
        <Route key="route-faculties-info" exact path="/universities/:id/:facultyId/info" component={FacultyInfo} />
    ],
    loggedIn: [
        <Route key="route-faculties-students" exact path="/universities/:id/:facultyId/students" component={Students} />,
        <Route key="route-faculties-teachers" exact path="/universities/:id/:facultyId/teachers" component={Teachers} />,
        <Route key="route-faculties-schedule" exact path="/universities/:id/:facultyId/schedule" component={Schedule} />,
        <Route key="route-faculties-announcements" exact path="/universities/:id/:facultyId/announcements" component={Announcements} />,
        <Route key="route-users-profile" exact path="/users/:userId/profile" component={ProfileView} />,

    ],
    byPermission: {
        "edit_university": [
            <Route key="route-universities-edit" exact path="/universities/:id/edit" component={EditUniversity} />,
        ],
        "edit_faculty": [
            <Route key="route-faculties-edit" exact path="/universities/:id/:facultyId/edit" component={EditFaculty} />,
        ],
        "edit_student": [
            <Route key="route-students-edit" exact path="/universities/:id/:facultyId/students/:userId/edit" component={StudentInfoForm} />,
            <Route key="route-students-grades" exact path="/universities/:id/:facultyId/students/:userId/grades" component={GetStudentGrades} />,
        ],
        "add_student": [
            <Route key="route-students-add" exact path="/universities/:id/:facultyId/students/new" component={StudentInfoForm} />,
        ],
        "teacher": [
            <Route key="route-teachers-edit" exact path="/universities/:id/:facultyId/teachers/:userId/edit" component={TeacherInfoForm} />,
            <Route key="route-teachers-add" exact path="/universities/:id/:facultyId/teachers/new" component={TeacherInfoForm} />,
        ],
        "announcements": [
            <Route key="route-announcements-edit" exact path="/universities/:id/:facultyId/announcements/:announcementId/edit" component={AnnouncementsForm} />,
            <Route key="route-announcements-add" exact path="/universities/:id/:facultyId/announcements/new" component={AnnouncementsForm} />,
        ],
        "schedule": [
            <Route key="route-schedule-edit" exact path="/universities/:id/:facultyId/schedule/:scheduleId/edit" component={ScheduleInfoForm} />,
            <Route key="route-schedule-add" exact path="/universities/:id/:facultyId/schedule/new" component={ScheduleInfoForm} />,
        ],
        "edit_grades": [
            <Route key="route-grades-table" exact path="/universities/:id/:facultyId/grades-table" component={Grades} />,
        ]

    },
};

export default {
    routes,
};
