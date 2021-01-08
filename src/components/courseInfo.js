import React from "react";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { Grid, Typography, Paper } from "@material-ui/core";

export default function CourseInfo(props) {
    const course = props.course || {};
    let attendance = props.student ? course.attendance : course.averageAttendance;

    return (
        <Paper>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Typography variant="h5">Course Info:</Typography>
                </Grid>
                <Grid item xs={12} sm={6} title={(attendance * 100).toFixed(3) + "%"}>
                    <div>
                        <CircularProgressbar
                            styles={{
                                root: { height: "150px" },
                                path: { stroke: `rgba(62, 152, 199)`, strokeLinecap: 'butt' },
                                text: { fontSize: "0.8em" }
                            }}
                            value={attendance ? attendance : 0}
                            text={attendance ? (attendance * 100).toFixed(2) + "%" : 0 + "%"}
                            maxValue={1}
                        />
                        <div style={{ textAlign: "center", fontSize: "1.2em" }} >Attendance</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} className="text-left" style={{ fontSize: "1.3em" }}>
                    <table cellPadding="10px">
                        <tr>
                            <th>Course Name:</th><td>{course.name}</td>
                        </tr>
                        <tr>
                            <th>Year</th><td>{course.year}</td>
                        </tr>
                        <tr>
                            <th>Semester</th><td>{course.semester}</td>
                        </tr>
                    </table>
                </Grid>
            </Grid>
        </Paper>
    )
}