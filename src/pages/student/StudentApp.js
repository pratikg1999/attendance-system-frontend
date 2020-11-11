import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles, withTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import { CollectionsBookmark as CollectionsBookmarkIcon, ExpandLess, ExpandMore, Mail as MailIcon, Inbox as InboxIcon, StarBorder, Dashboard as DashboardIcon, Class as ClassIcon } from "@material-ui/icons";
import StudentDashboard from "./StudentDashboard"
import Collapse from '@material-ui/core/Collapse';
import { Switch, Route, NavLink } from "react-router-dom";
import { render } from '@testing-library/react';

import * as actionTypes from '../../store/student/actions';
import { connect } from 'react-redux';
const drawerWidth = 240;

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }
};

class MiniDrawer extends React.Component {
  componentDidMount(){
    const subjects = {
      english: {
        absent: 10,
        present: 90,
      },
      "digital marketing": {
        absent: 10,
        present: 90,
      },
      "acn": {
        absent: 10,
        present: 90,
      },
    }
    for (let sub in subjects){
      subjects[sub]["attendance"] = [{label:"presnt", value:subjects[sub]["present"]/(subjects[sub]["present"] + subjects[sub]["absent"])}, {label:"absent", value:subjects[sub]["absent"]/(subjects[sub]["present"] + subjects[sub]["absent"])}];
    }
    this.props.setStudentState({name:"Pratik", batch:"BTech 2021 CSE", subjects:subjects});
  }

  state = {
    subListExpanded: false,
    open: false,
  }

  setOpen = (newOpen) => {
    this.setState((prevState, props) => {
      return {
        open: newOpen,
      }
    })
  }
  handleDrawerOpen = () => {
    console.log("opening")
    this.setOpen(true);
  };

  handleDrawerClose = () => {
    this.setOpen(false);
  };

  handleSubListClick = () => {
    this.setState(prevState => {
      return {
        subListExpanded: !prevState.subListExpanded
      }
    });
  }
  render() {
    const { classes } = this.props;
    // console.log(this.props.theme);
    // console.log(this.props.theme.breakpoints.up('sm'));
    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Mini variant drawer
          </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {this.props.theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button selected={this.props.location.pathname === this.props.match.path + "/dashboard"} component={NavLink} to={`${this.props.match.path}/dashboard`}>
                {/* Note that the prop "to" above is passed to "component" ie. NavLink element  */}
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
            
            {(this.props.subjects && Object.keys(this.props.subjects).length>0) ? 
            <>
            <Divider />
            <List>
              <ListItem button onClick={this.handleSubListClick}>
                <ListItemIcon>
                  <CollectionsBookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="My classes" />
                {this.state.subListExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.subListExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {Object.keys(this.props.subjects).map((sub, ind)=>(
                  <ListItem button key={sub} className={classes.nested} selected={this.props.location.pathname === this.props.match.path + "/classes/" + sub.toLowerCase()} component={NavLink} to={`${this.props.match.path}/classes/${sub.toLowerCase()}`}>
                    <ListItemIcon><ClassIcon /></ListItemIcon>
                  <ListItemText primary={sub.charAt(0).toUpperCase() + sub.slice(1).toLowerCase()} />
                </ListItem>
                ))}
                </List>
              </Collapse>
            </List>
            </>
            : null}
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route path={`${this.props.match.path}/dashboard`} exact component={StudentDashboard} />
            <Typography paragraph>
              First line
          </Typography>
          </main>
        </div>
      </>
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

const mapDisptachToProps = dispatch => {
  return{
    setStudentState: (newState)=>dispatch({type:actionTypes.MODIFY_STATE, newState: newState})
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(withTheme(withStyles(styles, { withTheme: true })(MiniDrawer)));