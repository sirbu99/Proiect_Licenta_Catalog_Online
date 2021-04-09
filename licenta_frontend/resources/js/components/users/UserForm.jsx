import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import ValidatedComponent from '../ValidatedComponent';
import UserValidation from './validation/UserValidation';
import FormComponent from '../FormComponent';
import { hasPermission, getApiHost } from '../../services/commonService';

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: '',
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                image: null,
                newImage: {
                    fileName: null,
                    data: null,
                },
                password: '',
                password_confirmation: '',
                roles: [],
            },
            roleOptions: [],
        };
    }

    componentDidMount() {
        this.loadRoles();
        this.loadUser();
    }

    loadUser() {
        const routeUserId = _.get(this.props, 'match.params.userId', null);
        if (!routeUserId) return;

        $.get(`${getApiHost}/users/${routeUserId}`)
            .done((response) => {
                if (!response.success) return;
                const userData = _.assign(this.state.user, response.data);
                userData.roles = _.map(userData.roles, (role) => ({
                    value: role,
                    label: _.capitalize(role),
                }));
                this.setState({
                    user: userData,
                });
            });
    }

    loadRoles() {
        if (!hasPermission('users.roles')) return;

        $.get(`${getApiHost}/roles`)
            .done((response) => {
                if (!response.success) return;
                const roleOptions = _.map(response.data, (role) => ({
                    value: role.slug,
                    label: _.capitalize(role.name),
                }));
                this.setState({ roleOptions });
            });
    }

    handleSubmit() {
        // TODO
    }

    renderProfilePicture() {
        const { user } = this.state;
        const image = _.get(user, 'image');

        return (
            <div className="form-group mb-3">
                <label>Profile picture</label>
                <Dropzone onDrop={this.handleFileUpload.bind(this, 'user.newImage')} multiple={false} accept="image/*">
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="file-upload image">
                            <input {...getInputProps()} />
                            <div className="thumb-info mb-3">
                                <img
                                    className="rounded img-fluid"
                                    alt={user.full_name}
                                    src={ user.newImage.data ? user.newImage.data : image}
                                />
                            </div>
                        </div>
                    )}
                </Dropzone>
            </div>
        );
    }

    renderRolesField() {
        const { user, roleOptions } = this.state;

        if (!hasPermission('users.roles')) return null;

        return (
            <div className="form-group mb-3">
                <label>Roles</label>
                <Select
                    value={user.roles}
                    name="roles"
                    isMulti
                    onChange={this.handleSelectVar.bind(this, 'user')}
                    options={roleOptions}
                />
                {this.renderValidationMessages('roles')}
            </div>
        );
    }

    render() {
        const renderField = this.renderField.bind(this, 'user');

        return (
            <div className="card mt-3">
                <div className="card-body">
                    <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                        <h2>Profile info</h2>
                        <div className="row">
                            <div className="col-md-2">
                                {this.renderProfilePicture()}
                            </div>
                            <div className="col-md-10">
                                {renderField('first_name', 'First name')}
                                {renderField('last_name', 'Last name')}
                            </div>
                        </div>
                        {renderField('email', 'Email', 'email')}
                        {renderField('username', 'Username')}
                        {this.renderRolesField()}

                        <h2 className="mt-5">Password</h2>
                        {renderField('password', 'Password', 'password')}
                        {renderField('password_confirmation', 'Password confirmation', 'password')}
                        <button className="btn btn-primary" onClick={this.handleSubmit.bind(this, 'user')}>Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(ValidatedComponent(UserValidation(FormComponent(UserForm))));
