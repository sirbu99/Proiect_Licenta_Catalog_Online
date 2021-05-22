import React, { Component } from 'react';
import { connect } from 'react-redux';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';
import {getApiHost } from '../../services/commonService';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class TeacherInfoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacher: {
                identification_number: '',
                first_name: '',
                last_name: '',
                birthday: '',
                address: '',
                email: '',
                didactic_degree: '',
            }
        };
        this.routeUserId = _.get(this.props, 'match.params.userId', null);
        this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
        this.routeUniversityId = _.get(this.props, 'match.params.id', null);
    }

    handleSubmit(e) {
        e.preventDefault();
        // const apiUrl = `${getApiHost()}/users/teachers/${this.routeUserId}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            const request = this.routeUserId
                ? this.handleEditUser(headers)
                : this.handleCreateUser(headers);
            request.then(() => this.props.history.push(`/universities/${this.routeUniversityId}/${this.routeFacultyId}/teachers`));
        } catch (error) {
            console.log(error)
        }
        // try {
        //     axios.put(apiUrl, this.state.teacher, { headers })
        //     .then(() => this.props.history.push(`/universities/${this.routeUniversityId}/${this.routeFacultyId}/teachers`));
        // } catch (error) {
        //     console.log(error)
        // }
    }

    handleCreateUser(headers) {
        const apiUrl = `${getApiHost()}/users/teachers`;
        return axios.post(apiUrl, {facultyId: this.routeFacultyId, ...this.state.teacher}, { headers });
    }

    handleEditUser(headers) {
        const apiUrl = `${getApiHost()}/users/teachers/${this.routeUserId}`;
        return axios.put(apiUrl, this.state.teacher, { headers });
    }
    componentDidMount() {
        if (!this.routeUserId) {
            return;
        }
        const apiUrl = `${getApiHost()}/users/teachers/${this.routeUserId}`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ teacher: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };
    }

render() {
    const renderField = this.renderField.bind(this, 'teacher');

    return (
        <div className="card mt-3">
            <div className="card-body">
                <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                    <h2>Teacher Info</h2>
                    <div className="row">
                        <div className="col-md-10">
                            {renderField('identification_number', 'Identification Number')}
                            {renderField('first_name', 'Fist Name')}
                            {renderField('last_name', 'Last Name')}
                            {renderField('birthday', 'Birthday','date')}
                            {renderField('address', 'Address')}
                            {renderField('email', 'Email')}
                            {renderField('didactic_degree', 'Didactic Degree')}

                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Save</button>
                </form>
            </div>
        </div>
    );
}
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(withRouter(ValidatedComponent(FormComponent(TeacherInfoForm))));
