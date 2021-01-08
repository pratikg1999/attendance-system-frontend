import React from "react";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { Grid, Typography, Paper } from "@material-ui/core";

export default function CourseInfo(props) {
    const course = props.course || {};
    const currentClass = props.currentClass || {};

    return (

        <Paper>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Typography variant="h5">Class Info:</Typography>
                </Grid>
                <Grid item xs={12} sm={6} title={(currentClass.averageAttendance * 100).toFixed(3) + "%"}>
                    <div>
                        <CircularProgressbar
                            styles={{
                                root: { height: "150px" },
                                path: { stroke: `rgba(62, 152, 199, ${course.averageAttendance})`, strokeLinecap: 'butt' },

                                text: { fontSize: "0.8em" }
                            }}
                            value={currentClass.averageAttendance || 0}
                            text={currentClass.averageAttendance ? (currentClass.averageAttendance * 100).toFixed(2) + "%" : 0 + "%"}
                            maxValue={1}
                        />
                        <div style={{ textAlign: "center", fontSize: "1.2em" }} >Attendance</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} className="text-left" style={{ fontSize: "1.3em" }}>
                    <table cellPadding="10px">
                        <tr>
                            <th>Topic:</th><td>{currentClass.topic}</td><th>Course Name:</th><td>{course.name}</td>
                        </tr>
                        <tr>
                            <th>Year</th><td>{course.year}</td><th>Semester</th><td>{course.semester}</td>
                        </tr>
                        <tr>
                            <th>Time</th><td colSpan={3}>{currentClass.time && new Date() > new Date(currentClass.time) ? new Date(currentClass.time).toString().split('GMT')[0] : "Upcoming"}</td>
                        </tr>
                    </table>
                </Grid>
            </Grid>
        </Paper>
    )
}