import { Button, FormHelperText, Grid, Paper, TextField } from "@mui/material";
import { registerUserApi } from "api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { url } from "navigation/CONSTANTS";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "validations";
// import "pages/auth/UserStyles.scss";

const RegisterForm = () => {
  const { registerSchema } = validate;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (data, { resetForm }) => {
    const { firstName, lastName, email, password } = data,
      regData = { firstName, lastName, email, password };

    try {
      const { data } = await registerUserApi(regData);
      setError("");
      setSuccess(data.message);

      success && setTimeout(navigate(url.LOGIN), 2000);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setSuccess("");
    }
  };

  return (
    <div className="form signUpForm">
      {/* Sign up Form */}
      <Formik
        onSubmit={registerUser}
        validationSchema={registerSchema}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
      >
        <Form>
          <h2>Create Account</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                name="firstName"
                fullWidth
                label="First Name"
              />
              <ErrorMessage
                component={FormHelperText}
                fullWidth
                error={true}
                size="large"
                name="firstName"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                name="lastName"
                fullWidth
                label="Last Name"
              />
              <ErrorMessage
                component={FormHelperText}
                fullWidth
                error={true}
                size="large"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Field
                as={TextField}
                name="email"
                fullWidth
                label="Email"
                type="email"
              />
              <ErrorMessage
                component={FormHelperText}
                fullWidth
                error={true}
                size="large"
                name="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                name="password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                name="confirmPassword"
                fullWidth
                label="Confirm Password"
                type="password"
              />
              <ErrorMessage
                component={FormHelperText}
                fullWidth
                error={true}
                size="large"
                name="confirmPassword"
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
              Submit
            </Button>
          </Grid>
        </Form>
      </Formik>
      <Paper sx={{ color: "green", margin: "10px 0" }}>{success}</Paper>
      <Paper sx={{ color: "red", margin: "1rem 1.5rem" }}>{error}</Paper>
    </div>
  );
};

export default RegisterForm;
