import DashboardHeader from "components/DashboardHeader";
import { useFormik } from "formik";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import AppLayout from "layout/AppLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { CustomLink } from "components/CustomLink";
import { url } from "navigation/CONSTANTS";
import Button from "@mui/material/Button";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H3, Small } from "components/Typography";
import { createSalariesApi, fetchAllProfilesApi } from "api";
import { fetchProfiles } from "redux/slices/profileSlice";
import { validate } from "validations";
import FormButtons from "components/FormButtons";
import { postSalaries } from "redux/slices/salariesSlice";

const mapState = ({ auth, profile }) => ({
  user: auth.auth.user,
  profiles: profile.profiles,
});

const AddPayePage = () => {
  const { profiles, user } = useSelector(mapState);
  const dispatch = useDispatch();
  const { salariesSchema } = validate;
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      companyId: "",
      year: new Date().getFullYear() - 1,
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    },
    validationSchema: salariesSchema,
    onSubmit: async (salaries, { resetForm }) => {
      salaries.userId = user.id;

      try {
        const { data } = await createSalariesApi(salaries);

        dispatch(postSalaries(data));
        setMessage("Salaries posted successfully");
        setOpen(true);
      } catch (error) {
        console.log(error.message);
      }
      resetForm();
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const { data } = await fetchAllProfilesApi();
        dispatch(fetchProfiles(data));
      } catch (error) {
        console.log(error.message);
      }
    };
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <DashboardHeader
        title="Add Salaries"
        icon={NaturePeopleIcon}
        button={
          <CustomLink path={url.ALL_PAYE}>
            <Button variant="contained" color="primary" sx={{ px: "2rem" }}>
              PAYE Summary
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
            <Grid item md={6} xs={12}>
              <TextField
                id="companyId"
                name="companyId"
                label="Company Name"
                fullWidth
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
            <Grid item xs={12} md={3}>
              <TextField
                id="year"
                name="year"
                label="Year"
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 2015, max: 2099 } }}
                value={formik.values.year}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
              />
            </Grid>
          </Grid>

          <FlexBox sx={{ justifyContent: "center", m: 2 }}>
            <H3 color="grey.600" sx={{ textTransform: "uppercase" }}>
              Salaries & Wages
            </H3>
          </FlexBox>
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="jan"
                    name="jan"
                    label="January"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.jan}
                    onChange={formik.handleChange}
                    error={formik.touched.jan && Boolean(formik.errors.jan)}
                    helperText={formik.touched.jan && formik.errors.jan}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="feb"
                    name="feb"
                    label="February"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.feb}
                    onChange={formik.handleChange}
                    error={formik.touched.feb && Boolean(formik.errors.feb)}
                    helperText={formik.touched.feb && formik.errors.feb}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="mar"
                    name="mar"
                    label="March"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.mar}
                    onChange={formik.handleChange}
                    error={formik.touched.mar && Boolean(formik.errors.mar)}
                    helperText={formik.touched.mar && formik.errors.mar}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="apr"
                    name="apr"
                    label="April"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.apr}
                    onChange={formik.handleChange}
                    error={formik.touched.apr && Boolean(formik.errors.apr)}
                    helperText={formik.touched.apr && formik.errors.apr}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="may"
                    name="may"
                    label="May"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.may}
                    onChange={formik.handleChange}
                    error={formik.touched.may && Boolean(formik.errors.may)}
                    helperText={formik.touched.may && formik.errors.may}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="jun"
                    name="jun"
                    label="June"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.jun}
                    onChange={formik.handleChange}
                    error={formik.touched.jun && Boolean(formik.errors.jun)}
                    helperText={formik.touched.jun && formik.errors.jun}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="jul"
                    name="jul"
                    label="July"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.jul}
                    onChange={formik.handleChange}
                    error={formik.touched.jul && Boolean(formik.errors.jul)}
                    helperText={formik.touched.jul && formik.errors.jul}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="aug"
                    name="aug"
                    label="August"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.aug}
                    onChange={formik.handleChange}
                    error={formik.touched.aug && Boolean(formik.errors.aug)}
                    helperText={formik.touched.aug && formik.errors.aug}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="sep"
                    name="sep"
                    label="September"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.sep}
                    onChange={formik.handleChange}
                    error={formik.touched.sep && Boolean(formik.errors.sep)}
                    helperText={formik.touched.sep && formik.errors.sep}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="oct"
                    name="oct"
                    label="October"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.oct}
                    onChange={formik.handleChange}
                    error={formik.touched.oct && Boolean(formik.errors.oct)}
                    helperText={formik.touched.oct && formik.errors.oct}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="nov"
                    name="nov"
                    label="November"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.nov}
                    onChange={formik.handleChange}
                    error={formik.touched.nov && Boolean(formik.errors.nov)}
                    helperText={formik.touched.nov && formik.errors.nov}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    type="number"
                    id="dec"
                    name="dec"
                    label="December"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={formik.values.dec}
                    onChange={formik.handleChange}
                    error={formik.touched.dec && Boolean(formik.errors.dec)}
                    helperText={formik.touched.dec && formik.errors.dec}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <FormButtons />
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message={message}
          onClose={handleClose}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Paper>
    </AppLayout>
  );
};

export default AddPayePage;
