import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import Spinner from '../ui/Spinner';
import axios from 'axios';
import DeleteConfirmation from '../ui/DeleteConfirmation';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import Filter from '../ui/Filter'

class GetSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            schedule_info: [],
            yearInfo: [],
            isLoaded: false,
            modalIsOpen: false,
            selectedId: null,
            subjects: [],
            selectedSubjectId: '',
            selectedYear: '',
            selectedGroup: '',
        }
    }
    componentDidMount() {
        this.fetchSchedule();
        this.fetchSubjects();
        this.fetchGroups();
    }

    fetchSchedule(event) {
        event && event.preventDefault();
        let apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/schedule/list?type=display`;
        if (this.state.selectedSubjectId) {
            apiUrl += `&subjectId=${this.state.selectedSubjectId}`;
        }
        if (this.state.selectedYear) {
            apiUrl += `&year=${this.state.selectedYear}`;
        }
        if (this.state.selectedHalfYear) {
            apiUrl += `&halfYear=${this.state.selectedHalfYear}`;
        }
        if (this.state.selectedGroup) {
            apiUrl += `&group=${this.state.selectedGroup}`;
        }
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ schedule_info: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };
    }

    fetchSubjects() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/schedule/subjects`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ subjects: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };
    }

    fetchGroups() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}S/groups`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ yearInfo: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };
    }

    handleEdit(id) {
        this.props.history.push(`/universities/${this.props.universityId}/${this.props.facultyId}/schedule/${id}/edit`);
    }

    handleDelete(id) {
        const apiUrl = `${getApiHost()}/schedule/${id}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.delete(apiUrl, { headers })
                .then(this.fetchSchedule.bind(this));
        } catch (error) {
            console.log(error)
        }
    }

    handleShowButtons(id) {
        return _.get(this.props, 'auth.user.permissions', []).includes('schedule')
            ? <>
                <td className="edit-button" role="button" onClick={this.handleEdit.bind(this, id)}><FaEdit /></td>
                <td className="delete-button" role="button" onClick={this.openModal.bind(this, id)}><FaWindowClose /></td>
            </>
            : null
    }

    openModal(id) {
        this.setState({ ...this.state, modalIsOpen: true, selectedId: id });
    }

    closeModal() {
        this.setState({ ...this.state, modalIsOpen: false, selectedId: null });
    }

    handleChangeSubject(event) {
        event.preventDefault();
        this.setState({
            selectedSubjectId: event.target.value,
            selectedYear: '',
        });
    }

    handleChangeYear(event) {
        event.preventDefault();
        this.setState({
            selectedYear: event.target.value,
            selectedSubjectId: ''
        });
    }

    handleChangeGroup(event) {
        event.preventDefault();
        this.setState({ selectedGroup: event.target.value });
    }

    handleChangeHalfYear(event) {
        event.preventDefault();
        this.setState({ selectedHalfYear: event.target.value });
    }

    render() {
        const schedule_info = this.state.schedule_info;
        const scheduleListSize = Object.keys(schedule_info).length;
        const isLoaded = this.state.isLoaded;
        const yearsList = {};
        const groupsList = {};
        const halfYearsList = {};
        const newScheduleUrl = `/universities/${this.props.universityId}/${this.props.facultyId}/schedule/new`;

        this.state.yearInfo.forEach(item => {
            yearsList[item.year] = { name: item.year, id: item.year };
            groupsList[item.group] = { name: item.group, id: item.group };
            halfYearsList[item.half_year] = { name: item.half_year, id: item.half_year };

        });
        const filter = (
            <>
                <Filter
                    clickHandler={this.handleChangeSubject.bind(this)}
                    name="Subject"
                    list={this.state.subjects}
                    selectedId={this.state.selectedSubjectId}
                />
                <Filter
                    clickHandler={this.handleChangeYear.bind(this)}
                    name="Year"
                    list={Object.values(yearsList)}
                    selectedId={this.state.selectedYear}
                />
                <Filter
                    clickHandler={this.handleChangeHalfYear.bind(this)}
                    name="Half-year"
                    list={Object.values(halfYearsList)}
                    selectedId={this.state.selectedHalfYear}
                />
                <Filter
                    clickHandler={this.handleChangeGroup.bind(this)}
                    name="Group"
                    list={Object.values(groupsList)}
                    selectedId={this.state.selectedGroup}
                />
                <button onClick={this.fetchSchedule.bind(this)} className="btn btn-primary mx-2" >Apply</button>
            </>
        )

        if (!isLoaded) {
            return <Spinner />
        }

        if (scheduleListSize < 1) {
            return (
                <>
                    {_.get(this.props, 'auth.user.role_id') == '1' ?
                        <div className="d-flex justify-content-between align-items-center">
                            {filter}
                        </div>
                        : null
                    }
                    <hr></hr>
                    <h3>
                        There is no schedule yet.
                    </h3>
                </>
            )
        } else {
            return (
                <>
                    <div className="table-responsive">
                        <div className="d-flex justify-content-between mb-3">
                            <h1>Schedule</h1>
                            {_.get(this.props, 'auth.user.permissions', []).includes('schedule') ?
                                <button
                                    className="btn add-button float-right"
                                    onClick={() => this.props.history.push(newScheduleUrl)}
                                >
                                    Add To The Schedule
                                </button>
                                : null
                            }
                        </div>
                        {_.get(this.props, 'auth.user.role_id') == '1' ?
                            <>
                                <hr></hr>
                                <div className="d-flex justify-content-between align-items-center">
                                    {filter}
                                </div>
                            </>
                            : null
                        }
                        <hr></hr>
                        <table className="table table-borderless align-middle">
                            <thead className="thead-dark align-middle">
                                <tr className="bg-primary text-white">
                                    {_.get(this.props, 'auth.user.role_id') != '6' ?
                                        <>
                                            <th scope="col" className="border-1">Year</th>
                                            <th scope="col" className="border-1">Group</th>
                                        </>
                                        : null
                                    }
                                    <th scope="col" className="border-1">Subject</th>
                                    <th scope="col" className="border-1">Classroom</th>
                                    <th scope="col" className="border-1">Type</th>
                                    <th scope="col" className="border-1">Start</th>
                                    <th scope="col" className="border-1">Finish</th>
                                    <th scope="col" className="border-1">Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule_info.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            {_.get(this.props, 'auth.user.role_id') != '6' ?
                                                <>
                                                    <td className="border-1">{item.year}</td>
                                                    <td className="border-1">{item.half_year}{item.group}</td>
                                                </>
                                                : null
                                            }
                                            <td className="border-1">{item.name}</td>
                                            <td className="border-1">{item.classroom}</td>
                                            <td className="border-1">{item.type}</td>
                                            <td className="border-1">{item.start_at}</td>
                                            <td className="border-1">{item.finish_at}</td>
                                            <td className="border-1">{item.day}</td>
                                            {this.handleShowButtons(item.id)}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <DeleteConfirmation
                            modalIsOpen={this.state.modalIsOpen}
                            closeModal={this.closeModal.bind(this)}
                            handleDelete={this.handleDelete.bind(this, this.state.selectedId)}
                        />
                    </div >
                </>
            );

        }

    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GetSchedule));