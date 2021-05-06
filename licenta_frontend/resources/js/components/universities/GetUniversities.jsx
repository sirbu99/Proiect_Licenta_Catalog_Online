import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';


class GetUniversities extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            universities: [],
        }
    }

    componentDidMount() {
        this.fetchUniversities();
    }

    fetchUniversities() {
        const apiUrl = `${getApiHost()}/universities`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ universities: data }));

        } catch (error) {
            console.log(error)
        };
    }

    showDetails(id) {
        this.props.history.push(`/universities/${id}`);
    }

    handleEdit(id) {
        this.props.history.push(`/universities/${id}/edit`);
    }

    handleDelete(id) {
        const apiUrl = `${getApiHost()}/universities/${id}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.delete(apiUrl, { headers })
                .then(this.fetchUniversities.bind(this));
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const me = this;
        const universities = this.state.universities;
        const uniListSize = Object.keys(universities).length;
        if (uniListSize < 1) {
            return (
                <h3>
                    These are no universities to display!
                </h3>
            )
        } else {
            return (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr className="bg-primary">
                                <th scope="col">University Name</th>
                                <th scope="col">City</th>
                                <th scope="col">Country</th>
                                {_.get(this.props, 'auth.user.permissions', []).includes('edit_university')
                                    ? <>
                                        <th></th>
                                        <th></th>
                                    </>
                                    : null
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {universities.map(uni => {
                                return (
                                    <tr key={uni.id}  >
                                        <td role="button" onClick={this.showDetails.bind(me, uni.id)} >{uni.name}</td>
                                        <td>{uni.city}</td>
                                        <td>{uni.country}</td>
                                        {_.get(this.props, 'auth.user.permissions', []).includes('edit_university')
                                            ? <>
                                                <td role="button" onClick={this.handleEdit.bind(me, uni.id)}>Edit</td>
                                                <td role="button" onClick={this.handleDelete.bind(me, uni.id)}>Delete</td>
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

export default connect(mapStateToProps)(withRouter(GetUniversities));