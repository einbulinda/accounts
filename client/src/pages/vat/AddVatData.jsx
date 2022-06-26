import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { CustomLink } from "components/CustomLink";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DashboardHeader from "components/DashboardHeader";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AppLayout from "layout/AppLayout";
import { url } from "navigation/CONSTANTS";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { fetchAllProfilesApi, saveVatDataApi } from "api";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "redux/slices/profileSlice";
import { yearEnds } from "data";
import { H3, Small } from "components/Typography";
import FlexBox from "components/FlexBox";
import FormButtons from "components/FormButtons";
import { useFormik } from "formik";
import { validate } from "validations";
import { createVatData } from "redux/slices/vatSlice";

const mapState = ({ auth, profile }) => ({
  user: auth.auth.user,
  profiles: profile.profiles,
});

const AddVatData = () => {
  const { profiles, user } = useSelector(mapState);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { vatSchema } = validate;
  const formik = useFormik({
    initialValues: {
      companyId: "",
      year: new Date().getFullYear() - 1,
      month: "",
      genSales: 0,
      reducedSales: 0,
      zeroSales: 0,
      exemptSales: 0,
      genPurchase: 0,
      reducedPurchases: 0,
      exemptPurchases: 0,
      zeroPurchases: 0,
    },
    validationSchema: vatSchema,
    onSubmit: async (vat, { resetForm }) => {
      vat.userId = user.id;

      try {
        const { data } = await saveVatDataApi(vat);
        if (data[1] === false) {
          setMessage("VAT Data for the company & periods already exists.");
          setOpen(true);
        } else {
          dispatch(createVatData(data));
          setMessage("Data saved successfully");
          setOpen(true);
        }

        resetForm();
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const getCompanies = async () => {
    try {
      const { data } = await fetchAllProfilesApi();
      dispatch(fetchProfiles(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <DashboardHeader
        title="Manage VAT Data"
        icon={ReceiptIcon}
        button={
          <CustomLink path={url.ACCOUNTS}>
            <Button variant="contained" color="primary" sx={{ px: "2rem" }}>
              VAT Summary
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
            <Grid item xs={12} md={3}>
              <TextField
                id="month"
                name="month"
                label="Month"
                fullWidth
                select
                value={formik.values.month}
                onChange={formik.handleChange}
                error={formik.touched.month && Boolean(formik.errors.month)}
                helperText={formik.touched.month && formik.errors.month}
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

          <FlexBox sx={{ justifyContent: "center", m: 2 }}>
            <H3 color="grey.600" sx={{ textTransform: "uppercase" }}>
              Input Tax :: Sales
            </H3>
          </FlexBox>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                id="genSales"
                name="genSales"
                label="General Rate Sales"
                InputProps={{ inputProps: { min: 0 } }}
                value={formik.values.genSales}
                onChange={formik.handleChange}
                error={
                  formik.touched.genSales && Boolean(formik.errors.genSales)
                }
                helperText={formik.touched.genSales && formik.errors.genSales}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                id="reducedSales"
                name="reducedSales"
                label="Reduced Rate Sales"
                InputProps={{ inputProps: { min: 0 } }}
                value={formik.values.reducedSales}
                onChange={formik.handleChange}
                error={
                  formik.touched.reducedSales &&
                  Boolean(formik.errors.reducedSales)
                }
                helperText={
                  formik.touched.reducedSales && formik.errors.reducedSales
                }
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                id="zeroSales"
                name="zeroSales"
                label="Zero Rated Sales"
                InputProps={{ inputProps: { min: 0 } }}
                value={formik.values.zeroSales}
                onChange={formik.handleChange}
                error={
                  formik.touched.zeroSales && Boolean(formik.errors.zeroSales)
                }
                helperText={formik.touched.zeroSales && formik.errors.zeroSales}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                id="exemptSales"
                name="exemptSales"
                label="Exempted Sales"
                InputProps={{ inputProps: { min: 0 } }}
                value={formik.values.exemptSales}
                onChange={formik.handleChange}
                error={
                  formik.touched.exemptSales &&
                  Boolean(formik.errors.exemptSales)
                }
                helperText={
                  formik.touched.exemptSales && formik.errors.exemptSales
                }
              />
            </Grid>
          </Grid>
          <FlexBox
            sx={{ textTransform: "uppercase", justifyContent: "center", m: 2 }}
          >
            <H3 color="grey.600" sx={{ textTransform: "uppercase" }}>
              Output Tax :: Purchases
            </H3>
          </FlexBox>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                id="genPurchase"
                name="genPurchase"
                label="General Rate Purchases"
                InputProps={{ inputProps: { min: 0 } }}
                value={formik.values.genPurchase}
                onChange={formik.handleChange}
                error={
                  formik.touched.genPurchase &&
                  Boolean(formik.errors.genPurchase)
                }
                helperText={
                  formik.touched.genPurchase && formik.errors.genPurchase
                }
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                id="reducedPurchases"
                name="reducedPurchases"
                label="Reduced Rate Purchases"
                InputProps={{ inputProps: { min: 0 } }}
                value={formik.values.reducedPurchases}
                onChange={formik.handleChange}
                error={
                  formik.touched.reducedPurchases &&
                  Boolean(formik.errors.reducedPurchases)
                }
                helperText={
                  formik.touched.reducedPurchases &&
                  formik.errors.reducedPurchases
                }
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                id="exemptPurchases"
                name="exemptPurchases"
                label="Exempted Purchases"
                InputProps={{ inputProps: { min: 0 } }}
                value={formik.values.exemptPurchases}
                onChange={formik.handleChange}
                error={
                  formik.touched.exemptPurchases &&
                  Boolean(formik.errors.exemptPurchases)
                }
                helperText={
                  formik.touched.exemptPurchases &&
                  formik.errors.exemptPurchases
                }
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                id="zeroPurchases"
                name="zeroPurchases"
                label="Zero Rate Purchases"
                InputProps={{ inputProps: { min: 0 } }}
                value={formik.values.zeroPurchases}
                onChange={formik.handleChange}
                error={
                  formik.touched.zeroPurchases &&
                  Boolean(formik.errors.zeroPurchases)
                }
                helperText={
                  formik.touched.zeroPurchases && formik.errors.zeroPurchases
                }
              />
            </Grid>
          </Grid>
          <FormButtons />
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={3000}
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

export default AddVatData;
