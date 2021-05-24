import React, { Component } from 'react';
import { connect } from 'react-redux';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';
import {getApiHost } from '../../services/commonService';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class ScheduleInfoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            schedule: {
                user_id: '',
                subject_id: '',
                year: '',
                half_year: '',
                group: '',
                classroom: '',
                start_at: '',
                finish_at: '',
                day: '',
                type:'',
            }
        };

        this.routeScheduleId = _.get(this.props, 'match.params.scheduleId', null);
        this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
        this.routeUniversityId = _.get(this.props, 'match.params.id', null);
    }

    handleSubmit(e) {
        e.preventDefault();
        const headers = {
            'Authorization': this.props.auth.user.api_token
        };
        try {
            const request = this.routeScheduleId
                ? this.handleEditSchedule(headers)
                : this.handleAddToSchedule(headers);
            request.then(() => this.props.history.push(`/universities/${this.routeUniversityId}/${this.routeFacultyId}/schedule`));
        } catch (error) {
            console.log(error)
        }
    }

    handleAddToSchedule(headers) {
        const apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/schedule`;
        return axios.post(apiUrl, {facultyId: this.routeFacultyId, ...this.state.schedule}, { headers });
    }

    handleEditSchedule(headers) {
        const apiUrl = `${getApiHost()}/schedule/${this.routeScheduleId}`;
        return axios.put(apiUrl, this.state.schedule, { headers });
    }

    componentDidMount() {
        if (!this.routeScheduleId) {
            return;
        }
        const apiUrl = `${getApiHost()}/schedule/${this.routeScheduleId}`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ schedule: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };
    }

render() {
    const renderField = this.renderField.bind(this, 'schedule');

    return (
        <div className="card mt-3">
            <div className="card-body">
                <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                    <h2>Schedule Info</h2>
                    <div className="row">
                        <div className="col-md-10">
                            {renderField('user_id', 'User ID')}
                            {renderField('subject_id', 'Subject ID')}
                            {renderField('year', 'Year')}
                            {renderField('half_year', 'Half Year')}
                            {renderField('group', 'Group')}
                            {renderField('classroom', 'Classroom')}
                            {renderField('start_at', 'Start At', 'time')}
                            {renderField('finish_at', 'Finish At', 'time')}
                            {renderField('day', 'Day')}
                            {renderField('type', 'Type')}
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Save</button>
                </form>
            </div>
        </div>
    );
}
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(withRouter(ValidatedComponent(FormComponent(ScheduleInfoForm))));
