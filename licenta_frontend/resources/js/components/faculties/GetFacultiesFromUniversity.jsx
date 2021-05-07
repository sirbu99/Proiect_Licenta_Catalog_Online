import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';

class GetFacultiesFromUniversity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            faculties: [],
        }
    }
    componentDidMount() {
        this.fetchFaculties();
    }

    fetchFaculties() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ faculties: data }));

        } catch (error) {
            console.error(error);
        };
    }

    handleEdit(id) {
        this.props.history.push(`/universities/${this.props.universityId}/${id}/edit`);
    }

    handleDelete(id) {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${id}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.delete(apiUrl, { headers })
                .then(this.fetchFaculties.bind(this));
        } catch (error) {
            console.log(error)
        }
    }

    showDetails(id) {
        this.props.history.push(`/universities/${this.props.universityId}/${id}/students`);
    }

    render() {
        const faculties = this.state.faculties;
        const fctListSize = Object.keys(faculties).length;
        if (fctListSize < 1) {
            return (
                <h3>
                    There are no faculties to display!
                </h3>
            )
        } else {
            return (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr className="bg-primary">
                                <th scope="col">Faculty Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Description</th>
                                {_.get(this.props, 'auth.user.permissions', []).includes('faculty')
                                    ? <>
                                        <th></th>
                                        <th></th>
                                    </>
                                    : null
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.map(fct => {
                                return (
                                    <tr key={fct.id}>
                                        <td role="button" onClick={this.showDetails.bind(this, fct.id)}>{fct.name}</td>
                                        <td>{fct.address}</td>
                                        <td>{fct.description}</td>
                                        {_.get(this.props, 'auth.user.permissions', []).includes('faculty')
                                            ? <>
                                                <td role="button" onClick={this.handleEdit.bind(this, fct.id)}>Edit</td>
                                                <td role="button" onClick={this.handleDelete.bind(this, fct.id)}>Delete</td>
                                            </>
                                            : null
                                        }

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );

        }

    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GetFacultiesFromUniversity));