import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import MenuMain from '../menu/MenuMain';
import Logo from './Logo';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: _.toInteger(_.get(props, 'match.params.page', 1)),
        };
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <header className="page-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-2">
                            <Logo />
                            <nav className="navbar navbar-expand-lg navbar-dark float-right d-block d-md-none">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#menu-main"
                                    aria-controls="main-nav"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon" />
                                </button>
                            </nav>
                        </div>
                        <div className="col-12 col-md-10 position-static">
                            <MenuMain />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
