import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const UserBoxAnonymous = (props) => {
    function handleLoginClick(e) {
        e.preventDefault();
        props.history.push(`/login?r=${window.location.pathname}`);
    }

    return (
        <div className="float-sm-right m-3 m-sm-auto text-sm-left text-center">
            <Link to="/login" onClick={handleLoginClick}>Login</Link>
            <Link to="/register">Register</Link>
        </div>

    );
};

export default withRouter(UserBoxAnonymous);
