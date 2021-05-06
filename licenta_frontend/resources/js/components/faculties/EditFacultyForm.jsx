import React, { Component } from 'react';
import { connect } from 'react-redux';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';
import {getApiHost } from '../../services/commonService';
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
    }

    handleSubmit() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.put(apiUrl, this.state.faculty, { headers });
            this.props.history.push(`/universities/${this.props.universityId}`);
        } catch (error) {
            console.log(error)
        }
    }

render() {
    const renderField = this.renderField.bind(this, 'faculty');

    return (
        <div className="card mt-3">
            <div className="card-body">
                <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                    <h2>Faculty Info</h2>
                    <div className="row">
                        <div className="col-md-10">
                            {renderField('name', 'Faculty Name')}
                            {renderField('address', 'Address')}
                            {renderField('description', 'Description')}
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit.bind(this, 'faculty')}>Save</button>
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
