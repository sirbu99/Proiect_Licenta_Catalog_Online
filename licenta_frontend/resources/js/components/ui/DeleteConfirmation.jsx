import React from 'react';
import Modal from '../ui/Modal';
import Backdrop from '../ui/Backdrop';

const DeleteConfirmation = (props) => {
    return (
        <div>
            {props.modalIsOpen && <Modal onModalClick={props.closeModal}>
                <div>
                    <p>Are you sure?</p>
                        <button className="btn btn-danger" onClick={props.handleDelete}>Delete</button>
                        <button className="btn btn-outline-primary" onClick={props.closeModal}>Cancel</button>
                </div>
            </Modal>}
            {props.modalIsOpen && <Backdrop />}
        </div>
    );
};

export default DeleteConfirmation;