import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';

class GetStudents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
        }
    }
    componentDidMount() {
        this.fetchStudents();
    }

    

    fetchStudents() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/students`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ students: data }));

        } catch (error) {
            console.error(error);
        };
    }

    handleEdit(id) {
        this.props.history.push(`/universities/${this.props.universityId}/${this.props.facultyId}/students/${id}/edit`);
    }

    handleDelete(id) {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/students/${id}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.delete(apiUrl, { headers })
                .then(this.fetchStudents.bind(this));
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const students = this.state.students;
        const stdListSize = Object.keys(students).length;
        if (stdListSize < 1) {
            return (
                <h3>
                    There are no students to display!
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
                                <th scope="col">Registration Number</th>
                                <th scope="col">Identification Number</th>
                                <th scope="col">Address</th>
                                <th scope="col">Birthday</th>
                                <th scope="col">Email</th>
                                {_.get(this.props, 'auth.user.permissions', []).includes('edit_student')
                                    ? <>
                                        <th></th>
                                        <th></th>
                                    </>
                                    : null
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => {
                                return (
                                    <tr key={student.id}>
                                        <td>{student.first_name}</td>
                                        <td>{student.last_name}</td>
                                        <td>{student.registration_number}</td>
                                        <td>{student.identification_number}</td>
                                        <td>{student.address}</td>
                                        <td>{student.birthday}</td>
                                        <td>{student.email}</td>
                                        {_.get(this.props, 'auth.user.permissions', []).includes('edit_student')
                                            ? <>
                                                <td role="button" onClick={this.handleEdit.bind(this, student.id)}>Edit</td>
                                                <td role="button" onClick={this.handleDelete.bind(this, student.id)}>Delete</td>
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
export default connect(mapStateToProps)(withRouter(GetStudents));