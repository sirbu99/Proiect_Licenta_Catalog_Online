import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';

class GetAnnouncements extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            announcements: [],
        }
    }
    componentDidMount() {
        this.fetchStudents();
    }

    

    fetchStudents() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/announcements`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ announcements: data }));

        } catch (error) {
            console.error(error);
        };
    }

    render() {
        const announcements = this.state.announcements;
        const announcementsListSize = Object.keys(announcements).length;
        if (announcementsListSize < 1) {
            return (
                <h3>
                    There are no announcements yet.
                </h3>
            )
        } else {
            return (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr className="bg-primary">
                                <th scope="col">Name</th>
                                <th scope="col">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.text}</td>
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
export default connect(mapStateToProps)(withRouter(GetAnnouncements));