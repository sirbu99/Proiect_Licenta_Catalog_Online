import React, { Component } from 'react';

import ValidatedComponent from '../ValidatedComponent';
import RegisterValidation from './validation/RegisterValidation';
import FormComponent from '../FormComponent';
import {messages} from '../../constants/messages'

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            identification_numer: '',
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            role_id: '',
            birthday:'',
            address: '',
            invitation_code:'',
            password: '',
            password_confirmation: '',
        };

    }

    handleRegister(e) {
        e.preventDefault();
        const requestOptions = { ...this.state };

        _.forEach(_.keys(this.validationSchema), (key) => { this.validate(key); });

        this.isValid() && $.post('/api/register', requestOptions)
            .done(() => {
                this.props.history.push("/login");
            })
            .fail((xhr) => {
                toastr.error(_.values(xhr.responseJSON.errors).join('<br/>') || messages.GENERIC_ERROR_NOTIFICATION);
            });
    }

    render() {
        const renderField = this.renderField.bind(this, null);

        return (
            <section className="body-sign">
                <div className="panel card-sign">
                    <div className="card-body">
                        <form
                            onSubmit={this.handleRegister.bind(this)}
                            className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}
                        >
                            {renderField('identification_number', 'Identification Number')}
                            {renderField('first_name', 'First Name')}
                            {renderField('last_name', 'Last Name')}
                            {renderField('email', 'Email', 'email')}
                            {renderField('username', 'Username')}
                            {renderField('role_id', 'Role ID')}
                            {renderField('birthday', 'Birthday')}
                            {renderField('address', 'Address')}
                            {renderField('invitation_code', 'Invitation Code')}
                            {renderField('password', 'Password', 'password')}
                            {renderField('password_confirmation', 'Password Confirmation', 'password')}

                            <div  className="form-group mb-3">
                                <button type="submit" className="btn btn-primary mt-2">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default ValidatedComponent(RegisterValidation(FormComponent(RegisterForm)));