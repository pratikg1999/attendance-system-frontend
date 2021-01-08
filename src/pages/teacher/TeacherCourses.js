import React, { Component } from "react";
import { Grid, Typography, TableContainer, Table, TableHead, TableBody, TableCell, Paper } from "@material-ui/core";
import CourseInfo from "../../components/courseInfo"
import CourseAttendance from "./components/courseAttendance";
import * as actionTypes from "../../store/teacher/actions";
import AllClassesTable from "./components/allClassesTable"
import { connect } from "react-redux"
import axios from "../../axiosInstance"


function stripTrailingSlash(site) {
    return site.replace(/\/+$/, "");
}

class TeacherCourses extends Component {
    state = {
        courseAttendance: [],
    }
    componentDidMount() {
        const url = stripTrailingSlash(this.props.location.pathname);
        const subid = url.split('/').slice(-1)[0];
        this.props.setTeacherState({ isLoading: true });
        axios.get('/course/studentsAttendance?courseId=' + subid).then(({ data }) => {
            this.setState({ courseAttendance: data });
            this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Course loaded successfully" })
        }).catch(err => this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured" }));
    }
    componentDidUpdate(prevProps, prevState) {
        const prevurl = stripTrailingSlash(prevProps.location.pathname);
        const oldSubid = prevurl.split('/').slice(-1)[0];
        const url = stripTrailingSlash(this.props.location.pathname);
        const subid = url.split('/').slice(-1)[0];
        if (oldSubid !== subid) {
            this.props.setTeacherState({ isLoading: true });
            axios.get('/course/studentsAttendance?courseId=' + subid).then(({ data }) => {
                this.setState({ courseAttendance: data });
                this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Course loaded successfully" })
            }).catch(err => this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured" }));
        }

    }
    render() {
        const url = stripTrailingSlash(this.props.location.pathname);
        const subid = url.split('/').slice(-1)[0];
        let courses = this.props.courses || [];
        let course = {};

        for (let i = 0; i < courses.length; i++) {
            const courseT = courses[i];
            if (courseT._id === subid || courseT.id === subid) {
                course = { ...courseT }
            }
        }

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h3">{course.name}</Typography>
                    <hr />
                </Grid>
                <Grid item xs={12} className="text-center">
                    <CourseInfo course={course} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <CourseAttendance data={this.state.courseAttendance} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <AllClassesTable data={course.classes} course={course} location={this.props.location} match={this.props.match} history={this.props.history} />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({ courses: state.courses });
const mapDisptachToProps = dispatch => {
    return {
        setTeacherState: (newState) => dispatch({ type: actionTypes.MODIFY_STATE, newState: newState })
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(TeacherCourses);