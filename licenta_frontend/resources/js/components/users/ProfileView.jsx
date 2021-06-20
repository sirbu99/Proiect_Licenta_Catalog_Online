import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../ui/Spinner';
import ValidatedComponent from '../ValidatedComponent';
import PasswordValidation from './validation/PasswordValidation';
import FormComponent from '../FormComponent';
import { getApiHost, formatDate } from '../../services/commonService';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';


class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: [],
            isLoaded: false,
            viewForm: false,
            passInfo: {
                password: '',
                password_confirmation: '',
            },
        }

    };


    componentDidMount() {
        this.fetchUserInfo();
    }


    handleChangePass(e) {
        e.preventDefault();
        const apiUrl = `${getApiHost()}/users/${this.props.auth.user.id}/change-password`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        _.forEach(_.keys(this.validationSchema), (key) => { this.validate(key); });
        try {
            this.isValid() && axios.put(apiUrl, this.state.passInfo, { headers })
                .then(() => {
                    toastr.success('Password changed!', 'Success');
                    this.displayChangePassForm();
                });
        } catch (error) {
            console.log(error)
        }
    }

    displayChangePassForm() {
        this.setState({ ...this.state, viewForm: !this.state.viewForm });
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
        const isLoaded = this.state.isLoaded;
        const renderField = this.renderField.bind(this, 'passInfo');
        const changePass = (
            this.state.viewForm
                ? <>
                    <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'} >
                        <h2 className="mt-5">Password</h2>
                        {renderField('password', 'Password', 'password')}
                        {renderField('password_confirmation', 'Password confirmation', 'password')}

                        <button className="btn btn-primary" onClick={this.handleChangePass.bind(this)}> Save </button>
                    </form >
                </>
                : null
        );
        if (!isLoaded) {
            return <Spinner />
        }

        return (
            <>
                <div className="card" >
                    <div className="card-header">
                        <h2 className="card-title">Profile Info</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-9 col-lg-12">
                                <div className="mb-3">
                                    <div className="font-weight-bold p-2 bg-light">Full name</div>
                                    <div>{userInfo.first_name + ' ' + userInfo.last_name}</div>
                                </div>
                                <div className="mb-3">
                                    <div className="font-weight-bold p-2 bg-light ">Email</div>
                                    <div>{userInfo.email}</div>
                                </div>
                                <div className="mb-3">
                                    <div className="font-weight-bold p-2 bg-light ">Birthday</div>
                                    <div>{formatDate(userInfo.birthday)}</div>
                                </div>
                                <div className="mb-3">
                                    <div className="font-weight-bold p-2 bg-light ">Address</div>
                                    <div>{userInfo.address}</div>
                                </div>
                                {_.get(this.props, 'auth.user.role_id') == '6'
                                    ? <>
                                        <div className="mb-3 ">
                                            <div className="font-weight-bold p-2 bg-light">Registration Number</div>
                                            <div>{userInfo.registration_number}</div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="font-weight-bold p-2 bg-light">Year</div>
                                            <div>{userInfo.year}</div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="font-weight-bold p-2 bg-light">Group</div>
                                            <div>{userInfo.half_year + userInfo.group}</div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="font-weight-bold p-2 bg-light">Funding</div>
                                            <div>{userInfo.funding}</div>
                                        </div>
                                    </>
                                    :
                                    null
                                }
                                {_.get(this.props, 'auth.user.role_id') == '5'
                                    ? <>
                                        <div className="mb-3">
                                            <div className="font-weight-bold p-2 bg-light">Didactic Degree</div>
                                            <div>{userInfo.didactic_degree}</div>
                                        </div>
                                    </>
                                    :
                                    null
                                }
                                <hr></hr>
                                <div className="mb-3">
                                    <button type="button" className="btn btn-primary" onClick={this.displayChangePassForm.bind(this)}>Change Password</button>
                                    {changePass}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        );
    }

};

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(withRouter(ValidatedComponent(PasswordValidation(FormComponent(ProfileView)))));
