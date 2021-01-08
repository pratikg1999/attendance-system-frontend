import React, { Component } from 'react';
import Signup from "../../containers/signup";
import axios from "../../axiosInstance";
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography,
    Link,
    Dialog,
    DialogContent,
    DialogContentText,
} from "@material-ui/core";
import "./LoginApp.css";

class LoginApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authflag: 1,
            emailError: undefined,
            passwordError: undefined,
            internalServerError: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ email: event.state.email, password: event.state.password });
    }
    handleSubmit(event) {
        event.preventDefault();
        axios.post("/auth/signin", { email: this.state.email, password: this.state.password }).then(response => {
            if (response.status == 200) {
                localStorage.setItem("x-access-token", response.data.accessToken);
                localStorage.setItem("role", response.data.role);
                this.props.history.push(`/${response.data.role}/dashboard`);
            }
            else {
                console.log("error", response.data);
            }
        }).catch((error) => {
            console.log(error);
            if(!error.response){
                this.setState({
                    internalServerError: true,
                })
            }
            if (error.response.status == 404) {
                this.setState((prevState, props) => {
                    return {
                        emailError: "Email not registered!",
                    }
                })
            }
            else if (error.response.status === 401) {
                this.setState((prevState, props) => {
                    return { passwordError: "Invalid Password!" };
                });
            }
            else {
                this.setState({
                    internalServerError: true,
                })
            }
        })
    }

    // componentDidMount(){
    //     if(localStorage.getItem("x-access-token")){
    //         axios.get()
    //     }
    // }

    render() {
        return (
            <div>
                {/* <AppBar position="static" alignitems="center" color="primary">
                    <Toolbar>
                        <Grid container justify="center" wrap="wrap">
                            <Grid item>
                                <Typography variant="h6">{BRAND_NAME}</Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar> */}
                <Grid container spacing={0} justify="center" direction="row">
                    <Grid item>
                        <Grid container direction="column" justify="center" spacing={2} className="login-form">
                            <Paper variant="elevation" elevation={2} className="login-background">
                                <Grid container direction="row" spacing={4}>
                                    <Grid item container direction="column" xs={6}>
                                        <Grid item>
                                            <Typography component="h1" variant="h5">
                                                Sign in
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <form onSubmit={this.handleSubmit}>
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid item>
                                                        <TextField
                                                            type="email"
                                                            label="Email"
                                                            fullWidth
                                                            name="email"
                                                            variant="outlined"
                                                            value={this.state.email}
                                                            onChange={(event) =>
                                                                this.setState({
                                                                    [event.target.name]: event.target.value,
                                                                    emailError: undefined
                                                                })
                                                            }
                                                            error={this.state.emailError}
                                                            required
                                                            autoFocus
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            type="password"
                                                            label="Password"
                                                            fullWidth
                                                            name="password"
                                                            variant="outlined"
                                                            value={this.state.password}
                                                            onChange={(event) =>
                                                                this.setState({
                                                                    [event.target.name]: event.target.value,
                                                                    emailError: undefined,
                                                                })
                                                            }
                                                            error={this.state.passwordError}
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            type="submit"
                                                            className="button-block"
                                                        >Submit</Button>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">Forgot Password?</Link>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction="column" xs={6}>
                                        <Signup />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Dialog open={this.state.internalServerError} onClose={() => { this.setState({ internalServerError: false }) }}>
                    <DialogContent>
                        <DialogContentText>
                            Sorry! some error occured. Please try again
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
export default LoginApp;
