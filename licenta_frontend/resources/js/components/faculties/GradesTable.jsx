import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from '../table/Table';
import { getApiHost } from '../../services/commonService';


class GradesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: []
        }

        this.routeFacultyId = _.get(this.props, 'match.params.facultyId', null);
        this.routeUniversityId = _.get(this.props, 'match.params.id', null);
    }

    componentDidMount() {
        this.fetchStudents();
    }

    fetchStudents() {
        const apiUrl = `${getApiHost()}/universities/${this.routeUniversityId}/${this.routeFacultyId}/students/list`;
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

    render() {
        const students = this.state.students.map((item) => { 
            return {id: item.registration_number, value: `${item.first_name} ${item.last_name}`}
        });
        
        return (
            <div style={{ width: 'max-content' }}>
                <Table headerY={students} x={5} y={Object.keys(students).length} id={'1'} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GradesTable));