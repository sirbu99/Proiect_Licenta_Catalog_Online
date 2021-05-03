import React, { Component } from 'react';
import GetFacultiesFromUniversity from '../../faculties/GetFacultiesFromUniversity';

class facultiesOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        console.log(this.props.match.params)
        return (
            <div className="text-center">
                <h1>Faculties List</h1>
                <GetFacultiesFromUniversity universityId={this.props.match.params.id}></GetFacultiesFromUniversity>
            </div>
        );
    }
}

export default facultiesOverview;