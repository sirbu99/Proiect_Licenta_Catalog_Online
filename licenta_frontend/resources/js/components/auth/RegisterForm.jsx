import React, { Component } from 'react';

import ValidatedComponent from '../ValidatedComponent';
import RegisterValidation from './validation/RegisterValidation';
import FormComponent from '../FormComponent';
import axios from 'axios';
import { getApiHost } from '../../services/commonService';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invitation_code: this.props.match.params.invitationCode || '',
            password: '',
            password_confirmation: '',
        };

    }

    handleRegister(e) {
        e.preventDefault();
        const requestOptions = { ...this.state };

        _.forEach(_.keys(this.validationSchema), (key) => { this.validate(key); });

        this.isValid() && axios.put(`${getApiHost()}/register`, requestOptions)
            .then(() => {
                this.props.history.push("/universities");
            });
    }

    render() {
        const renderField = this.renderField.bind(this, null);

        return (
            <div className="card mt-3">
                <div className="card-body">
                    <h1 >Registration Form</h1>
                    <hr></hr>
                    <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                        {renderField('invitation_code', 'Invitation Code')}
                        {renderField('password', 'Password', 'password')}
                        {renderField('password_confirmation', 'Password Confirmation', 'password')}

                        <div className="form-group mb-3">
                            <button className="btn btn-primary mt-2" onClick={this.handleRegister.bind(this)}>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ValidatedComponent(RegisterValidation(FormComponent(RegisterForm)));