import React, { Component } from 'react';
import GetUniversities from '../../universities/GetUniversities';

class UniversitiesOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="text-center">
                <h1>Universites List</h1>
                <GetUniversities></GetUniversities>
            </div>
        );
    }
}

export default UniversitiesOverview;