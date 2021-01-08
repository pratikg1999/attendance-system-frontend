import React from "react";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"

import { Grid, Typography, Paper } from "@material-ui/core";

export default function AllCourseAttendance(props) {
    const courses = props.courses || [];
    return (
        <>
            {
                courses.length > 0 &&
                <Paper>
                    <Grid container spacing={2} className="text-center">

                        <Grid item xs={12}><Typography variant="h5">All classes attendance</Typography></Grid>
                        {courses.map((course, index) => {
                            const attendance = props.student ? course.attendance : course.averageAttendance;
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} title={(attendance * 100).toFixed(2) + "%"}>
                            <CircularProgressbar circleRatio={0.5}
                                styles={{
                                    root: { height: "200px" },
                                    path: { transform: "rotate(0.75turn)", transformOrigin: 'center center' },
                                    trail: { transform: 'rotate(0.75turn)', transformOrigin: 'center center' },
                                    text: { fontSize: "0.8em" }
                                }}
                                value={attendance} maxValue={1}
                                text={(attendance * 100).toFixed(2) + "%"}
                            />
                            <div style={{ marginTop: "-80px", textAlign: "center", fontSize: "1.2em" }} variant="subtitle">{course.name}</div>
                        </Grid>
                            );
                        })}

                    </Grid>
                </Paper>
            }
        </>
    )
}