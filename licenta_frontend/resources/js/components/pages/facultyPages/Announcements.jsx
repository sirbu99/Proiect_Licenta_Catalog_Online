import React, { Component } from 'react';
import GetAnnouncements from '../../faculties/GetAnnouncements';
import MenuSecondary from '../menu/MenuSecondary'

class announcementsOverview extends Component {
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
                    <h1>Announcements</h1>
                    <GetAnnouncements universityId={this.props.match.params.id} facultyId={this.props.match.params.facultyId}></GetAnnouncements>
                </div>
            </div>

        );
    }
}

export default announcementsOverview;