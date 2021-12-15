import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import LeftBox from "./components/LeftBox";
import useStyles from '../src/styles';

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid className={classes.view} container justifyContent="center">
      <Box className={classes.root}>
        <form onSubmit={handleLogin}>
          <Grid className={classes.root} container justifyContent="center">
            <LeftBox />
            <Grid item xs={12} md={8} lg={8}>
              <Grid container item>
                <Grid container>
                  <Grid item xs={6} md={6} lg={6}>
                    <Typography className={classes.header}>Don't have an account?</Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <Button className={`${classes.header} ${classes.button}`} onClick={() => history.push("/register")}>Create Account</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Box className={classes.details}>
                <Grid>
                  <Typography className={classes.loginHeader} variant="h4"><strong>Welcome Back!</strong></Typography>
                </Grid>
                <Grid>
                  <FormControl margin="normal" required>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl margin="normal" required>
                    <TextField
                      label="Password"
                      aria-label="password"
                      type="password"
                      name="password"
                      InputProps={{
                        endAdornment: <Button className={`${classes.button}`} onClick={() => history.push("/forgot")}>Forgot?</Button>
                      }}
                    />
                  </FormControl>
                </Grid>
                <Box className={classes.justify}>
                  <Button className={classes.button} type="submit" variant="contained" size="large">
                    Login
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid >
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
