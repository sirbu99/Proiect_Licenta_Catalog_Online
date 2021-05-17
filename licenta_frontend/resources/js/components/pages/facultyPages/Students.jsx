import React, { Component } from 'react';
import GetStudents from '../../faculties/GetStudents';
import MenuSecondary from '../menu/MenuSecondary'

class studentsOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        console.log(this.props.match.params)
        return (
            <div className="page-with-side-menu">
                <div className="secondary-menu">
                    <MenuSecondary></MenuSecondary>
                </div> 
                <div className="text-center">
                    <h1>Students List</h1>
                    <GetStudents universityId={this.props.match.params.id} facultyId={this.props.match.params.facultyId}></GetStudents>
                </div>

            </div>
            
        );
    }
}

export default studentsOverview;