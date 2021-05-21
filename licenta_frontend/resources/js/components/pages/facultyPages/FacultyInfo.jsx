import React, { Component } from 'react';
import GetStudents from '../../faculties/GetStudents';
import MenuSecondary from '../menu/MenuSecondary';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../auth/LoginForm';

class FacultyInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            this.props.auth.loggedIn ? <div className="page-with-side-menu">
            <div className="secondary-menu">
                <MenuSecondary></MenuSecondary>
            </div> 
        </div> : <div className="card col-md-6 m-auto">
                    <h5>You must be logged in to see this page</h5>
                    <LoginForm />
                </div>

            
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(FacultyInfo));