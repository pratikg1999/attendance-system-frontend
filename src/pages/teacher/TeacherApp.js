import React, { Component } from 'react';
import TeacherDashboard from './TeacherDashboard';
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';
class LoginApp extends Component {
    render() {
        // let { path, url } = useRouteMatch();
        return (
            <>
            {"teacher app"}
            <BrowserRouter>
                <Switch>
                    <Route path={`${this.props.match.path}/dashboard`} exact component={TeacherDashboard}/>
                </Switch>
            </BrowserRouter>
            </>
        );
    }
}

export default withRouter(LoginApp);
