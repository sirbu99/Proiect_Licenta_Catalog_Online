import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';
import DeleteConfirmation from '../ui/DeleteConfirmation';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import Spinner from '../ui/Spinner';

class GetTeachers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            isLoaded: false,
            modalIsOpen: false,
            selectedId: null
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
                .then((data) => this.setState({ teachers: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };
    }

    openModal(id) {
        this.setState({ ...this.state, modalIsOpen: true, selectedId: id });
    }

    closeModal() {
        this.setState({ ...this.state, modalIsOpen: false, selectedId: null });
    }


    handleEdit(id) {
        this.props.history.push(`/universities/${this.props.universityId}/${this.props.facultyId}/teachers/${id}/edit`);
    }

    handleShowButtons(id) {
        return _.get(this.props, 'auth.user.permissions', []).includes('teacher')
            ? <>
                <td className="edit-button" role="button" onClick={this.handleEdit.bind(this, id)}><FaEdit /></td>
                <td className="delete-button" role="button" onClick={this.openModal.bind(this, id)}><FaWindowClose /></td>
            </>
            : null
    }
    handleDelete(id) {
        const apiUrl = `${getApiHost()}/users/teachers/${id}`;
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
        const isLoaded = this.state.isLoaded;
        const newTeacherUrl = `/universities/${this.props.universityId}/${this.props.facultyId}/teachers/new`;
        if (!isLoaded) {
            return <Spinner />
        }

        if (teacherListSize < 1) {
            return (
                <h3>
                    There are no teachers to display!
                </h3>
            )
        } else {
            return (
                <div className="table-responsive">
                    <div className="d-flex justify-content-between mb-3">
                        <h1>Teachers List</h1>
                        {_.get(this.props, 'auth.user.permissions', []).includes('teacher') ?
                            <button
                                className="btn add-button float-right"
                                onClick={() => this.props.history.push(newTeacherUrl)}
                            >
                                Add Teacher
                            </button>
                            : null
                        }
                    </div>
                    <hr></hr>
                    <table className="table table-borderless align-middle">
                        <thead className="thead-dark text-white align-middle">
                            <tr className="bg-primary" >
                                <th scope="col" className="border-1">First Name</th>
                                <th scope="col" className="border-1">Last Name</th>
                                <th scope="col" className="border-1">Didactic Degree</th>
                                <th scope="col" className="border-1">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map(teacher => {
                                return (
                                    <tr key={teacher.id}>
                                        <td className="border-1">{teacher.first_name}</td>
                                        <td className="border-1">{teacher.last_name}</td>
                                        <td className="border-1">{teacher.didactic_degree}</td>
                                        <td className="border-1">{teacher.email}</td>
                                        {this.handleShowButtons(teacher.id)}
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
export default connect(mapStateToProps)(withRouter(GetTeachers));