import React, { Component } from 'react';
import GetStudents from '../../faculties/GetStudents';
import MenuSecondary from '../menu/MenuSecondary'

class facultyOverview extends Component {
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
            </div>
            
        );
    }
}

export default facultyOverview;