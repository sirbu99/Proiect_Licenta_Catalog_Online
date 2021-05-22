import React, { Component } from 'react';
import GetTeachers from '../../faculties/GetTeachers';
import MenuSecondary from '../menu/MenuSecondary'

class teachersOverview extends Component {
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
                    <h1>Teachers List</h1>
                    <GetTeachers 
                        universityId={this.props.match.params.id} 
                        facultyId={this.props.match.params.facultyId}
                    />
                </div>

            </div>
            
        );
    }
}

export default teachersOverview;