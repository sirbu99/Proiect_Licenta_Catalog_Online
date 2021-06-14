import React, { Component } from 'react';
import GetSchedule from '../../faculties/GetSchedule';
import MenuSecondary from '../menu/MenuSecondary'

class scheduleOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        console.log(this.props.match.params)
        return (
            <div className="row">
                <div className="col-12 col-md-4 col-lg-3 secondary-menu">
                    <MenuSecondary></MenuSecondary>
                </div>
                <div className="col-12 col-md-8 col-lg-9 text-center">
                    <h1>Schedule</h1>
                    <GetSchedule universityId={this.props.match.params.id} facultyId={this.props.match.params.facultyId}></GetSchedule>
                </div>

            </div>

        );
    }
}

export default scheduleOverview;