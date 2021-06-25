import React, { Component } from 'react';
import { connect } from 'react-redux';
import ValidatedComponent from '../ValidatedComponent';
import FormComponent from '../FormComponent';
import { getApiHost, formatDate } from '../../services/commonService';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';


class AnouncementsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            announcement: {
                name: '',
                text: '',
                due_date: '',
            }
        };

        this.routeAnnouncementId = _.get(this.props, 'match.params.announcementId', null);
        this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
        this.routeUniversityId = _.get(this.props, 'match.params.id', null);
    }

    handleSubmit(e) {
        e.preventDefault();
        const headers = {
            'Authorization': this.props.auth.user.api_token
        };
        try {
            const request = this.routeAnnouncementId
                ? this.handleEditAnnouncement(headers)
                : this.handleCreateAnnouncement(headers);
            request.then(() => this.props.history.push(`/universities/${this.routeUniversityId}/${this.routeFacultyId}/announcements`));
        } catch (error) {
            console.log(error)
        }
    }

    handleCreateAnnouncement(headers) {
        const apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/announcements`;
        return axios.post(apiUrl, { facultyId: this.routeFacultyId, ...this.state.announcement }, { headers });
    }

    handleEditAnnouncement(headers) {
        const apiUrl = `${getApiHost()}/announcements/${this.routeAnnouncementId}`;
        return axios.put(apiUrl, this.state.announcement, { headers });
    }

    componentDidMount() {
        if (!this.routeAnnouncementId) {
            return;
        }
        const apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/announcements/${this.routeAnnouncementId}`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    data.due_date = formatDate(data.due_date);
                    this.setState({ announcement: data, isLoaded: true })
                });

        } catch (error) {
            console.error(error);
        };
    }

    render() {
        const renderField = this.renderField.bind(this, 'announcement');

        if (!this.props.auth.loggedIn) {
            return (
                <div className="card col-md-6 m-auto">
                    <h5 className="text-center">You must be logged in to see this page</h5>
                    <LoginForm />
                </div>
            )
        }
        return (
            this.props.auth.loggedIn ?
                <div className="card mt-3">
                    <div className="card-body">
                        <form className={this.isValid() && this.isDirty() ? 'was-validated' : 'needs-validation'}>
                            <h2 className="text-center">Announcement Info</h2>
                            <hr></hr>

                            {renderField('name', 'Title')}
                            {renderField('text', 'Message')}
                            {renderField('due_date', 'Due Date', 'date')}
                            <div className="form-group mb-3">
                                <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Save</button>
                            </div>
                        </form>
                    </div>
                </div> :
                <div className="card col-md-6 m-auto">
                    <h5 className="text-center">You must be logged in to see this page</h5>
                    <LoginForm />
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(withRouter(ValidatedComponent(FormComponent(AnouncementsForm))));
