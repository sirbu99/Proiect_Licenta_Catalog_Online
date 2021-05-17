import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { authActions } from '../../../actions/users/authActions';

import { hasPermission } from '../../../services/commonService';

const MenuSecondary = (props) => {
    function logout(event) {
        event.preventDefault();
        const { dispatch } = props;
        dispatch(authActions.logout());
    }
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h3>Menu</h3>
            </div>

            <ul className="list-unstyled components">
                <li>
                    <Link to="./students" className="nav-link">
                        <FaUser className="mr-2" size="1.5em" />
                        <span>Students</span>
                    </Link>
                </li>
                <li>
                    <Link to="./teachers" className="nav-link">
                        <FaUser className="mr-2" size="1.5em" />
                        <span>Teachers</span>
                    </Link>
                </li>
                <li>
                    <Link to="./announcements" className="nav-link">
                        <FaUser className="mr-2" size="1.5em" />
                        <span>Announcements</span>
                    </Link>
                </li>
                <li>
                    <Link to="./schedule" className="nav-link">
                        <FaUser className="mr-2" size="1.5em" />
                        <span>Schedule</span>
                    </Link>
                </li>
                
                {hasPermission('users.view')
                    ? <li>
                        <Link to="/manage/users" className="nav-link">
                            <FaUser className="mr-2" size="1.5em" />
                            <span>User list</span>
                        </Link>
                    </li>
                    : null
                }
                <li>
                    <Link to="/logout" onClick={logout} className="nav-link">
                            <FaUser className="mr-2" size="1.5em" />
                            <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};


const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(MenuSecondary);
