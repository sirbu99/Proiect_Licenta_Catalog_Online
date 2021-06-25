import React, { Component } from 'react';
import { connect } from 'react-redux';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class EditFacultyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            faculty: {
                name: '',
                address: '',
                description: '',
            }
        };
        this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
        this.routeUniversityId = _.get(this.props, 'match.params.id', null);
    }

    handleSubmit(e) {
        e.preventDefault();
        const apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.put(apiUrl, this.state.faculty, { headers })
                .then(() => this.props.history.push(`/universities/${this.routeUniversityId}`));
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        if (!this.routeFacultyId) {
            return;
        }
        const apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ faculty: data, isLoaded: true })
                });

        } catch (error) {
            console.error(error);
        };
    }

    render() {
        const renderField = this.renderField.bind(this, 'faculty');

        return (
            <div className="card mt-3">
                <div className="card-body">
                    <h2 className="text-center">Faculty Info</h2>
                    <hr></hr>
                    <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                        {renderField('name', 'Faculty Name')}
                        {renderField('address', 'Address')}
                        {renderField('description', 'Description')}
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

export default connect(mapStateToProps)(withRouter(ValidatedComponent(FormComponent(EditFacultyForm))));
