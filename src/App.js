import { ThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import LoginApp from "./pages/login/LoginApp";
import StudentApp from "./pages/student/StudentApp";
import TeacherApp from "./pages/teacher/TeacherApp";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "@material-ui/core/Toolbar";

import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import studentReducer from "./store/student/reducer";
import teacherReducer from "./store/teacher/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

const studentStore = createStore(studentReducer);
const teacherStore = createStore(teacherReducer);

function providerHOC(WrappedComponent, store) {
  return function (props) {
    return (
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    )
  }
}
class App extends Component {
  render() {

    return (
      <>
        {/* <CssBaseline /> */}
        {/* <ThemeProvider> */}
        {/* <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start"  color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Photos
    </Typography>
          </Toolbar>
        </AppBar> */}
        <Switch>
          <Route path="/" exact component={LoginApp} />
          <Route path="/student" component={providerHOC(StudentApp, studentStore)} />
          <Route path="/teacher" component={providerHOC(TeacherApp, teacherStore)} />
        </Switch>
        {/* </ThemeProvider> */}
      </>
    );
  }
}

export default App;
