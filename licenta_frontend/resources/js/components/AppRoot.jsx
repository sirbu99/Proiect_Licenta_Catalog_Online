import React, { Component, Children } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './pages/partials/Header';
import Footer from './pages/partials/Footer';

import { authActions } from '../actions/users/authActions';
import ContainerFluid from "./generic/ContainerFluid";
import Container from "./generic/Container";

class AppRoot extends Component {

    static propTypes = {
        location: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const { dispatch } = this.props;

        // add authentication token if present
        $.ajaxPrefilter((options) => {
            if (!_.isEmpty(props.auth.user)) {
                _.set(options, 'headers[Authorization]', `Bearer ${props.auth.user.api_token}`);
            }
        });

        $('body').on('click', '.nav-item', function() {
           $(this).siblings().removeClass('active');
           $(this).addClass('active');
        });

        // trigger page reload if local and remote versions don't match
        $(document).ajaxComplete((event, xhr) => {
            const responseVer = _.trim(xhr.getResponseHeader('X_Api_Version'));
            const pageVer = _.trim($('meta[name=version]').attr('content'));

            if (!_.isEmpty(responseVer) && !_.isEmpty(pageVer) && responseVer !== pageVer) {
                window.location.reload();
            }
        });

        // logout user if 401 code received
        $(document).ajaxError((event, jqxhr) => {
            if (jqxhr.status === 401) {
                dispatch(authActions.logout());
                window.location = `/login?r=${window.location.pathname}`;
            }
        });
    }

    render() {
        return (
            <div className="app-container">
                <Header />
                {/* { this.props.auth.loggedIn
                    ? <ContainerFluid>{Children.only(this.props.children)}</ContainerFluid>
                    : <Container>{Children.only(this.props.children)}</Container>
                } */}
                <Container>{Children.only(this.props.children)}</Container>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication,
});

export default connect(mapStateToProps)(withRouter(AppRoot));
