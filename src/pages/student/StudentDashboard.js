import { Grid, Paper, ThemeProvider, Typography, withStyles, Fab } from '@material-ui/core';
import { Add as AddIcon } from "@material-ui/icons"
import React, { Component } from 'react';
import AddCourseDialog from "./components/AddCourseDialog"
import AllAttendance from "../../components/allAttendance";
import { RadarChart, PolarGrid, PolarRadiusAxis, PolarAngleAxis, Radar, PieChart, Pie, RadialBar, RadialBarChart } from "recharts";
import { connect } from "react-redux";


const styles = (theme) => {
  return {
    padded: {
      padding: theme.spacing(4),
    },
    alignCenter: {
      textAlign: "center",
      justifyContent: "space-evenly",
    }
  }
};

const data = [
  {
    subject: 'Math', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'Chinese', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'English', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'Geography', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'Physics', A: 85, B: 90, fullMark: 150,
  },
  {
    subject: 'History', A: 65, B: 85, fullMark: 150,
  },
  {
    subject: 'CSE', A: 65, B: 85, fullMark: 150,
  },
];

const attendace = [
  { name: "present", value: 90 },
  // { name: "absent", value: 10 }
]



class StudentDashboard extends Component {
  state = {
    isAddCourseDialogOpen: false,
  }
  handleAddCourseDialogClose = () => {
    this.setState({ isAddCourseDialogOpen: false });
  }
  showAddCourseDialog = () => {
    this.setState({ isAddCourseDialogOpen: true });
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.isAddCourseDialogOpen && <AddCourseDialog handleClose={this.handleAddCourseDialogClose} isOpen={this.state.isAddCourseDialogOpen} courses={this.props.unregisteredCourses} />}

        <Fab variant="extended" style={{ position: "fixed", bottom: "1em", right: "1em" }} color="primary" onClick={this.showAddCourseDialog}>
          <AddIcon className="px-1" />
          Add Course
        </Fab>


        <Grid container justify="space-evenly" spacing={3}>

          {/* <Grid item xs={12}>
            <Typography variant="h4" display="inline" component="h4">Welcome, </Typography>
            <Typography variant="h3" display="inline" component="h3">{this.props.name}</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Paper className={classes.padded}>
              <Typography variant="h5" component="div">Overall performance:</Typography>
              <div className={classes.alignCenter}>

                <div style={{ display: "inline-block" }}>
                  <RadarChart cx={250} cy={250} outerRadius={150} width={500} height={500} data={this.props.courses}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar name="Mike" dataKey="attendance" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </div>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <AllAttendance courses={this.props.courses} student />
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
    batch: state.batch,
    subjects: state.subjects,
    courses: state.courses,
    unregisteredCourses: state.unregisteredCourses,
  }
}


export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(StudentDashboard));
