import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import Spinner from '../ui/Spinner';
import axios from 'axios';
import DeleteConfirmation from '../ui/DeleteConfirmation';

class GetSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            schedule_info: [],
            isLoaded: false,
            modalIsOpen: false,
            selectedId: null
        }
    }
    componentDidMount() {
        this.fetchSchedule();
    }

    

    fetchSchedule() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/schedule`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ schedule_info: data, isLoaded: true  }));

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

    openModal(id) {
        this.setState({...this.state, modalIsOpen: true, selectedId: id });
    }

    closeModal() {
        this.setState({...this.state, modalIsOpen: false, selectedId: null });
    }

    render() {
        const schedule_info = this.state.schedule_info;
        const scheduleListSize = Object.keys(schedule_info).length;
        const isLoaded = this.state.isLoaded;
        const newScheduleUrl = `/universities/${this.props.universityId}/${this.props.facultyId}/schedule/new`;
        if (!isLoaded) {
            return <Spinner />
        }

        if (scheduleListSize < 1) {
            return (
                <h3>
                    There is no schedule yet.
                </h3>
            )
        } else {
            return (
                <div className="table-responsive">
                    <button
                        className="btn btn-outline-success float-right"
                        onClick={() => this.props.history.push(newScheduleUrl)}
                    >
                        Add To The Schedule
                    </button>
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr className="bg-primary">
                                <th scope="col">Year</th>
                                <th scope="col">Half Year</th>
                                <th scope="col">Group</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Classroom</th>
                                <th scope="col">Type</th>
                                <th scope="col">Start</th>
                                <th scope="col">Finish</th>
                                <th scope="col">Day</th>
                                {_.get(this.props, 'auth.user.permissions', []).includes('schedule')
                                    ? <>
                                        <th />
                                        <th />
                                    </>
                                    : null
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {schedule_info.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.year}</td>
                                        <td>{item.half_year}</td>
                                        <td>{item.group}</td>
                                        <td>{item.name}</td>
                                        <td>{item.classroom}</td>
                                        <td>{item.type}</td>
                                        <td>{item.start_at}</td>
                                        <td>{item.finish_at}</td>
                                        <td>{item.day}</td>
                                        {_.get(this.props, 'auth.user.permissions', []).includes('schedule')
                                            ? <>
                                                <td role="button" onClick={this.handleEdit.bind(this, item.id)}>Edit</td>
                                                <td role="button" onClick={this.openModal.bind(this, item.id)}>Delete</td>
                                            </>
                                            : null
                                        }
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
                </div>
            );

        }

    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GetSchedule));