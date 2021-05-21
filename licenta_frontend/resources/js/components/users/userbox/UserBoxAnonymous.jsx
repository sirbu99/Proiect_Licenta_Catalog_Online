import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const UserBoxAnonymous = (props) => {
    function handleLoginClick(e) {
        e.preventDefault();
        props.history.push(`/login?r=${window.location.pathname}`);
    }

    return (
        <div className="user-box">
            <Link to="/login" onClick={handleLoginClick}>Login</Link>
            <Link to="/register">Register</Link>
        </div>

    );
};

export default withRouter(UserBoxAnonymous);
