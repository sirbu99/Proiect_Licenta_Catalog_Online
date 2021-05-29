import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost, formatDate } from '../../services/commonService';
import axios from 'axios';
import Spinner from '../ui/Spinner';
import DeleteConfirmation from '../ui/DeleteConfirmation';

class GetStudents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            isLoaded: false,
            modalIsOpen: false,
            selectedId: null
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
                .then((data) => this.setState({ students: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };
    }

    handleEdit(id) {
        this.props.history.push(`/universities/${this.props.universityId}/${this.props.facultyId}/students/${id}/edit`);
    }

    handleDelete(id) {
        const apiUrl = `${getApiHost()}/users/students/${id}`;
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

    handleViewGrades(id){
        console.log(this.props);
        this.props.history.push(`/universities/${this.props.universityId}/${this.props.facultyId}/students/${id}/grades`);
    }

    openModal(id) {
        this.setState({...this.state, modalIsOpen: true, selectedId: id });
    }

    closeModal() {
        this.setState({...this.state, modalIsOpen: false, selectedId: null });
    }

    render() {
        const students = this.state.students;
        const stdListSize = Object.keys(students).length;
        const isLoaded = this.state.isLoaded;
        const newStudentUrl = `/universities/${this.props.universityId}/${this.props.facultyId}/students/new`;

        if (!isLoaded) {
            return <Spinner />
        }

        if (stdListSize < 1) {
            return (
                <h3>
                    There are no students to display!
                </h3>
            )
        };

        return (
            <div className="table-responsive">
                <button
                    className="btn btn-outline-success float-right"
                    onClick={() => this.props.history.push(newStudentUrl)}
                >
                    Add Student
                </button>
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
                                <th />
                                <th />
                                <th />
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
                                <td>{formatDate(student.birthday)}</td>
                                <td>{student.email}</td>
                                {_.get(this.props, 'auth.user.permissions', []).includes('edit_student')
                                    ? <>
                                        <td role="button" onClick={this.handleViewGrades.bind(this, student.id)}>View Grades</td>
                                        <td role="button" onClick={this.handleEdit.bind(this, student.id)}>Edit</td>
                                        <td role="button" onClick={this.openModal.bind(this, student.id)}>Delete</td>
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

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GetStudents));