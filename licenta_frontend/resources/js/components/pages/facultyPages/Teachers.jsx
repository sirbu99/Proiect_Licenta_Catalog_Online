import React, { Component } from 'react';
import GetTeachers from '../../faculties/GetTeachers';
import MenuSecondary from '../menu/MenuSecondary';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../auth/LoginForm';

class Teachers extends Component {
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
                        <GetTeachers
                            universityId={this.props.match.params.id}
                            facultyId={this.props.match.params.facultyId}
                        />
                    </div>

                </div>
                : <div className="card col-md-6 m-auto">
                    <h5>You must be logged in to see this page</h5>
                    <LoginForm />
                </div>

        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(Teachers));