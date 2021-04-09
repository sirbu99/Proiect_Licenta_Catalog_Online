import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser, FaProjectDiagram, FaStore, FaListAlt, FaHandshake, FaBlog, FaTag, FaComment } from 'react-icons/fa';
import { authActions } from '../../../actions/users/authActions';

import { hasPermission } from '../../../services/commonService';

const MenuSecondary = (props) => {
    function logout(event) {
        event.preventDefault();
        const { dispatch } = props;
        dispatch(authActions.logout());
    }
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Sidebar menu</h3>
            </div>

            <ul className="list-unstyled components">
                <li>
                    <Link to="/manage/profile" className="nav-link">
                        <FaUser className="mr-2" size="1.5em" />
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link to="/manage/profile/edit" className="nav-link">
                        <FaUser className="mr-2" size="1.5em" />
                        <span>Profile Edit</span>
                    </Link>
                </li>
                <li>
                    <Link to="/manage/users" className="nav-link">
                        <FaUser className="mr-2" size="1.5em" />
                        <span>User list</span>
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
