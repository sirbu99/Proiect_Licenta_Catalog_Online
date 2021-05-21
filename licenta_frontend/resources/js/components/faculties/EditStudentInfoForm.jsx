import React, { Component } from 'react';
import { connect } from 'react-redux';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';
import {getApiHost } from '../../services/commonService';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class EditStudentInfoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: {
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
    }

    handleSubmit() {
        const apiUrl = `${getApiHost()}/users/students/${this.props.userId}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.put(apiUrl, this.state.student, { headers });
            this.props.history.push(`/universities/${this.props.universityId}/${this.props.facultyId}/students`);
        } catch (error) {
            console.log(error)
        }
    }

render() {
    const renderField = this.renderField.bind(this, 'student');

    return (
        <div className="card mt-3">
            <div className="card-body">
                <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                    <h2>Student Info</h2>
                    <div className="row">
                        <div className="col-md-10">
                            {renderField('first_name', 'Fist Name')}
                            {renderField('last_name', 'Last Name')}
                            {renderField('birthday', 'Birthday','date')}
                            {renderField('address', 'Address')}
                            {renderField('email', 'Email')}
                            {renderField('funding', 'Funding')}
                            {renderField('year', 'Year')}
                            {renderField('half_year', 'Half Year')}
                            {renderField('group', 'Group')}
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit.bind(this, 'student')}>Save</button>
                </form>
            </div>
        </div>
    );
}
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(withRouter(ValidatedComponent(FormComponent(EditStudentInfoForm))));
