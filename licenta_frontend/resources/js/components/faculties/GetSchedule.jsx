import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';

class GetSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            schedule_info: [],
        }
    }
    componentDidMount() {
        this.fetchStudents();
    }

    

    fetchStudents() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/schedule`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ schedule_info: data }));

        } catch (error) {
            console.error(error);
        };
    }

    render() {
        const schedule_info = this.state.schedule_info;
        const scheduleListSize = Object.keys(schedule_info).length;
        if (scheduleListSize < 1) {
            return (
                <h3>
                    There is no schedule yet.
                </h3>
            )
        } else {
            return (
                <div className="table-responsive">
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
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );

        }

    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GetSchedule));