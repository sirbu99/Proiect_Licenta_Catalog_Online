import React from 'react';
import { connect } from 'react-redux';
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
            <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUser className="mr-2" size="1.5em" />
                    Account
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {props.auth.loggedIn ?
                        <>
                            <li><Link to={`/users/${props.auth.user.id}/profile`} className="nav-link">Profile</Link></li>
                            <li>
                                <Link to="/profile" onClick={logout} className="nav-link">
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </> :
                        <LoginForm />
                    }
                </ul>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(UserBox);
