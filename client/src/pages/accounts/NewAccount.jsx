import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { CustomLink } from "components/CustomLink";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DashboardHeader from "components/DashboardHeader";
import AppLayout from "layout/AppLayout";
import { url } from "navigation/CONSTANTS";
import React, { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "validations";
import { useFormik } from "formik";
import FormButtons from "components/FormButtons";
import { createAccountApi, fetchAccountTypes, fetchMainAccounts } from "api";
import {
  allAccounts,
  allCategories,
  createAccount,
} from "redux/slices/accountSlice";

const mapState = ({ auth, accounts }) => ({
  user: auth.auth.user,
  categories: accounts.categories,
  accounts: accounts.accounts,
});

const NewAccount = () => {
  const { user, categories, accounts } = useSelector(mapState);

  const [main, setMain] = useState(false);
  const { accountSchema } = validate;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      accountName: "",
      mainAccount: "",
      category: "",
    },
    validationSchema: accountSchema,
    onSubmit: async (info, { resetForm }) => {
      info.userId = user.id;

      try {
        const { data } = await createAccountApi(info);
        dispatch(createAccount(data));
        resetForm();
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const sameCategory = accounts.filter(
    (value) => value.category === formik.values.category
  );

  const getCategories = async () => {
    try {
      const { data } = await fetchAccountTypes();
      dispatch(allCategories(data.category));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAccounts = async () => {
    try {
      const { data } = await fetchMainAccounts();
      dispatch(allAccounts(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategories();
    getAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <DashboardHeader
        title="Create New Account"
        icon={AccountTreeIcon}
        button={
          <CustomLink path={url.ACCOUNTS}>
            <Button variant="contained" color="error" sx={{ px: "2rem" }}>
              Chart of Accounts
            </Button>
          </CustomLink>
        }
      />
      <Paper elevation={4} sx={{ p: 2, mt: 2 }}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ flexGrow: 1, width: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                id="accountName"
                name="accountName"
                label="Account Name"
                placeholder="Sales"
                value={formik.values.accountName}
                onChange={formik.handleChange}
                error={
                  formik.touched.accountName &&
                  Boolean(formik.errors.accountName)
                }
                helperText={
                  formik.touched.accountName && formik.errors.accountName
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                id="category"
                name="category"
                select
                label="Account Name"
                placeholder="Sales"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
              >
                {categories.map((category) => {
                  const { id, name } = category;
                  return (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item sm={6} xs={4}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={main}
                      onChange={(e) => setMain(e.target.checked)}
                    />
                  }
                  label="Set this account as a sub type?"
                />
              </FormGroup>
            </Grid>
            <Grid item sm={6} xs={8}>
              {main && (
                <Fragment>
                  {accounts.length > 0 ? (
                    <TextField
                      fullWidth
                      id="mainAccount"
                      name="mainAccount"
                      label="Main Account"
                      placeholder="Income"
                      select
                      value={formik.values.mainAccount}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.mainAccount &&
                        Boolean(formik.errors.mainAccount)
                      }
                      helperText={
                        formik.touched.mainAccount && formik.errors.mainAccount
                      }
                    >
                      {sameCategory.map((item) => {
                        const { id, accountName } = item;

                        return (
                          // Only have main accounts of same type as sub account
                          <MenuItem key={id} value={id}>
                            {accountName}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  ) : (
                    <div>Create a main account first</div>
                  )}
                </Fragment>
              )}
            </Grid>
          </Grid>
          <FormButtons />
        </Box>
      </Paper>
    </AppLayout>
  );
};

export default NewAccount;
