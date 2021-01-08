import React, { useState } from "react";
import { connect } from "react-redux";
import { TableContainer, Table, TableHead, TableBody, TableCell, Paper, TableRow, Button, TextField, IconButton, TableFooter } from "@material-ui/core";
import { Edit as EditIcon, Add as AddIcon } from "@material-ui/icons"
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { NavLink } from "react-router-dom";
import * as actionTypes from '../../../store/teacher/actions';
import axios from "../../../axiosInstance"
function AllClassesTable(props) {
    const [dateTime, setDateTime] = useState(new Date().toISOString());
    const [topicName, setTopicName] = useState("");
    const scheduleClass = async () => {
        let scheduledDate = new Date(dateTime);
        try {
            props.setTeacherState({ isLoading: true });
            await axios.post("/class", {
                courseId: props.course._id,
                topic: topicName,
                hour: scheduledDate.getHours(),
                minute: scheduledDate.getMinutes(),
                date: scheduledDate.getDate(),
                month: scheduledDate.getMonth(),
                year: scheduledDate.getFullYear()
            });
            const res = await axios.get('/teacher/myCourses');
            props.setTeacherState({ courses: res.data.courses, isLoading: false, showSnackbar: true, snackbarMessage: "Course added successfully" });
        }
        catch (error) {
            props.setTeacherState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured" })
        }
        setDateTime(new Date().toISOString());
        setTopicName("");
    }
    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableCell>Time</TableCell>
                            <TableCell>Topic</TableCell>
                            <TableCell>Attendance</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableHead>
                        <TableBody>

                            {props.data && Array.isArray(props.data) && props.data.length > 0 ?
                                props.data.map(entry => (
                                    <TableRow>
                                        <TableCell>{new Date(entry.time) < new Date() ? new Date(entry.time).toLocaleString() : "Upcoming"}</TableCell>
                                        <TableCell>{entry.topic}</TableCell>
                                        <TableCell>{(entry.averageAttendance * 100).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <IconButton title="Edit Attendance" color="primary" component={NavLink} to={`${props.location.pathname}/classes/${entry._id}`}><EditIcon /></IconButton></TableCell>
                                    </TableRow>
                                ))
                                : null}
                        </TableBody>
                        <TableFooter>

                            <TableRow>
                                <TableCell>
                                    <DateTimePicker
                                        variant="inline"
                                        label="Choose slot"
                                        value={dateTime}
                                        onChange={(date) => setDateTime(date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField value={topicName} onChange={(evt) => setTopicName(evt.target.value)} label="Topic Name" />
                                </TableCell>
                                <TableCell>
                                    {new Date(dateTime) > new Date() ? "Upcoming" : 0}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                        onClick={scheduleClass}
                                    >
                                        Schedule
                            </Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </MuiPickersUtilsProvider>
        </>
    )
}
const mapStateToProps = state => ({ courses: state.courses });
const mapDisptachToProps = dispatch => {
    return {
        setTeacherState: (newState) => dispatch({ type: actionTypes.MODIFY_STATE, newState: newState })
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(AllClassesTable);
