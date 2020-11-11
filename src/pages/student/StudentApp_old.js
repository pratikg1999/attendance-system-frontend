import React, { Component, createRef } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/Toolbar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import StudentDashboard from "./StudentDashboard";
import { Switch, Route, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

function StudentApp(props){
    const classes = useStyles();
        // let { path, url } = useRouteMatch();
        console.log(props.match)
        return (
            <>
                <div className={classes.root}>

                    <AppBar position="static">

                        <Toolbar variant="dense">
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6"
                            className={classes.title}
                            >
                                News
          </Typography>
                            <Button color="inherit">Login</Button>
                            <Button>Temp</Button>
                        </Toolbar>
                    </AppBar>
                </div>
                {/* <AppBar position="static">
                    <Toolbar>
                        <IconButton>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar> */}
                {"student app"}
                {/* <BrowserRouter> */}
                <Switch>
                    <Route path={`${props.match.path}/dashboard`} exact component={StudentDashboard} />
                </Switch>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
                {/* </BrowserRouter> */}
            </>
        );
    }


export default withRouter(StudentApp);
