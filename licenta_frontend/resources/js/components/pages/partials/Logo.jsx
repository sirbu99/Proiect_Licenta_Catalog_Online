import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Logo = (props) => {
    return (
        <Link to="/">
            <img alt="logo" className={`logo ${props.size}`} src="/images/logo.png" loading="lazy"/>
        </Link>
    );
};

Logo.propTypes = {
    size: PropTypes.string,
};

Logo.defaultProps = {
    size: 'small',
};

export default Logo;
