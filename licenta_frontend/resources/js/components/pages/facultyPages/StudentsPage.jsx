import React, { Component } from 'react';
import GetStudentsFromFaculty from '../../faculties/GetStudentsFromFaculty';

class studentsOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        console.log(this.props.match.params)
        return (
            <div className="text-center">
                <h1>Students List</h1>
                <GetStudentsFromFaculty universityId={this.props.match.params.id} facultyId={this.props.match.params.facultyId}></GetStudentsFromFaculty>
            </div>
        );
    }
}

export default studentsOverview;