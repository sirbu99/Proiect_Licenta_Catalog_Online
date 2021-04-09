import React from 'react';

const UserDisplay = (props) => {
    const avatar = _.get(props, 'user.image');

    return (
        <div className={_.get(props, 'className', '')}>
            <figure className={`profile-picture mr-2 mb-1`}>
                <img src={avatar} alt={_.get(props, 'user.username')} className="rounded-circle" />
            </figure>
            <div className="profile-info">
                <span className="name">{_.get(props, 'user.username', '')}</span>
            </div>
        </div>
    );
};

export default UserDisplay;
