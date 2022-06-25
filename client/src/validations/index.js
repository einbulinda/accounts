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
    firstName: Yup.string()
      .min(2, "Please enter a name more than 2 characters")
      .required("First name is Required"),
    lastName: Yup.string()
      .min(2, "Please enter a name more than 2 characters")
      .required("Last name is Required"),
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

  profileSchema: Yup.object().shape({
    companyName: Yup.string()
      .min(2, "Please enter a name more than 2 characters")
      .required("Enter Company Name"),
    kraPin: Yup.string()
      .length(11, "PIN should be 11 characters, first and last being alphabet")
      .required("Enter KRA PIN"),
    companyType: Yup.string().required("Please select company type"),
    yearEnd: Yup.string().required("Please select the year end"),
    totalShares: Yup.number()
      .positive()
      .required("Enter total number of shares"),
    paidShares: Yup.number().positive().required("Enter number of paid shares"),
    nominalValue: Yup.number()
      .positive()
      .required("Enter the nominal value per share"),
  }),
};
