import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";

import validator from "./validator";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { signInRequest } from "../../../store/modules/auth/actions";

import { Form } from "@unform/web";
import Input from "../../../Components/Input";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Easy Mechanincs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const form = useRef();

  async function submit(data) {
    form.current.setErrors({});
    try {
      await validator(data);

      const { email, password } = data;

      dispatch(signInRequest(email, password));
    } catch (error) {
      const validationErrors = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        form.current.setErrors(validationErrors);
      } else {
        toast.error("Se ha producido un error, inténtelo de nuevo más tarde.");
      }
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Form
            className={classes.form}
            noValidate
            ref={form}
            onSubmit={submit}
          >
            <Input
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Input
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>

            <Box mt={5}>
              <Copyright />
            </Box>
          </Form>
        </div>
      </Grid>
    </Grid>
  );
}
