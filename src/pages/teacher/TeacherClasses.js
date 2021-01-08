import React, { Component } from "react";
import { Grid, Select, MenuItem, Typography, Button, TableContainer, TableRow, Table, TableHead, TableBody, TableCell, Paper, TextField } from "@material-ui/core";
import { CloudUpload as CloudUploadIcon } from "@material-ui/icons";
import ClassInfo from "../../components/classInfo";
import * as actionTypes from "../../store/teacher/actions";

import { connect } from "react-redux";
import axios from "../../axiosInstance";

function stripTrailingSlash(site) {
    return site.replace(/\/+$/, "");
}

const promisifiedWait = function (seconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(
            function () {
                resolve();
            }, seconds * 1000)
    });
}

class TeacherClasses extends Component {
    state = {
        classAttendance: [],
        selectedImage: "",
        selectedFileValue: "",
        selectedFile: "",
        selectPresentDropdownValue: ""
    }
    componentDidMount() {
        const url = stripTrailingSlash(this.props.location.pathname);
        const classid = url.split('/').slice(-1)[0];
        this.props.setTeacherState({ isLoading: true });
        axios.get('/class/studentsAttendance?classId=' + classid).then(({ data }) => {
            this.setState({ classAttendance: data });
            this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Class loaded successfully" })
        }).catch(err => this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured" }));
    }
    componentDidUpdate(prevProps, prevState) {
        const prevurl = stripTrailingSlash(prevProps.location.pathname);
        const oldClassid = prevurl.split('/').slice(-1)[0];
        const url = stripTrailingSlash(this.props.location.pathname);
        const classid = url.split('/').slice(-1)[0];

        if (oldClassid !== classid) {
            this.props.setTeacherState({ isLoading: true });
            axios.get('/class/studentsAttendance?classId=' + classid).then(({ data }) => {
                this.setState({ classAttendance: data });
                this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Class loaded successfully" })
            }).catch(err => this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured" }));
        }

    }
    handleUploadSubmit = async (evt) => {
        evt.preventDefault();
        const url = stripTrailingSlash(this.props.location.pathname);
        const classid = url.split('/').slice(-1)[0];
        const formData = new FormData();
        formData.append("myImage", this.state.selectedFile);
        formData.append("classId", classid);
        try {
            this.props.setTeacherState({ isLoading: true });
            await axios.post('/attendance/takeAttendanceFromImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { data } = await axios.get('/class/studentsAttendance?classId=' + classid);
            this.setState({ classAttendance: data });
            const res = await axios.get('/teacher/myCourses');
            this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Uploaded successfully", courses: res.data.courses });
        }
        catch (error) {
            this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured" })

        }
        finally {
        }
    }

    changeAttendance = async (evt, currentAttendanceData) => {
        const url = stripTrailingSlash(this.props.location.pathname);
        const classid = url.split('/').slice(-1)[0];
        try {
            this.props.setTeacherState({ isLoading: true });
            await axios.post('/attendance/addOrUpdate', {
                classId: classid,
                studentId: currentAttendanceData._id,
                isPresent: evt.target.value
            });

            const { data } = await axios.get('/class/studentsAttendance?classId=' + classid);
            this.setState({ classAttendance: data });
            await promisifiedWait(1);
            const res = await axios.get('/teacher/myCourses');
            this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Attendance updated successfully", courses: res.data.courses });
        } catch (error) {
            this.props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured" })

        }

    }
    handleInputImage = (evt) => {
        const val = evt.target.value;
        const file = evt.target.files[0];
        let image;
        const fr = new FileReader();
        fr.readAsDataURL(file)
        fr.onload = () => this.setState({ selectedFileValue: val, selectedImage: fr.result, selectedFile: file })

    }
    render() {
        const url = stripTrailingSlash(this.props.location.pathname);
        const classid = url.split('/').slice(-1)[0];
        let courses = this.props.courses || [];
        let currentClass = undefined;
        let currentCourse = undefined;
        for (let i = 0; i < courses.length; i++) {
            const courseT = courses[i];
            if (currentClass) break;
            for (let j = 0; j < courseT.classes.length; j++) {
                const classT = courseT.classes[j];
                if (classT._id === classid) {
                    currentClass = { ...classT };
                    currentCourse = { ...courseT };
                    break;
                }
            }
        }
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} className="text-center">
                    <ClassInfo currentClass={currentClass} course={currentCourse} />
                </Grid>
                <Grid item xs={12} md={5}>
                    {Array.isArray(this.state.classAttendance) && this.state.classAttendance.length > 0 &&
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Attendance</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.classAttendance.map(data => (
                                        <TableRow>
                                            <TableCell>{data.firstName}</TableCell>
                                            <TableCell>{data.lastName}</TableCell>
                                            <TableCell className={data.isPresent ? "text-success" : "text-danger"}>{data.isPresent ? "Present" : "Absent"}</TableCell>
                                            <TableCell><Select
                                                className={data.isPresent ? "text-success" : "text-danger"}
                                                id="attendance-Select"
                                                onChange={(evt) => this.changeAttendance(evt, data)}
                                                defaultValue={data.isPresent}
                                                label="Attendance"
                                            >
                                                <MenuItem className="text-success" value={true}>Present</MenuItem>
                                                <MenuItem className="text-danger" value={false}>Absent</MenuItem>
                                            </Select></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Grid>
                <Grid item xs={12} md={7} className="text-center">
                    <form onSubmit={this.handleUploadSubmit} >
                        <div className="d-flex justify-content-around align-items-center">
                            <TextField className="overflow-hidden py-1" variant="outlined" type="file" onChange={this.handleInputImage} />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<CloudUploadIcon />}
                            > Upload</Button>
                        </div>
                    </form>
                    <br />
                    <img src={this.state.selectedImage} style={{ height: "auto", maxWidth: "90%", width: "auto", maxHeight: "350px" }} />
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
export default connect(mapStateToProps, mapDisptachToProps)(TeacherClasses);