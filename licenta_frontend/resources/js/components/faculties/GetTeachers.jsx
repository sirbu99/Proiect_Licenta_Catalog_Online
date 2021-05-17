import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';

class GetTeachers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
        }
    }
    componentDidMount() {
        this.fetchTeachers();
    }

    

    fetchTeachers() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/teachers`;
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

    handleEdit(id) {
        this.props.history.push(`/universities/${this.props.universityId}/${this.props.facultyId}/teachers/${id}/edit`);
    }

    handleDelete(id) {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/teachers/${id}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.delete(apiUrl, { headers })
                .then(this.fetchTeachers.bind(this));
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const teachers = this.state.teachers;
        const teacherListSize = Object.keys(teachers).length;
        if (teacherListSize < 1) {
            return (
                <h3>
                    There are no teachers to display!
                </h3>
            )
        } else {
            return (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr className="bg-primary">
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Didactic Degree</th>
                                <th scope="col">Email</th>
                                {_.get(this.props, 'auth.user.permissions', []).includes('edit_teacher')
                                    ? <>
                                        <th></th>
                                        <th></th>
                                    </>
                                    : null
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map(teacher => {
                                return (
                                    <tr key={teacher.id}>
                                        <td>{teacher.first_name}</td>
                                        <td>{teacher.last_name}</td>
                                        <td>{teacher.didactic_degree}</td>
                                        <td>{teacher.email}</td>
                                        {_.get(this.props, 'auth.user.permissions', []).includes('edit_teacher')
                                            ? <>
                                                <td role="button" onClick={this.handleEdit.bind(this, teacher.id)}>Edit</td>
                                                <td role="button" onClick={this.handleDelete.bind(this, teacher.id)}>Delete</td>
                                            </>
                                            : null
                                        }

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
export default connect(mapStateToProps)(withRouter(GetTeachers));