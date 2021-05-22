import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import Spinner from '../ui/Spinner';
import axios from 'axios';
import DeleteConfirmation from '../ui/DeleteConfirmation';

class GetAnnouncements extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            announcements: [],
            isLoaded: false,
            modalIsOpen: false,
            selectedId: null
        }
    }
    componentDidMount() {
        this.fetchAnnouncements();
    }

    

    fetchAnnouncements() {
        const apiUrl = `${getApiHost()}/universities/${this.props.universityId}/${this.props.facultyId}/announcements`;
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ announcements: data, isLoaded: true }));

        } catch (error) {
            console.error(error);
        };
    }

    handleEdit(id) {
        this.props.history.push(`/universities/${this.props.universityId}/${this.props.facultyId}/announcements/${id}/edit`);
    }

    handleDelete(id) {
        const apiUrl = `${getApiHost()}/announcements/${id}`;
        const headers = {
            'Authorization': this.props.auth.user.api_token
        }
        try {
            axios.delete(apiUrl, { headers })
                .then(this.fetchAnnouncements.bind(this));
        } catch (error) {
            console.log(error)
        }
    }
    openModal(id) {
        this.setState({...this.state, modalIsOpen: true, selectedId: id });
    }

    closeModal() {
        this.setState({...this.state, modalIsOpen: false, selectedId: null });
    }

    render() {
        const announcements = this.state.announcements;
        const announcementsListSize = Object.keys(announcements).length;
        const isLoaded = this.state.isLoaded;
        const newAnnouncementUrl = `/universities/${this.props.universityId}/${this.props.facultyId}/announcements/new`;

        if (!isLoaded) {
            return <Spinner />
        }

        if (announcementsListSize < 1) {
            return (
                <h3>
                    There are no announcements yet.
                </h3>
            )
        } else {
            return (
                <div className="table-responsive">
                    <button
                        className="btn btn-outline-success float-right"
                        onClick={() => this.props.history.push(newAnnouncementUrl)}
                    >
                        Add Announcement
                    </button>
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr className="bg-primary">
                                <th scope="col">Teacher</th>
                                <th scope="col">Title</th>
                                <th scope="col">Message</th>
                                {_.get(this.props, 'auth.user.permissions', []).includes('announcements')
                                    ? <>
                                        <th />
                                        <th />
                                    </>
                                    : null
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.first_name} {item.last_name}</td>
                                        <td>{item.name}</td>
                                        <td>{item.text}</td>
                                        {_.get(this.props, 'auth.user.permissions', []).includes('announcements')
                                            ? <>
                                                <td role="button" onClick={this.handleEdit.bind(this, item.id)}>Edit</td>
                                                <td role="button" onClick={this.openModal.bind(this, item.id)}>Delete</td>
                                            </>
                                            : null
                                        }
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <DeleteConfirmation
                        modalIsOpen={this.state.modalIsOpen}
                        closeModal={this.closeModal.bind(this)}
                        handleDelete={this.handleDelete.bind(this, this.state.selectedId)}
                    />
                </div>
            );

        }

    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GetAnnouncements));