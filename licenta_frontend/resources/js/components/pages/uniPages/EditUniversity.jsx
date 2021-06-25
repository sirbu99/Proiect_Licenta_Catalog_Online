import React, { Component } from 'react';
import EditUniversityForm from '../../universities/EditUniversityForm';

class UniversityEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <EditUniversityForm universityId={this.props.match.params.id}></EditUniversityForm>
            </div>
        );
    }
}

export default UniversityEdit;