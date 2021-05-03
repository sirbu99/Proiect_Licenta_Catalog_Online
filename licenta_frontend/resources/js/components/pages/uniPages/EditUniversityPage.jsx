import React, { Component } from 'react';
import EditUniversityForm from '../../universities/EditUniversityForm';

class UniversityEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="text-center">
                <h1>Edit University</h1>
                <EditUniversityForm universityId={this.props.match.params.id}></EditUniversityForm>
            </div>
        );
    }
}

export default UniversityEdit;