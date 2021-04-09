import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser, FaPowerOff } from 'react-icons/fa';

import { authActions } from '../../../actions/users/authActions';

const UserBoxRegistered = (props) => {
    const fullName = _.get(props, 'auth.user.full_name', '');
    const avatar = _.get(props, 'auth.user.image');

    function logout(event) {
        event.preventDefault();
        const { dispatch } = props;
        dispatch(authActions.logout());
    }

    return (
        <div className="userbox float-sm-right m-3 m-sm-auto">
            <a href="#" data-toggle="dropdown">
                <figure className="profile-picture">
                    <img src={avatar} alt={fullName} className="rounded-circle" />
                </figure>
                <div className="profile-info">
                    <span className="name">{_.get(props, 'auth.user.full_name', '')}</span>
                </div>
                
            </a>

            <div className="dropdown-menu">
                <ul className="list-unstyled">
                    <li className="divider" />
                    <li>
                        <Link role="menuitem" to="/manage/profile">
                            <FaUser className="mr-2" />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" onClick={logout}>Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(UserBoxRegistered);
