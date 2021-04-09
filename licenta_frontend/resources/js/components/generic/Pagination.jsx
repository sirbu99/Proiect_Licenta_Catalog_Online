import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const pagination = [];
    if (props.totalPages < 2) {
        return null;
    }

    const startPage = Math.max(1, props.page - 3);
    const endPage = Math.min(props.totalPages, props.page + 3);

    for (let i = startPage; i <= endPage; i++) {
        pagination.push(
            <li key={`page-${i}`} className={`page-item ${i === props.page ? "active" : ""}`}>
                <a className="page-link" href="#" onClick={props.changePage.bind(this, i)}>{i}</a>
            </li>
        );
    }

    return (
        <nav className="mt-3">
            <ul className="pagination">
                <li className={`page-item ${props.page === 1 ? "disabled" : ""}`}>
                    <a className="page-link" href="#" onClick={props.changePage.bind(this, Math.max(1, props.page - 1))}>
                        <span>&laquo;</span>
                    </a>
                </li>
                {startPage > 1 ? <span className="m-2">...</span> : ""}
                {pagination}
                {endPage < props.totalPages ? <span className="m-2">...</span> : ""}
                <li className={`page-item ${props.page === props.totalPages ? "disabled" : ""}`}>
                    <a className="page-link" href="#" onClick={props.changePage.bind(this, Math.min(props.totalPages, props.page + 1))}>
                        <span>&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    totalPages: PropTypes.any,
    page: PropTypes.any,
    changePage: PropTypes.func,
};

export default Pagination;
