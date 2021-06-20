import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from '../table/Table';
import Spinner from '../ui/Spinner';
import { getApiHost } from '../../services/commonService';
import Filter from '../ui/Filter';


class GradesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            subjects: [],
            selectedSubjectId: '',
            isLoaded: false,
        }

        this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
        this.routeUniversityId = _.get(this.props, 'match.params.id', null);
    }

    componentDidMount() {
        this.fetchStudents();
        this.fetchSubjects();
    }

    fetchSubjects() {
        const apiUrl = `${getApiHost()}/users/teachers/subjects`;
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

    fetchStudents(event) {
        event && event.preventDefault();
        let apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/students/list`;
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
                .then((data) => this.setState({ students: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ selectedSubjectId: event.target.value });
    }

    render() {
        const stdListSize = Object.keys(this.state.students).length;
        const students = this.state.students.map((item) => {
            return { id: item.registration_number, value: `${item.first_name} ${item.last_name}` }
        });
        const isLoaded = this.state.isLoaded;

        const filter = (
            <Filter
                clickHandler={this.handleChange.bind(this)}
                name="subjects"
                fetchInfo={this.fetchStudents.bind(this)}
                list={this.state.subjects}
                selectedId={this.state.selectedSubjectId}
            />
        )
        if (!isLoaded) {
            return <Spinner />
        }
        if (stdListSize < 1) {
            return (
                <>
                    <div>
                        {filter}
                    </div>
                    <hr></hr>
                    <h3>
                        There are no students assigned for this subject yet!
                    </h3>
                </>

            )
        };

        return (
            <div style={{ width: 'max-content' }}>
                {filter}
                <hr></hr>
                <Table headerY={students} x={5} y={Object.keys(students).length} id={'1'} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GradesTable));