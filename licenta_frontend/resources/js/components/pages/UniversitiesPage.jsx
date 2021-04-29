import React, { Component } from 'react';
import GetUniversitiesComponent from '../universities/GetUniversitiesComponent';

class UniversitiesOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="text-center">
                <h1>Universites List</h1>
                <GetUniversitiesComponent></GetUniversitiesComponent>
            </div>
        );
    }
}

export default UniversitiesOverview;