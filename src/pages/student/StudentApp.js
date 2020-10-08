import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";

class StudentApp extends Component {
    render() {
        // let { path, url } = useRouteMatch();
        console.log(this.props.match)
        return (
            <>
            {"student app"}
            <BrowserRouter>
                <Switch>
                    <Route path={`${this.props.match.path}/dashboard`} exact component={StudentDashboard}/>
                </Switch>
            </BrowserRouter>
            </>
        );
    }
}

export default withRouter(StudentApp);
