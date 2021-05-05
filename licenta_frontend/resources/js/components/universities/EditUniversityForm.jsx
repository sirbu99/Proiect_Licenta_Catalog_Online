import React, { Component } from 'react';
import { connect } from 'react-redux';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';
import { hasPermission, getApiHost } from '../../services/commonService';

class EditUniversityForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                city: '',
                country: '',
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

        $.get(`${getApiHost()}/users/${routeUserId}`)
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
        // de trimis in header api__token
    }

render() {
    const renderField = this.renderField.bind(this, 'user');

    return (
        <div className="card mt-3">
            <div className="card-body">
                <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                    <h2>University Info</h2>
                    <div className="row">
                        <div className="col-md-10">
                            {renderField('name', 'University Name')}
                            {renderField('city', 'City')}
                            {renderField('country', 'Country')}
                        </div>
                    </div>
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

export default connect(mapStateToProps)(ValidatedComponent(FormComponent(EditUniversityForm)));
