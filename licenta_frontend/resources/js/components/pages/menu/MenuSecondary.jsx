import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import { hasPermission } from '../../../services/commonService';

const MenuSecondary = (props) => {
    const userId = _.get(props, 'auth.user.data.id');
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h3>Menu</h3>
            </div>

            <ul className="list-unstyled components">
                <li>
                    <Link to="./announcements" className="nav-link">
                        <FaUser className="mr-2" size="1.5em" />
                        <span>Announcements</span>
                    </Link>
                </li>
                {_.get(props, 'auth.user.role_id') == '1'
                    ? <>
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
                    </>
                    : null
                }
                {_.get(props, 'auth.user.role_id') == '5'
                    ? <>
                        <li>
                            <Link to="./students" className="nav-link">
                                <FaUser className="mr-2" size="1.5em" />
                                <span>Students</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={`./grades-table`} className="nav-link">
                                <FaUser className="mr-2" size="1.5em" />
                                <span>Edit Grades</span>
                            </Link>
                        </li>
                    </>
                    : null
                }
                {_.get(props, 'auth.user.role_id') == '6'
                    ? <>
                        <li>
                            <Link to="./teachers" className="nav-link">
                                <FaUser className="mr-2" size="1.5em" />
                                <span>Teachers</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={`./students/${userId}/grades`} className="nav-link">
                                <FaUser className="mr-2" size="1.5em" />
                                <span>Grades</span>
                            </Link>
                        </li>
                    </>
                    : null
                }
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
            </ul>
        </nav >
    );
};


const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(MenuSecondary);
