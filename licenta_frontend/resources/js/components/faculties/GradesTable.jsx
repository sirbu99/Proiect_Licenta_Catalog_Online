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
            yearInfo: [],
            selectedYear: '',
            selectedGroup: '',
            selectedHalfYear: '',
            selectedSubjectId: '',
            hasFilters: false,
            isLoaded: false,
        }

        this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
        this.routeUniversityId = _.get(this.props, 'match.params.id', null);
    }

    componentDidMount() {
        this.fetchStudents();
        this.fetchSubjects();
        this.fetchGroups();
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

    fetchStudents(applyFilter = false, event) {
        event && event.preventDefault();
        let apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/students/list?type=display`;
        if (this.state.selectedSubjectId) {
            apiUrl += `&subjectId=${this.state.selectedSubjectId}`;
        }
        if (this.state.selectedYear) {
            apiUrl += `&year=${this.state.selectedYear}`;
        }
        if (this.state.selectedHalfYear) {
            apiUrl += `&halfYear=${this.state.selectedHalfYear}`;
        }
        if (this.state.selectedGroup) {
            apiUrl += `&group=${this.state.selectedGroup}`;
        }
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ students: data, isLoaded: true, hasFilters: applyFilter }));

        } catch (error) {
            console.error(error);
        };
    }
    fetchGroups() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/groups`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ yearInfo: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };

    }

    handleChangeSubject(event) {
        event.preventDefault();
        this.setState({ selectedSubjectId: event.target.value });
    }

    handleChangeYear(event) {
        event.preventDefault();
        this.setState({ selectedYear: event.target.value });
    }

    handleChangeGroup(event) {
        event.preventDefault();
        this.setState({ selectedGroup: event.target.value });
    }

    handleChangeHalfYear(event) {
        event.preventDefault();
        this.setState({ selectedHalfYear: event.target.value });
    }

    render() {
        const isLoaded = this.state.isLoaded;
        const stdListSize = Object.keys(this.state.students).length;
        const yearsList = {};
        const groupsList = {};
        const halfYearsList = {};
        const students = this.state.students.map((item) => {
            return { id: item.registration_number, value: `${item.first_name} ${item.last_name}` }
        });

        this.state.yearInfo.forEach(item => {
            yearsList[item.year] = { name: item.year, id: item.year };
            groupsList[item.group] = { name: item.group, id: item.group };
            halfYearsList[item.half_year] = { name: item.half_year, id: item.half_year };

        });

        const subjectsFilter = (
            <>
                <Filter
                    clickHandler={this.handleChangeSubject.bind(this)}
                    name="subjects"
                    fetchInfo={this.fetchStudents.bind(this)}
                    list={this.state.subjects}
                    selectedId={this.state.selectedSubjectId}
                />

            </>
        )
        const yearsFilter = (
            <Filter
                clickHandler={this.handleChangeYear.bind(this)}
                name="years"
                fetchInfo={this.fetchStudents.bind(this)}
                list={Object.values(yearsList)}
                selectedId={this.state.selectedYear}
            />
        )
        const groupsFilter = (
            <Filter
                clickHandler={this.handleChangeGroup.bind(this)}
                name="groups"
                fetchInfo={this.fetchStudents.bind(this)}
                list={Object.values(groupsList)}
                selectedId={this.state.selectedGroup}
            />
        )
        const halfYearsFilter = (
            <Filter
                clickHandler={this.handleChangeHalfYear.bind(this)}
                name="half-years"
                // fetchInfo={this.fetchStudents.bind(this)}
                list={Object.values(halfYearsList)}
                selectedId={this.state.selectedHalfYear}
            />
        )
        if (!isLoaded) {
            return <Spinner />
        }

        const filters = (
            <div>
                {subjectsFilter}
                {yearsFilter}
                {halfYearsFilter}
                {groupsFilter}
                <button onClick={this.fetchStudents.bind(this, true)} className="btn btn-primary mx-2" >Apply</button>
            </div>
        );

        if (this.state.selectedSubjectId == '' || this.state.selectedYear == '' || !this.state.hasFilters) {
            return (
                <>
                    {filters}
                    <hr></hr>
                    <h3>Please select a subject and a year</h3>
                </>
            );
        }

        if (stdListSize < 1) {
            return (
                <>
                    {filters}
                    <hr></hr>
                    <h3>There are no students assigned for this subject yet!</h3>
                </>
            )
        };

        return (
            <div style={{ width: 'max-content' }}>
                {filters}
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