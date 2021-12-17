import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import LeftBox from "./components/LeftBox";
import useStyles from '../src/styles';

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid className={classes.view} container justifyContent="center">
      <Box className={classes.root}>
        <form onSubmit={handleRegister}>
          <Grid className={classes.root} container justifyContent="center">
            <LeftBox />
            <Grid item xs={12} md={8} lg={8}>
            <Box>
                <Typography className={classes.headerText}>Already have an account?</Typography>
              </Box>
              <Box className={classes.header}>
                <Button className={classes.button} onClick={() => history.push("/login")}>Login</Button>
              </Box>
              <Box className={classes.details}>
                <Grid>
                  <Typography className={classes.createHeader} variant="h4"><strong>Create an account.</strong></Typography>
                </Grid>
                <Grid>
                  <FormControl>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl>
                    <TextField
                      label="E-mail address"
                      aria-label="e-mail address"
                      type="email"
                      name="email"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
                    <TextField
                      aria-label="password"
                      label="Password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="password"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
                    <TextField
                      label="Confirm Password"
                      aria-label="confirm password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="confirmPassword"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Box className={classes.justify}>
                  <Button className={classes.button} type="submit" variant="contained" size="large">
                    Create
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
