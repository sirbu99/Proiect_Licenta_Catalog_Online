import React, { Component } from 'react';
import { connect } from 'react-redux';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';
import { getApiHost, formatDate } from '../../services/commonService';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';


class StudentInfoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: {
                identification_number: '',
                first_name: '',
                last_name: '',
                birthday: '',
                address: '',
                email: '',
                funding: '',
                year: '',
                half_year: '',
                group: '',
            }
        };

        this.routeUserId = _.get(this.props, 'match.params.userId', null);
        this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
        this.routeUniversityId = _.get(this.props, 'match.params.id', null);
    }

    handleSubmit(e) {
        e.preventDefault();
        const headers = {
            'Authorization': this.props.auth.user.api_token
        };
        try {
            const request = this.routeUserId
                ? this.handleEditUser(headers)
                : this.handleCreateUser(headers);
            request.then(() => this.props.history.push(`/universities/${this.routeUniversityId}/${this.routeFacultyId}/students`));
        } catch (error) {
            console.log(error)
        }
    }

    handleCreateUser(headers) {
        const apiUrl = `${getApiHost()}/users/students`;
        return axios.post(apiUrl, { facultyId: this.routeFacultyId, ...this.state.student }, { headers });
    }

    handleEditUser(headers) {
        const apiUrl = `${getApiHost()}/users/students/${this.routeUserId}`;
        return axios.put(apiUrl, this.state.student, { headers });
    }

    componentDidMount() {
        if (!this.routeUserId) {
            return;
        }
        const apiUrl = `${getApiHost()}/users/students/${this.routeUserId}`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    data.birthday = formatDate(data.birthday);
                    this.setState({ student: data, isLoaded: true })
                });

        } catch (error) {
            console.error(error);
        };
    }

    render() {
        const renderField = this.renderField.bind(this, 'student');
        if (!this.props.auth.loggedIn) {
            return (
                <div className="card col-md-6 m-auto">
                    <h5 className="text-center">You must be logged in to see this page</h5>
                    <LoginForm />
                </div>
            )
        }

        return (
            <div className="card mt-3">
                <div className="card-body">
                    <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                        <h2 className="text-center">Student Info</h2>
                        <hr></hr>
                        {renderField('identification_number', 'Identification Number')}
                        {renderField('first_name', 'Fist Name')}
                        {renderField('last_name', 'Last Name')}
                        {renderField('birthday', 'Birthday', 'date')}
                        {renderField('address', 'Address')}
                        {renderField('email', 'Email')}
                        {renderField('funding', 'Funding')}
                        {renderField('year', 'Year')}
                        {renderField('half_year', 'Half Year')}
                        {renderField('group', 'Group')}
                        <div className="form-group mb-3">
                            <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(withRouter(ValidatedComponent(FormComponent(StudentInfoForm))));
