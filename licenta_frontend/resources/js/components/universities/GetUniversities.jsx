import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import DeleteConfirmation from '../ui/DeleteConfirmation';

class GetUniversities extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            universities: [],
            isLoaded: false,
            modalIsOpen: false,
            selectedId: null
        }
    }

    componentDidMount() {
        this.fetchUniversities();
    }

    fetchUniversities() {
        const apiUrl = `${getApiHost()}/universities`;
        console.log(this.props.auth);
        try {
            fetch(apiUrl, {
                headers: {
                    'Authorization': this.props.auth.user && this.props.auth.user.api_token
                }
            })
                .then((response) => response.json())
                .then((data) => this.setState({ ...this.state, universities: data, isLoaded: true }));

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

    openModal(id) {
        this.setState({ ...this.state, modalIsOpen: true, selectedId: id });
    }

    closeModal() {
        this.setState({ ...this.state, modalIsOpen: false, selectedId: null });
    }

    handleShowButtons(id) {
        return _.get(this.props, 'auth.user.permissions', []).includes('edit_university')
            ? <div className="btn-wrapper">
                <button className="btn btn-primary" onClick={this.handleEdit.bind(this, id)}>Edit</button>
                <button className="btn btn-danger" onClick={this.openModal.bind(this, id)}>Delete</button>
            </div>
            : null
    }

    render() {
        const universities = this.state.universities;
        const uniListSize = Object.keys(universities).length;
        const isLoaded = this.state.isLoaded;

        if (!isLoaded) {
            return <Spinner />
        }

        if (uniListSize < 1) {
            return (
                <h5>
                    These are no universities to display!
                </h5>
            )
        } else {
            return (
                <div className="row">
                    {universities.map(university => {
                        return (
                            <Card
                                key={university.id}
                                clickHandler={this.showDetails.bind(this, university.id)}
                                imageSrc="https://placeimg.com/800/600/tech"
                                imageAlt={university.name}
                                cardTitle={university.name}
                                description={`${university.city}, ${university.country}`}
                                additional={this.handleShowButtons(university.id)}
                            />
                        )
                    })}
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

export default connect(mapStateToProps)(withRouter(GetUniversities));