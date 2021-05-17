import React, { Component } from 'react';
import GetFacultiesFromUniversity from '../../faculties/GetFacultiesFromUniversity';
import { Link } from 'react-router-dom';

class facultiesOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        console.log(this.props.match.params)
        return (
            <div>
                <h1 className="text-center">Faculties List</h1>
                <div className="card-panel">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/universities" className="d-block mb-3">&lt; Back to universities</Link>
                        </div>
                    </div>
                    <GetFacultiesFromUniversity universityId={this.props.match.params.id}></GetFacultiesFromUniversity>
                </div>
            </div>
        );
    }
}

export default facultiesOverview;