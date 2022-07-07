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

  // Company Profile
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
  accountSchema: Yup.object().shape({
    accountName: Yup.string().required("Account name is required"),
    showMain: Yup.boolean(),
    mainAccount: Yup.string().when("showMain", {
      is: true,
      then: Yup.string().required(
        "Please select Main Account"
      ) /*Chack conditional Validation based on checkbox selection*/,
    }),
    category: Yup.string().required("Account category is required"),
  }),

  // VAT Records
  vatSchema: Yup.object().shape({
    companyId: Yup.string().required("Select Company"),
    year: Yup.number()
      .positive()
      .min(2015, "Cannot be a year before 2015")
      .required("Enter VAT year."),
    month: Yup.string().required("Select VAT month"),
    genSales: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Sales @ 16% required"),
    reducedSales: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Sales @ 12% required"),
    zeroSales: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Sales @ 0% required"),
    exemptSales: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Exempt sames required"),
    genPurchase: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Purchases @ 16% required"),
    reducedPurchases: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Purchases @ 12% required"),
    exemptPurchases: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Purchases @ 0% required"),
    zeroPurchases: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Exempt purchases required"),
  }),
  salariesSchema: Yup.object().shape({
    companyId: Yup.string().required("Select Company"),
    year: Yup.number()
      .positive()
      .min(2015, "Cannot be a year before 2015")
      .required("Enter year of income."),
    jan: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    feb: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    mar: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    apr: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    may: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    jun: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    jul: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    aug: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    sep: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    oct: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    nov: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
    dec: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
  }),
  expenseSchema: Yup.object().shape({
    companyId: Yup.string().required("Select Company"),
    year: Yup.number()
      .positive()
      .min(2015, "Cannot be a year before 2015")
      .required("Enter year of income."),
    accountId: Yup.string().required("Select an expense account"),
    amount: Yup.number()
      .min(0, "Cannot be a negative number")
      .required("Enter a numeric value"),
  }),
};
