import React, { Component } from 'react';
import EditFacultyForm from '../../faculties/EditFacultyForm';

class FacultyEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <EditFacultyForm universityId={this.props.match.params.id} facultyId={this.props.match.params.facultyId}></EditFacultyForm>
            </div>
        );
    }
}

export default FacultyEdit;