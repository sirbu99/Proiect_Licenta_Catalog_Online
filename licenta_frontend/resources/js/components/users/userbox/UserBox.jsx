import React from 'react';
import { connect } from 'react-redux';

import UserBoxRegistered from './UserBoxRegistered';
import UserBoxAnonymous from './UserBoxAnonymous';

const UserBox = (props) => {
    return props.auth.loggedIn ? <UserBoxRegistered /> : <UserBoxAnonymous />;
};

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(UserBox);
