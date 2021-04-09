import React from 'react';
import { connect } from 'react-redux';

import { authActions } from '../../actions/users/authActions';
import LoginValidation from './validation/LoginValidation';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleLogin(e) {
        e.preventDefault();
        const { dispatch } = this.props;

        _.forEach(_.keys(this.validationSchema), (key) => { this.validate(key); });
        this.isValid() && dispatch(authActions.login(this.state));
    }

    render() {
        const { email, password } = this.state;

        return (
            <section className="body-sign">
                <div className="panel card-sign">
                    <div className="card-body">
                        <form
                            onSubmit={this.handleLogin.bind(this)}
                            className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}
                        >
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input
                                    value={email}
                                    onChange={this.handleChange.bind(this)}
                                    tabIndex="0"
                                    autoFocus
                                    name="email"
                                    type="text"
                                    className="form-control form-control-lg"
                                />
                                {this.renderValidationMessages('email')}
                            </div>

                            <div className="form-group mb-3">
                                <div className="clearfix">
                                    <label className="float-left">Password</label>
                                </div>
                                <input
                                    value={password}
                                    onChange={this.handleChange.bind(this)}
                                    tabIndex="0"
                                    name="password"
                                    type="password"
                                    className="form-control form-control-lg"
                                />
                                {this.renderValidationMessages('password')}
                            </div>

                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <button type="submit" className="btn btn-primary">
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(ValidatedComponent(LoginValidation(FormComponent(LoginForm))));
