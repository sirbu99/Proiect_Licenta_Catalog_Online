import React, { Children } from 'react';
const Modal = (props) => {
    return (
        <div className="modal show" onClick={() => props.onModalClick()}>
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content">
                { Children.only(props.children) }
                </div>
            </div>
        </div>
    );
};

export default Modal;