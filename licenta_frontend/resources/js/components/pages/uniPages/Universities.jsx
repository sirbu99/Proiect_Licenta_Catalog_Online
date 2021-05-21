import React, { Component } from 'react';
import GetUniversities from '../../universities/GetUniversities';

class UniversitiesOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div >
                <h1 className="text-center">Universites List</h1>
                <div className="card-panel">
                    <GetUniversities></GetUniversities>
                </div>
            </div>
        );
    }
}

export default UniversitiesOverview;