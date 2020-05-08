import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Pag404 } from '~/pages/pages/errorPage';
import Login from '~/pages/pages/login';
import App from './App';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/data/index" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" component={Pag404} />
            <Route path="/login" component={Login} />
            <Route component={Pag404} />
        </Switch>
    </Router>
);
