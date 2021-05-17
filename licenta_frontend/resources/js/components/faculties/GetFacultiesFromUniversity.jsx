import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApiHost } from '../../services/commonService';
import axios from 'axios';
import Card from '../ui/Card';
import Backdrop from '../ui/Backdrop';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';

class GetFacultiesFromUniversity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            faculties: [],
            isLoaded: false,
            modalIsOpen: false,
            selectedId: null
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
                .then((data) => this.setState({ faculties: data, isLoaded: true }));

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

    handleShowButtons(id) {
        return _.get(this.props, 'auth.user.permissions', []).includes('faculty')
        ? <div className="btn-wrapper">
            <button className="btn btn-primary" onClick={this.handleEdit.bind(this, id)}>Edit</button>
            <button className="btn btn-primary" onClick={this.openModal.bind(this, id)}>Delete</button>
        </div>
        : null
    }

    openModal(id) {
        this.setState({...this.state, modalIsOpen: true, selectedId: id });
    }

    closeModal() {
        this.setState({...this.state, modalIsOpen: false, selectedId: null });
    }

    render() {
        const faculties = this.state.faculties;
        const fctListSize = Object.keys(faculties).length;
        const isLoaded = this.state.isLoaded;

        if (!isLoaded) {
            return <Spinner />
        }

        if (fctListSize < 1) {
            return (
                <h5>
                    There are no faculties to display!
                </h5>
            )
        } else {
            return (
                <div className="row">                    
                    {faculties.map(faculty => <Card key={faculty.id}
                        clickHandler = {this.showDetails.bind(this, faculty.id)}
                        imageSrc = "https://placeimg.com/800/600/tech"
                        imageAlt = {faculty.name}
                        cardTitle = {faculty.name}
                        description = {<div>{faculty.address}<br/>{faculty.description}</div>}
                        additional = {this.handleShowButtons(faculty.id)}
                    />)}
                    {this.state.modalIsOpen && <Modal onModalClick={this.closeModal.bind(this)}>
                        <div>
                            <p>Are you sure?</p>
                                <button className="btn btn-danger" onClick={this.handleDelete.bind(this, this.state.selectedId)}>Delete</button>
                                <button className="btn btn-outline-primary" onClick={this.closeModal.bind(this)}>Cancel</button>
                        </div>
                    </Modal>}
                    {this.state.modalIsOpen && <Backdrop />}
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});
export default connect(mapStateToProps)(withRouter(GetFacultiesFromUniversity));