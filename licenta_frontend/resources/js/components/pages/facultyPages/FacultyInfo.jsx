import React, { Component } from 'react';
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
            this.props.auth.loggedIn ? <div className="row">
                <div className="col-12 col-md-4 col-lg-3 secondary-menu">
                    <MenuSecondary></MenuSecondary>
                </div>
            </div> : <div className="card col-md-6 m-auto"></div>

        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(FacultyInfo));