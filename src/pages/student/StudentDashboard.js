import { Grid, Paper, ThemeProvider, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
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
  render() {
    const { classes } = this.props;
    console.log(this.props.subjects);
    return (
      <div className="student-dashboard">
        <div>
          <Typography variant="h4" display="inline" component="h4">Welcome, </Typography>
          <Typography variant="h3" display="inline" component="h3">{this.props.name}</Typography>
        </div>
        <Grid container justify="space-evenly" spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.padded}>
              <Typography variant="h5" component="div">Overall performance:</Typography>
              <div className={classes.alignCenter}>

                <div style={{ display: "inline-block" }}>
                  <RadarChart cx={250} cy={250} outerRadius={150} width={500} height={500} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </div>
              </div>
            </Paper>
          </Grid>

          {(this.props.subjects && Object.keys(this.props.subjects).length > 0) ?
            <Paper className={classes.padded}>
              <Typography variant="h5" component="div">Overall performance:</Typography>
              <Grid container item xs={12} justify="space-evenly">
                {Object.keys(this.props.subjects).map((sub, ind) => (
                  <Grid item xs={12} sm={6} lg={4} key={sub}>
                    <PieChart width={730} height={250}>
                      <Pie data={this.props.subjects[sub]["attendance"]} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" />
                      <text x="50%" y="50%" dy={8} textAnchor="middle">temp</text>
                    </PieChart>
                    <Typography variant="h6" component="div">sub</Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
            :
            null
          }

          <PieChart width={400} height={400}>
            <Pie data={attendace} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" />
            <text x="50%" y="50%" dy={8} textAnchor="middle">temp</text>
          </PieChart>
          <RadialBarChart width={500} height={500} cx="50%" cy="50%" innerRadius={200} outerRadius={300} barSize={50} data={attendace}>
            <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="value" />
            <text x="50%" y="50%" dy={8} textAnchor="middle">temp</text>
            {/* <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
          </RadialBarChart>
        </Grid>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
    batch: state.batch,
    subjects: state.subjects,
  }
}


export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(StudentDashboard));
