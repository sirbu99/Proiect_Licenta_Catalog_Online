import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';

class EditUniversityForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            university: {
                name: '',
                city: '',
                country: '',
            },
        };
    }

    handleSubmit() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.put(apiUrl, this.state.university, { headers })
                .then(() => this.props.history.push(`/universities`));
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        const renderField = this.renderField.bind(this, 'university');

        return (
            <div className="card mt-3">
                <div className="card-body">
                    <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                        <h2>University Info</h2>
                        <div className="row">
                            <div className="col-md-10">
                                {renderField('name', 'University Name', 'university.name')}
                                {renderField('city', 'City')}
                                {renderField('country', 'Country')}
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={this.handleSubmit.bind(this, 'university')}>Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(withRouter(ValidatedComponent(FormComponent(EditUniversityForm))));
