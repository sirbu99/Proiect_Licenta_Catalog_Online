import React, { Component } from 'react';
import EditTeacherInfoForm from '../../faculties/EditTeacherInfoForm'

class UpdateTeacherInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="text-center">
                <h1>Edit Teacher Info</h1>
                <EditTeacherInfoForm universityId={this.props.match.params.id} facultyId = {this.props.match.params.facultyId} userId = {this.props.match.params.userId}></EditTeacherInfoForm>
            </div>
        );
    }
}

export default UpdateTeacherInfo;