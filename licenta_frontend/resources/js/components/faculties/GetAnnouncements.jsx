import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import Spinner from '../ui/Spinner';
import axios from 'axios';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
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
        this.setState({ ...this.state, modalIsOpen: true, selectedId: id });
    }

    closeModal() {
        this.setState({ ...this.state, modalIsOpen: false, selectedId: null });
    }

    handleShowButtons(id) {
        return _.get(this.props, 'auth.user.permissions', []).includes('announcements')
            ? <div className="btn-announcements">
                <button className="btn btn-edit" onClick={this.handleEdit.bind(this, id)}><FaEdit /></button>
                <button className="btn btn-delete" onClick={this.openModal.bind(this, id)}><FaWindowClose /></button>
            </div>
            : null
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
                <div className="announcements-list">
                    <h3>
                        There are no announcements yet.
                    </h3>
                    <button
                        className="btn btn-outline-success float-right"
                        onClick={() => this.props.history.push(newAnnouncementUrl)}
                    >
                        Add Announcement
                    </button>
                </div>
            )
        } else {
            return (
                <div className="announcements-list">
                    <button
                        className="btn btn-outline-success float-right"
                        onClick={() => this.props.history.push(newAnnouncementUrl)}
                    >
                        Add Announcement
                    </button>
                    <div className="row">
                        {announcements.map(item => {
                            return (
                                <div className="col-12 col-lg-6" key={item.id}>
                                    <div className="card announcement-card">
                                        <div className="card-details">
                                            <h5 className="card-title" >
                                                {item.name}
                                            </h5>
                                            <div className="description">
                                                {item.text}
                                            </div>
                                            <div className="author">
                                                {`${item.first_name} ${item.last_name}`}
                                            </div>
                                            {this.handleShowButtons(item.id)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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