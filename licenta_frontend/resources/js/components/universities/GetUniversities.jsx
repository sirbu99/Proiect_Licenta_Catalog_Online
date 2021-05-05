import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';


class GetUniversities extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            universities: [],
        }
    }

    componentDidMount() {
        const apiUrl = `${getApiHost()}/universities`;
        try {
            console.log(this.props.auth);
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

    fetchDetails(id) {
        this.props.history.push(`/universities/${id}`);
    }

    handleEdit(id){
        this.props.history.push(`/universities/${id}/edit`);
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
                    {_.get(this.props, 'auth.user.permissions', []).includes('faculty')
                        ? 'are permisisune'
                        : null
                    }
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr className="bg-primary">
                                <th scope="col">University Name</th>
                                <th scope="col">City</th>
                                <th scope="col">Country</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {universities.map(uni => {
                                return (
                                    <tr key={uni.id}  >
                                        <td role="button" onClick={this.fetchDetails.bind(me, uni.id)} >{uni.name}</td>
                                        <td>{uni.city}</td>
                                        <td>{uni.country}</td>
                                        <td role="button" onClick={this.handleEdit.bind(me, uni.id)}>Edit</td>
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