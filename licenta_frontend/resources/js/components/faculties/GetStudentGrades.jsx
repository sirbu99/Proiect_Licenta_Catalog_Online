import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost, formatDate } from '../../services/commonService';
import Spinner from '../ui/Spinner';
import axios from 'axios';
import DeleteConfirmation from '../ui/DeleteConfirmation';
import MenuSecondary from '../pages/menu/MenuSecondary';
import Filter from '../ui/Filter';

class GetStudentGrades extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grades: [],
            subjects: [],
            selectedSubjectId: '',
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
        const apiUrl = `${getApiHost()}/users/students/${this.props.auth.user.id}/subjects`;
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
        let apiUrl = `${getApiHost()}/users/students/${this.props.auth.user.id}/grades`;
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



    handleChange(event) {
        this.setState({ selectedSubjectId: event.target.value });
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
            <div className="d-flex justify-content-between align-items-center">
                <Filter
                    clickHandler={this.handleChange.bind(this)}
                    name="Subject"
                    fetchInfo={this.fetchGrades.bind(this)}
                    list={subjects}
                    selectedId={this.state.selectedSubjectId}
                />
                <button onClick={this.fetchGrades.bind(this)} className="btn btn-primary mx-2" >Apply</button>

            </div>
        );
        if (gradesLstSize < 1) {
            return (
                <>
                    {filter}
                    <hr></hr>
                    <h3>
                        There are no grades for now!
                    </h3>
                </>

            )
        };
        return (
            <div className="table-responsive">
                {filter}
                <hr></hr>
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
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GetStudentGrades));