import React from 'react';
import { connect } from 'react-redux';

// import UserBoxRegistered from './UserBoxRegistered';
// import UserBoxAnonymous from './UserBoxAnonymous';
import { FaUser } from 'react-icons/fa';
import LoginForm from '../../auth/LoginForm';
import { Link } from 'react-router-dom';
import { authActions } from '../../../actions/users/authActions';

const UserBox = (props) => {
    function logout(event) {
        event.preventDefault();
        const { dispatch } = props;
        dispatch(authActions.logout());
    }

    return (
        <div className="user-box">
        <FaUser />
            {!props.auth.loggedIn ? <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Login
            </a>: <Link to="/logout" onClick={logout}>Logout</Link>

            }
            {!props.auth.loggedIn ? <div className="dropdown-menu dropdown-menu-end">
                <LoginForm />
            </div>: null }
        </div>
    )
};

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(UserBox);
