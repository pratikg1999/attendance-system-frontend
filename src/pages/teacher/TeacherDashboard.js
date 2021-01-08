import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Paper, Typography, FormControl, TextField, Input, FormHelperText, InputLabel, Select, MenuItem, Button } from "@material-ui/core";
import * as actionTypes from '../../store/teacher/actions';
import axios from "../../axiosInstance"
import AllCourseAttendance from "../../components/allAttendance"

// axios.defaults.baseURL = "https://3b9db978-2d33-4055-92cd-c4d24c7411a9.mock.pstmn.io/";
class TeacherDashboard extends Component {
    state = {
        data: {}
    };

    handleAddCourse = async (evt) => {
        evt.preventDefault();
        console.log(evt.target.name.value, evt.target.year.value, evt.target.semester.value);
        try {
            this.props.setTeacherState({ isLoading: true });
            await axios.post('/course/createCourse', {
                name: evt.target.name.value,
                year: evt.target.year.value,
                semester: evt.target.semester.value,
            });
            const res = await axios.get('/teacher/myCourses');
            this.props.setTeacherState({ courses: res.data.courses, isLoading: false, showSnackbar: true, snackbarMessage: "Course added Successfully" });
        } catch (error) {
            this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured" });
        }
    }

    render() {
        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="h3">Dashboard</Typography>
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <AllCourseAttendance courses={this.props.courses} />
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={this.handleAddCourse} >
                        <Paper className="p-3">
                            <Grid container spacing={3} justify="center" alignItems="center" >
                                <Grid item xs={12}><Typography variant="h6">Add a Course</Typography><hr /></Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField label="Name" variant="outlined" required name="name" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField label="Year" variant="outlined" required type="number" name="year" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField style={{ width: "150px" }} select label="Semester" variant="outlined" required name="semester" >
                                        <MenuItem value="spring">Spring</MenuItem>
                                        <MenuItem value="autumn">Autumn</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} md={12} >
                                    <Button className="ml-auto" variant="contained" color="primary" type="submit">Add Course</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                </Grid>
            </Grid >
        );
    }
}
const mapStateToProps = state => ({ courses: state.courses });

const mapDisptachToProps = dispatch => ({
    setTeacherState: (newState) => dispatch({ type: actionTypes.MODIFY_STATE, newState: newState })
});

export default connect(mapStateToProps, mapDisptachToProps)(TeacherDashboard);
