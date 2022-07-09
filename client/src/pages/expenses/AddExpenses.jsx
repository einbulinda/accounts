import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { CustomLink } from "components/CustomLink";
import DashboardHeader from "components/DashboardHeader";
import MoneyIcon from "@mui/icons-material/Money";
import AppLayout from "layout/AppLayout";
import { url } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import FlexBox from "components/FlexBox";
import { H3, Small } from "components/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  createExpenseApi,
  fetchAllExpensesApi,
  fetchAllProfilesApi,
  fetchMainAccounts,
} from "api";
import { fetchProfiles } from "redux/slices/profileSlice";
import { allAccounts } from "redux/slices/accountSlice";
import { validate } from "validations";
import { createExpense, fetchExpenses } from "redux/slices/expenseSlice";

const mapState = ({ auth, profile, accounts, expenses }) => ({
  user: auth.auth.user,
  accounts: accounts.accounts,
  profiles: profile.profiles,
  expenses: expenses.expenses,
});

const AddExpenses = () => {
  const { profiles, user, accounts, expenses } = useSelector(mapState);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { expenseSchema } = validate;
  const expenseAccounts = accounts.filter((value) => value.category >= 12);

  const formik = useFormik({
    initialValues: {
      companyId: "",
      year: new Date().getFullYear() - 1,
      accountId: "",
      amount: 0,
    },
    validationSchema: expenseSchema,
    onSubmit: async (expense, { resetForm }) => {
      expense.userId = user.id;
      try {
        const { data } = await createExpenseApi(expense);
        dispatch(createExpense(data));
        getExpenses();
      } catch (error) {
        console.log(error.message);
      }
      resetForm();
    },
  });

  const companyExpenses = expenses.filter(
    (value) => value.companyId === formik.values.companyId
  );

  const getProfiles = async () => {
    try {
      const { data } = await fetchAllProfilesApi();
      dispatch(fetchProfiles(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAccounts = async () => {
    try {
      const { data } = await fetchMainAccounts();
      dispatch(allAccounts(data.response));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getExpenses = async () => {
    try {
      const { data } = await fetchAllExpensesApi();
      dispatch(fetchExpenses(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProfiles();
    getAccounts();
    getExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Table Columns
  const columns = [
    { id: "expenseId", label: "Expense", minWidth: 170 },
    { id: "companyId", label: "Company", minWidth: 170 },
    { id: "year", label: "year", minWidth: 170 },
    {
      id: "amount",
      label: "Amount",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const changeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <AppLayout>
      <DashboardHeader
        title="Add Expenses"
        icon={MoneyIcon}
        button={
          <CustomLink path={url.ALL_PAYE}>
            <Button variant="contained" color="primary" sx={{ px: "2rem" }}>
              Expenses Summary
            </Button>
          </CustomLink>
        }
      />

      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ flexGrow: 1, width: 1 }}
        >
          <FlexBox sx={{ justifyContent: "center" }}>
            <Small color="error.600">
              {!profiles.length > 0 &&
                "Please create a company profile first before proceeding."}
            </Small>
          </FlexBox>
          <FlexBox sx={{ justifyContent: "center", m: 2 }}>
            <H3 color="grey.600" sx={{ textTransform: "uppercase" }}>
              Select Profile
            </H3>
          </FlexBox>
          <Grid container spacing={2}>
            <Grid item md={2} />
            <Grid item md={6} xs={12}>
              <TextField
                id="companyId"
                name="companyId"
                label="Company Name"
                fullWidth
                variant="filled"
                select
                value={formik.values.companyId}
                onChange={formik.handleChange}
                error={
                  formik.touched.companyId && Boolean(formik.errors.companyId)
                }
                helperText={formik.touched.companyId && formik.errors.companyId}
              >
                {profiles.map((company) => {
                  const { id, companyName } = company;
                  return (
                    <MenuItem value={id} key={id}>
                      {companyName}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="year"
                name="year"
                label="Year"
                variant="filled"
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 2015, max: 2099 } }}
                value={formik.values.year}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
              />
            </Grid>
            <Grid item md={2} />
          </Grid>
          <FlexBox sx={{ justifyContent: "center", m: 2 }}>
            <H3 color="grey.600" sx={{ textTransform: "uppercase" }}>
              Expenditures
            </H3>
          </FlexBox>
          <Grid container spacing={3}>
            {/* iterable */}
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                id="accountId"
                name="accountId"
                label="Select Expense"
                select
                value={formik.values.accountId}
                onChange={formik.handleChange}
                error={
                  formik.touched.accountId && Boolean(formik.errors.accountId)
                }
                helperText={formik.touched.accountId && formik.errors.accountId}
              >
                {expenseAccounts.map((account) => {
                  const { id, accountName } = account;

                  return (
                    // Only expense accounts displayed
                    <MenuItem key={id} value={id}>
                      {accountName}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                type="number"
                id="amount"
                name="amount"
                label="Amount"
                InputProps={{ inputProps: { min: 0 } }}
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ textTransform: "uppercase" }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
        {formik.values.companyId && (
          <Paper sx={{ overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {companyExpenses
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((expense) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={expense.expenseId}
                        >
                          {columns.map((column) => {
                            const value = expense[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25]}
              component="div"
              count={expenses.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={changeRowsPerPage}
            />
          </Paper>
        )}
      </Paper>
    </AppLayout>
  );
};

export default AddExpenses;
