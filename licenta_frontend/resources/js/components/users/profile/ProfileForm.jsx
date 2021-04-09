import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from'react-dropzone';

import ValidatedComponent from '../../ValidatedComponent';
import ProfileValidation from './validation/ProfileValidation';
import FormComponent from '../../FormComponent';
import { authActions } from '../../../actions/users/authActions';
import { getApiHost } from '../../../services/commonService';

class ProfileForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: _.get(this.props, 'auth.user.id', ''),
                first_name: _.get(this.props, 'auth.user.first_name', ''),
                last_name: _.get(this.props, 'auth.user.last_name', ''),
                username: _.get(this.props, 'auth.user.username', ''),
                image: _.get(this.props, 'auth.user.image'),
                newImage: {
                    fileName: null,
                    data: null,
                },
                about_me: _.get(this.props, 'auth.user.about_me', ''),
                password: '',
                password_confirmation: '',
            },
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const requestOptions = { ...this.state.user };
        const { dispatch } = this.props;

        _.forEach(_.keys(this.validationSchema), (key) => { this.validate(key); });

        this.isValid() && $.ajax(`${getApiHost}/profile/${requestOptions.id}`, {
            method: 'PUT',
            data: requestOptions,
        })
            .done((response) => {
                dispatch(authActions.refresh(response.data));
                this.props.history.push('/manage/profile');
            })
            .fail((xhr) => {
                toastr.error(_.values(xhr.responseJSON.errors).join('<br/>') || 'Generic error');
            });
    }

    renderProfilePicture() {
        const { user } = this.state;

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
                                    src={ user.newImage.data ? user.newImage.data : user.image}
                                />
                            </div>
                        </div>
                    )}
                </Dropzone>
            </div>
        );
    }

    render() {
        const renderField = this.renderField.bind(this, 'user');
        const renderTextEditorField = this.renderTextEditorField.bind(this, 'user');

        return (
            <div className="mt-3">
                <div className="card">
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
                            {renderField('username', 'Username')}

                            {renderTextEditorField('about_me', 'About me')}
                            <h2 className="mt-5">Password</h2>
                            {renderField('password', 'Password', 'password')}
                            {renderField('password_confirmation', 'Password confirmation', 'password')}

                            <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}> Save </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(ValidatedComponent(ProfileValidation(FormComponent(ProfileForm))));
