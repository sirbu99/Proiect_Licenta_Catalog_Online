import React from 'react';
import { withRouter } from 'react-router-dom';
import { getApiHost } from '../../services/commonService';


class GetUniversitiesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            universities: [],
        }
    }

    componentDidMount() {
        const apiUrl = `${getApiHost()}/universities`;
        try {
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => this.setState({ universities: data }));

        } catch (error) {
            console.log(error)
        };
    }

    fetchDetails(id) {
        console.log(this.props);
        this.props.history.push(`/universities/${id}`);
    }

    render() {
        const me = this;
        const universities = this.state.universities;
        const uniListSize = Object.keys(universities).length;
        console.log(uniListSize);
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {universities.map(uni => {
                                return (
                                    <tr key={uni.id} onClick={this.fetchDetails.bind(me, uni.id)} >
                                        <td >{uni.name}</td>
                                        <td>{uni.city}</td>
                                        <td>{uni.country}</td>
                                        <td>Edit</td>
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
export default withRouter(GetUniversitiesComponent);