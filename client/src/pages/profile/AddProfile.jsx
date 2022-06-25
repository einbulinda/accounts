import DashboardHeader from "components/DashboardHeader";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AppLayout from "layout/AppLayout";
import { CustomLink } from "components/CustomLink";
import { url } from "navigation/CONSTANTS";
import { Box, Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { businessTypes, yearEnds } from "data";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "validations";
import { createProfileApi } from "api";
import { createProfile } from "redux/slices/profileSlice";
import FormButtons from "components/FormButtons";

const AddProfile = () => {
  const { user } = useSelector((state) => state.auth.auth);
  const { profileSchema } = validate;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      companyName: "",
      kraPin: "",
      companyType: "",
      yearEnd: "",
      totalShares: "",
      paidShares: "",
      nominalValue: "",
    },
    validationSchema: profileSchema,
    onSubmit: async (profile, { resetForm }) => {
      profile.userId = user.id;

      try {
        const { data } = await createProfileApi(profile);
        dispatch(createProfile(data));
        resetForm();
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <AppLayout>
      <DashboardHeader
        title="Add Business Profile"
        icon={BusinessCenterIcon}
        button={
          <CustomLink path={url.PROFILES}>
            <Button variant="contained" color="error" sx={{ px: "2rem" }}>
              All Profiles
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
              {" "}
              <TextField
                fullWidth
                id="companyName"
                name="companyName"
                label="Company Name"
                placeholder="XYZ Limited"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                error={
                  formik.touched.companyName &&
                  Boolean(formik.errors.companyName)
                }
                helperText={
                  formik.touched.companyName && formik.errors.companyName
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="companyType"
                    name="companyType"
                    label="Business Type"
                    fullWidth
                    select
                    value={formik.values.companyType}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.companyType &&
                      Boolean(formik.errors.companyType)
                    }
                    helperText={
                      formik.touched.companyType && formik.errors.companyType
                    }
                  >
                    {businessTypes.map((type) => {
                      const { code, name } = type;
                      return (
                        <MenuItem value={code} key={code}>
                          {name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    id="yearEnd"
                    name="yearEnd"
                    label="Accounting Period"
                    fullWidth
                    select
                    value={formik.values.yearEnd}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.yearEnd && Boolean(formik.errors.yearEnd)
                    }
                    helperText={formik.touched.yearEnd && formik.errors.yearEnd}
                  >
                    {yearEnds.map((month) => {
                      const { code, period } = month;
                      return (
                        <MenuItem value={code} key={code}>
                          {period}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                id="kraPin"
                name="kraPin"
                label="KRA PIN"
                placeholder="P123456789Z"
                value={formik.values.kraPin}
                onChange={formik.handleChange}
                error={formik.touched.kraPin && Boolean(formik.errors.kraPin)}
                helperText={formik.touched.kraPin && formik.errors.kraPin}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    id="totalShares"
                    name="totalShares"
                    label="Total Shares"
                    placeholder="100"
                    value={formik.values.totalShares}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.totalShares &&
                      Boolean(formik.errors.totalShares)
                    }
                    helperText={
                      formik.touched.totalShares && formik.errors.totalShares
                    }
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    id="paidShares"
                    name="paidShares"
                    label="Paid Up Shares"
                    placeholder="100"
                    value={formik.values.paidShares}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.paidShares &&
                      Boolean(formik.errors.paidShares)
                    }
                    helperText={
                      formik.touched.paidShares && formik.errors.paidShares
                    }
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    id="nominalValue"
                    name="nominalValue"
                    label="Value Per Share"
                    placeholder="1,000"
                    value={formik.values.nominalValue}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.nominalValue &&
                      Boolean(formik.errors.nominalValue)
                    }
                    helperText={
                      formik.touched.nominalValue && formik.errors.nominalValue
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <FormButtons />
        </Box>
      </Paper>
    </AppLayout>
  );
};

export default AddProfile;
