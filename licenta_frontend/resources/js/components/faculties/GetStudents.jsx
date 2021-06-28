import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost, formatDate } from '../../services/commonService';
import axios from 'axios';
import Spinner from '../ui/Spinner';
import DeleteConfirmation from '../ui/DeleteConfirmation';
import { FaEdit, FaWindowClose, FaChalkboardTeacher } from 'react-icons/fa';

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

    handleViewGrades(sudentId) {
        this.props.history.push(`/universities/${this.props.universityId}/${this.props.facultyId}/students/${sudentId}/grades`);
    }

    handleShowButtons(id) {
        return _.get(this.props, 'auth.user.permissions', []).includes('edit_student')
            ? <>
                <td className="edit-button" crole="button" onClick={this.handleViewGrades.bind(this, id)}><FaChalkboardTeacher /></td>
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
                <>
                    <h1>Students List</h1>
                    <hr></hr>
                    <h3>
                        There are no students to display!
                    </h3>
                </>
            )
        };

        return (
            <div className="table-responsive">
                <div className="d-flex justify-content-between mb-3">
                    <h1>Students List</h1>
                    {_.get(this.props, 'auth.user.permissions', []).includes('edit_student') ?
                        <button
                            className="btn add-button float-right"
                            onClick={() => this.props.history.push(newStudentUrl)}
                        >
                            Add Student
                        </button>
                        : null
                    }
                </div>
                <hr></hr>
                <table className="table table-borderless table-sm align-middle">
                    <thead className="thead-dark align-middle">
                        <tr className="bg-primary text-white">
                            <th scope="col" className="border-1">First Name</th>
                            <th scope="col" className="border-1">Last Name</th>
                            <th scope="col" className="border-1">Registration Number</th>
                            <th scope="col" className="border-1">Year</th>
                            <th scope="col" className="border-1">Group</th>
                            {_.get(this.props, 'auth.user.role_id') == '1'
                                ?
                                <>
                                    <th scope="col" className="border-1">Identification Number</th>
                                    <th scope="col" className="border-1">Address</th>
                                    <th scope="col" className="border-1 px-3">Birthday</th>
                                </>
                                : null
                            }

                            <th scope="col" className="border-1">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => {
                            return (
                                <tr key={student.id}>
                                    <td className="border-1">{student.first_name}</td>
                                    <td className="border-1">{student.last_name}</td>
                                    <td className="border-1">{student.registration_number}</td>
                                    <td className="border-1">{student.year}</td>
                                    <td className="border-1">{student.half_year}{student.group}</td>
                                    {_.get(this.props, 'auth.user.role_id') == '1'
                                        ?
                                        <>
                                            <td className="border-1">{student.identification_number}</td>
                                            <td className="border-1">{student.address}</td>
                                            <td className="border-1">{formatDate(student.birthday)}</td>
                                        </>
                                        : null
                                    }
                                    <td className="border-1">{student.email}</td>
                                    {this.handleShowButtons(student.id)}
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
        );

    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GetStudents));