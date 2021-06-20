import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost, formatDate } from '../../services/commonService';
import Spinner from '../ui/Spinner';
import axios from 'axios';
import DeleteConfirmation from '../ui/DeleteConfirmation';
import Filter from '../ui/Filter';

class GetStudentGrades extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grades: [],
            subjects: [],
            selectedSubjectId: null,
            isLoaded: false,
            modalIsOpen: false,
            selectedId: null
        }

        this.routeUserId = _.get(this.props, 'match.params.userId', null);
        this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
        this.routeUniversityId = _.get(this.props, 'match.params.id', null);
    }

    componentDidMount() {
        this.fetchGrades();
        this.fetchSubjects();
    }


    fetchSubjects() {
        const apiUrl = `${getApiHost()}/users/students/${this.routeUserId}/subjects`;
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
    fetchGrades(event) {
        event && event.preventDefault();
        let apiUrl = `${getApiHost()}/users/students/${this.routeUserId}/grades`;
        if (this.state.selectedSubjectId) {
            apiUrl += `?subjectId=${this.state.selectedSubjectId}`;
        }
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ grades: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };
    }

    handleEdit(id) {
        this.props.history.push(`/universities/${this.props.universityId}/${this.props.facultyId}/students/${this.props.userId}/grades/${id}/edit`);
    }

    handleChange(event) {
        this.setState({ selectedSubjectId: event.target.value });
    }

    handleDelete(id) {
        const apiUrl = `${getApiHost()}/grades/${id}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.delete(apiUrl, { headers })
                .then(this.fetchGrades.bind(this));
        } catch (error) {
            console.log(error)
        }
    }

    openModal(id) {
        this.setState({ ...this.state, modalIsOpen: true, selectedId: id });
    }

    closeModal() {
        this.setState({ ...this.state, modalIsOpen: false, selectedId: null });
    }

    render() {
        const grades = this.state.grades;
        const subjects = this.state.subjects;
        const gradesLstSize = Object.keys(grades).length;
        const isLoaded = this.state.isLoaded;
        if (!isLoaded) {
            return <Spinner />
        }
        const filter = (
            <Filter
                clickHandler={this.handleChange.bind(this)}
                name="subjects"
                fetchInfo={this.fetchGrades.bind(this)}
                list={subjects}
                selectedId={this.state.selectedSubjectId}
            />
        );
        if (gradesLstSize < 1) {
            return (
                <>
                    <div>
                        {filter}
                    </div>
                    <h3>
                        There are no grades for now!
                    </h3>
                </>

            )
        };
        return (
            <div className="table-responsive">
                {filter}
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr className="bg-primary">
                            <th scope="col">Subject</th>
                            <th scope="col">Grade</th>
                            <th scope="col">Date</th>
                            <th scope="col">Grade Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.grade}</td>
                                    <td>{formatDate(item.date)}</td>
                                    <td>{item.type}</td>
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
export default connect(mapStateToProps)(withRouter(GetStudentGrades));