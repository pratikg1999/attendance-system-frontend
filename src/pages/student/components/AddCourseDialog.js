import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import axios from "../../../axiosInstance"
import { connect } from "react-redux";
import * as actionTypes from '../../../store/student/actions';

function AddCourseDialog(props) {
    const [selectedCourse, setSelectedCourse] = useState();

    const handleSubmit = async () => {
        props.handleClose();
        try {
            props.setStudentState({ isLoading: true });
            await axios.post("/course/registerForCourse", { courseId: selectedCourse });
        } catch (error) {
            props.setStudentState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured" });
        }
        finally {
            props.setStudentState({ isLoading: false });
            let registeredCourse, unregisteredCourses;
            axios.get('/student/myCourses').then(({ data }) => props.setStudentState({ courses: data, isLoading: false, showSnackbar: true, snackbarMessage: "Registered Successfully" })).catch(err => console.log(err));
            axios.get('/student/unregCourses').then(({ data }) => props.setStudentState({ unregisteredCourses: data, isLoading: false })).catch(err => props.setStudentState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured" }));
            setSelectedCourse("");
        }

    }
    const handleChange = (evt) => {
        setSelectedCourse(evt.target.value);
    }
    return (
        <Dialog open={props.isOpen} onClose={props.handleClose} fullWidth>
            <DialogTitle >Register a Course</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please choose the course from the dropdown below and click on register to register for the course.
                </DialogContentText>
                <form >
                    <FormControl style={{ width: "90%" }}>
                        <InputLabel id="demo-dialog-select-label">Courses</InputLabel>
                        <Select
                            labelId="demo-dialog-select-label"
                            value={selectedCourse}
                            onChange={handleChange}
                            id="registerCourseSelect"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                props.unregisteredCourses && Array.isArray(props.unregisteredCourses) && props.unregisteredCourses.map(course => (
                                    <MenuItem key={`registercourse-${course._id}`} value={course._id}>{course.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = state => {
    return {
        unregisteredCourses: state.unregisteredCourses
    }
}

const mapDisptachToProps = dispatch => {
    return {
        setStudentState: (newState) => dispatch({ type: actionTypes.MODIFY_STATE, newState: newState })
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(AddCourseDialog);