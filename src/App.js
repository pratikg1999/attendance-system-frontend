import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginApp from "./pages/login/LoginApp";
import StudentApp from "./pages/student/StudentApp";
import TeacherApp from "./pages/teacher/TeacherApp";


  class App extends Component {
    render() {

      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LoginApp} />
            <Route path="/student" component={StudentApp} />
            <Route path="/teacher" component={TeacherApp} />
          </Switch>
        </BrowserRouter>
      );
    }
  }

export default App;
