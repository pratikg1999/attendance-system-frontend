import React from "react";
import { Grid, Typography, TableContainer, Table, TableHead, TableBody, TableCell, Paper } from "@material-ui/core";
import * as actionTypes from "../../store/student/actions"
import CourseInfo from "../../components/courseInfo"


import { connect } from "react-redux"
function Classes(props) {
    const subid = props.location.pathname.split('/').slice(-1)[0];
    let courses = props.courses || [];
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
                <CourseInfo course={course} student />
            </Grid>
            {/* <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableCell>Student</TableCell>
                            <TableCell>Attendance</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableCell>Hello</TableCell>
                            <TableCell>Hello</TableCell>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid> */}
        </Grid>
    )
}

const mapStateToProps = state => ({ courses: state.courses });
const mapDisptachToProps = dispatch => {
    return {
        setTeacherState: (newState) => dispatch({ type: actionTypes.MODIFY_STATE, newState: newState })
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(Classes);