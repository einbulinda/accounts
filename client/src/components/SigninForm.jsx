import { Button, FormHelperText, Grid, Paper, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { validate } from "validations";
import "pages/auth/UserStyles.scss";
import { useDispatch } from "react-redux";
import { signinUserApi } from "api";
import { loginUser } from "redux/slices/authSlice";

const SigninForm = () => {
  const { signInSchema } = validate;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const userSignIn = async (credentials, { resetForm }) => {
    try {
      const { data } = await signinUserApi(credentials);
      dispatch(loginUser(data));
    } catch (error) {
      console.log(error.message);
      setSuccess("");
      setError(error.message);
    }
  };

  return (
    <div className="form signInForm">
      <Formik
        onSubmit={userSignIn}
        validationSchema={signInSchema}
        initialValues={{ email: "", password: "" }}
      >
        <Form>
          <h2>Sign In</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Field
                as={TextField}
                name="email"
                fullWidth
                type="email"
                label="Email"
              />
              <ErrorMessage
                component={FormHelperText}
                fullWidth
                error={true}
                size="large"
                name="username"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Field
                as={TextField}
                name="password"
                fullWidth
                label="Password"
                type="password"
              />
              <ErrorMessage
                component={FormHelperText}
                fullWidth
                error={true}
                size="large"
                name="secret  "
              />
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{
                margin: "1em auto",
                borderRadius: "1.2em",
                padding: "1em 3.5em",
                backgroundColor: "#097969",
                ":hover": {
                  backgroundColor: "#09ceb0",
                  color: "#030303",
                },
              }}
            >
              Login
            </Button>
          </Grid>
        </Form>
      </Formik>

      <Paper sx={{ color: "green", margin: "10px 0" }}>{success}</Paper>
      <Paper sx={{ color: "red", margin: "1rem 1.5rem" }}>{error}</Paper>
    </div>
  );
};

export default SigninForm;
