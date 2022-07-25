import { Button, MenuItem, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "redux/slices/profileSlice";
import { validate } from "validations";
import FlexBox from "./FlexBox";
import { H4, Small } from "./Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid silver",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

const SelectCompany = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { profiles, profile } = useSelector((state) => state.profile);
  const { selectCompanySchema } = validate;
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      companyId: "",
      year: "",
    },
    validationSchema: selectCompanySchema,
    onSubmit: (details) => {
      const bioData = profiles.filter(
        (company) => company.id === details.companyId
      )[0];
      const {
        companyName,
        yearEnd,
        kraPin,
        companyType,
        totalShares,
        nominalValue,
        paidShares,
      } = bioData;
      details.companyName = companyName;
      details.yearEnd = yearEnd;
      details.kraPin = kraPin;
      details.companyType = companyType;
      details.totalShares = totalShares;
      details.nominalValue = nominalValue;
      details.paidShares = paidShares;
      dispatch(selectProfile(details));
      setOpen(false);
    },
  });

  useEffect(() => {
    !profile.data && setOpen(true);
  }, [profile.data]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
        {!profiles ? (
          <FlexBox sx={{ justifyContent: "center" }}>
            <Small color="error.600">
              "Please create a company profile first before proceeding."
            </Small>
          </FlexBox>
        ) : (
          <Fragment>
            <FlexBox sx={{ justifyContent: "center", m: 2 }}>
              <H4 color="primary.main" sx={{ textTransform: "uppercase" }}>
                Select Profile
              </H4>
            </FlexBox>
            <FlexBox mb={2}>
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
            </FlexBox>
            <FlexBox mb={2}>
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
            </FlexBox>
            <FlexBox justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Select Company
              </Button>
            </FlexBox>
          </Fragment>
        )}
      </Box>
    </Modal>
  );
};

export default SelectCompany;
