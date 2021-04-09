import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import { getRoutes } from './services/commonService';
import ScrollToTop from './components/generic/ScrollToTop';
import AppRoot from './components/AppRoot';
import NotFound from "./components/generic/NotFound";
import pagesRoutes from './components/pages/PagesRoutes';
import usersRoutes from './components/users/UsersRoutes';
import authRoutes from './components/auth/AuthRoutes';

import '../sass/app.scss';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

const routes = []
    .concat(getRoutes(pagesRoutes.routes, store.getState().authentication))
    .concat(getRoutes(usersRoutes.routes, store.getState().authentication))
    .concat(getRoutes(authRoutes.routes, store.getState().authentication))
    .concat([
        <Route key="not-found" path='*' component={NotFound}/>
    ]);

ReactDOM.render((
    <BrowserRouter>
        <Provider store={store}>
            <Suspense fallback={null}>
                <ScrollToTop>
                    <AppRoot>
                        <Switch>
                            { routes }
                        </Switch>
                    </AppRoot>
                </ScrollToTop>
            </Suspense>
        </Provider>
    </BrowserRouter>
), document.getElementById("app-root"));
