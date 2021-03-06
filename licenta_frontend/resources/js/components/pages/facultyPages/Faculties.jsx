import React, { Component } from 'react';
import GetFaculties from '../../faculties/GetFaculties';
import { Link } from 'react-router-dom';

class Faculties extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Faculties List</h1>
                <div className="card-panel">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/universities" className="d-block mb-3">&lt; Back to universities</Link>
                        </div>
                    </div>
                    <GetFaculties universityId={this.props.match.params.id}></GetFaculties>
                </div>
            </div>

        );
    }
}

export default Faculties;