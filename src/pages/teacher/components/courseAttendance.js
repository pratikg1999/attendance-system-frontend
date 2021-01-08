import React from "react";
import { connect } from "react-redux";
import { TableContainer, Table, TableHead, TableBody, TableCell, Paper, TableRow } from "@material-ui/core";

function CourseAttendance(props) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableCell>Student</TableCell>
                    <TableCell>Attendance</TableCell>
                </TableHead>
                <TableBody>
                    {props.data && Array.isArray(props.data) && props.data.length > 0 ?
                        props.data.map(entry => (
                            <TableRow>
                                <TableCell>{entry.firstName + " " + entry.lastName}</TableCell>
                                <TableCell>{(entry.attendance * 100).toFixed(2)}</TableCell>
                            </TableRow>
                        ))
                        : null}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
const mapStateToProps = state => ({ courses: state.courses });
export default connect(mapStateToProps)(CourseAttendance);
