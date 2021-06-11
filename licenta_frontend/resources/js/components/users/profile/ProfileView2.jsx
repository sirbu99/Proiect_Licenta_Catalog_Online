import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../../ui/Spinner';
import { getApiHost } from '../../../services/commonService';
import { withRouter } from 'react-router-dom';

class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: [],
            isLoaded: false,
        }
    };


    componentDidMount() {
        this.fetchUserInfo();
    }

    fetchUserInfo() {
        const apiUrl = `${getApiHost()}/users/${this.props.auth.user.id}/profile-info`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user && this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ ...this.state, userInfo: data[0], isLoaded: true }));

        } catch (error) {
            console.log(error)
        };
    }
    render() {
        const userInfo = this.state.userInfo;
        console.log(userInfo);
        const isLoaded = this.state.isLoaded;

        if (!isLoaded) {
            return <Spinner />
        }

        return (
            <div className="card" >
                <div className="card-header">
                    <h2 className="card-title">Profile info</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        {/* <div className="col-md-3">
                            <div className="thumb-info mb-3">
                                <img
                                    className="rounded img-fluid"
                                    alt={userInfo.first_name + ' ' + userInfo.last_name}
                                    src={image}
                                />
                            </div>
                        </div> */}
                        <div className="col-md-9">
                            <div className="mb-3">
                                <div className="font-weight-bold">Full name</div>
                                <div>{userInfo.first_name + ' ' + userInfo.last_name}</div>
                            </div>
                            <div className="mb-3">
                                <div className="font-weight-bold">Email</div>
                                <div>{userInfo.email}</div>
                            </div>
                            {/* <div className="mb-3">
                                <div className="font-weight-bold">About me</div>
                                <div dangerouslySetInnerHTML={{ __html: about_me }} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(withRouter(ProfileView));
