import React from 'react';
import { getApiHost } from '../../services/commonService';

class GetFacultiesFromUniversity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            faculties: [],
        }
    }
    componentDidMount() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}`;
        try {
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => this.setState({ faculties: data }));

        } catch (error) {
            console.error(error);
        };
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
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.map(fct => {
                                return (
                                    <tr key={fct.id}>
                                        <td >{fct.name}</td>
                                        <td>{fct.address}</td>
                                        <td>{fct.description}</td>
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
export default GetFacultiesFromUniversity;