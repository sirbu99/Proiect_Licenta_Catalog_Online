import React, { Component } from 'react';
import GetStudents from '../../faculties/GetStudents';
import MenuSecondary from '../menu/MenuSecondary'

class studentsOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-4 col-lg-3 secondary-menu">
                    <MenuSecondary />
                </div>
                <div className="col-12 col-md-8 col-lg-9 text-center">
                    <h1>Students List</h1>
                    <GetStudents
                        universityId={this.props.match.params.id}
                        facultyId={this.props.match.params.facultyId}
                    />
                </div>

            </div>

        );
    }
}

export default studentsOverview;