import React, { Component } from 'react';
import EditStudentInfoForm from '../../faculties/EditStudentInfoForm'

class UpdateStudentInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="text-center">
                <h1>Edit Student Info</h1>
                <EditStudentInfoForm universityId={this.props.match.params.id} facultyId = {this.props.match.params.facultyId} userId = {this.props.match.params.userId}></EditStudentInfoForm>
            </div>
        );
    }
}

export default UpdateStudentInfo;