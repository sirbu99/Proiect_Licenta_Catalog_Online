import React, { Component } from 'react';
import GetStudentGrades from '../../faculties/GetStudentGrades';
import MenuSecondary from '../menu/MenuSecondary';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../auth/LoginForm';

class StudentGrades extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            this.props.auth.loggedIn ?
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-2 secondary-menu">
                        <MenuSecondary />
                    </div>
                    <div className="col-12 col-md-8 col-lg-10 text-center">
                        <h1>Grades</h1>
                        <hr></hr>
                        <GetStudentGrades universityId={this.props.match.params.id} facultyId={this.props.match.params.facultyId}></GetStudentGrades>
                    </div>
                </div>
                : <div className="card col-md-6 m-auto">
                    <h5 className="text-center">You must be logged in to see this page</h5>
                    <LoginForm />
                </div>

        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(StudentGrades));