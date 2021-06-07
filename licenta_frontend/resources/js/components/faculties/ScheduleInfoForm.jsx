import React, { Component } from 'react';
import { connect } from 'react-redux';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';
import { getApiHost } from '../../services/commonService';
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
                type: '',
            },
            subjects: [],
            teachers: [],
            selectedTeacherId: "",
        };

        this.routeScheduleId = _.get(this.props, 'match.params.scheduleId', null);
        this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
        this.routeUniversityId = _.get(this.props, 'match.params.id', null);
    }
    fetchTeachers() {
        const apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/teachers-list`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ teachers: data }));

        } catch (error) {
            console.error(error);
        };
    }

    fetchSubjects() {
        const apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/subjects-list/${this.state.selectedTeacherId}`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ subjects: data }));

        } catch (error) {
            console.error(error);
        };
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

    handleChangeWhenTeacherClicked(event) {
        this.setState({ selectedTeacherId: event.target.value }, this.fetchSubjects.bind(this));
    }

    handleAddToSchedule(headers) {
        const apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/schedule`;
        return axios.post(apiUrl, { facultyId: this.routeFacultyId, ...this.state.schedule }, { headers });
    }

    handleEditSchedule(headers) {
        const apiUrl = `${getApiHost()}/schedule/${this.routeScheduleId}`;
        return axios.put(apiUrl, this.state.schedule, { headers });
    }

    componentDidMount() {
        this.fetchTeachers();
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
        const subjects = this.state.subjects;
        const teachers = this.state.teachers;
        const options = [];
        const renderField = this.renderField.bind(this, 'schedule');
        const renderSelectField = this.renderSelectField.bind(this, 'schedule');


        const teachersList = (
            <div className="form-group mb-3">
                <label>
                    Select a teacher:
                    <select value={this.state.selectedTeacherId} onChange={this.handleChangeWhenTeacherClicked.bind(this)} className="form-control form-control-md">
                        <option value='0'>None</option>
                        {teachers.map(teacher => {
                            return (
                                <option key={teacher.id} value={teacher.id}>{teacher.first_name + ' ' + teacher.last_name}</option>
                            )

                        })}
                    </select>
                </label>
            </div>
        );

        subjects.forEach(subj => {
            options.push({ value: subj.id, label: subj.name });
        });

        return (
            <div className="card mt-3">
                <div className="card-body">
                    <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                        <h2>Schedule Info</h2>
                        <div className="row">
                            <div className="col-md-10">
                                {renderField('user_id', 'User ID')}
                                {/* {renderSelectField('user_id', 'Teachers', teachersList)} */}
                                {teachersList}
                                {renderSelectField('subject_id', 'Subjects', options)}
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
