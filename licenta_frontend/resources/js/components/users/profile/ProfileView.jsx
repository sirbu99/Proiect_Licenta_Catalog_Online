import React from 'react';
import { connect } from 'react-redux';

const ProfileView = (props) => {
    const user = _.get(props, 'auth.user', {});
    const fullName = _.get(user, 'full_name', '-');
    const email = _.get(user, 'email', '-');
    const username = _.get(user, 'username', '-');
    const roles = _.defaultTo(
        _.map(_.get(user, 'roles', []), (item) => _.capitalize(item)).join(', '),
        '-'
    );
    const about_me = _.get(user, 'about_me', '-');
    const image = _.get(user, 'image');

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Profile info</h2>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-3">
                        <div className="thumb-info mb-3">
                            <img
                                className="rounded img-fluid"
                                alt={fullName}
                                src={image}
                            />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="mb-3">
                            <div className="font-weight-bold">Full name</div>
                            <div>{fullName}</div>
                        </div>
                        <div className="mb-3">
                            <div className="font-weight-bold">Email</div>
                            <div>{email}</div>
                        </div>
                        <div className="mb-3">
                            <div className="font-weight-bold">Username</div>
                            <div>{username}</div>
                        </div>
                        <div className="mb-3">
                            <div className="font-weight-bold">Roles</div>
                            <div>{roles}</div>
                        </div>
                        <div className="mb-3">
                            <div className="font-weight-bold">About me</div>
                            <div dangerouslySetInnerHTML={{__html: about_me}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(ProfileView);
