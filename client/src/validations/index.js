import * as Yup from "yup";

export const validate = {
  signInSchema: Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email.")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .required("Enter your password to login.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  }),

  registerSchema: Yup.object().shape({
    firstName: Yup.string().min(2).required("First name is Required"),
    lastName: Yup.string().min(2).required("Last name is Required"),
    email: Yup.string()
      .email("Please enter a valid email.")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Confirmation password invalid"
    ),
  }),
};
