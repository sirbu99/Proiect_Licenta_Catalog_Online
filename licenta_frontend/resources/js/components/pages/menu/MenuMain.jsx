import React from 'react';
import { Link } from 'react-router-dom';
import UserBox from '../../users/UserBox';

const MenuMain = (props) => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/universities" className="nav-link">Universities</Link>
                        </li>

                    </ul>
                    <UserBox />
                </div>
            </div>
        </nav>
    );
};
export default MenuMain;
