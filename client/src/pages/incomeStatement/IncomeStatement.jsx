import Grid from "@mui/material/Grid";
import { fetchAllProfilesApi } from "api";
import FlexBox from "components/FlexBox";
import SelectCompany from "components/SelectCompany";
import { H2, H4, H5 } from "components/Typography";
import { yearEnds } from "data";
import AppLayout from "layout/AppLayout";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "redux/slices/profileSlice";
import { endMonth, formatVal } from "services/helpers.functions";
import WebFont from "webfontloader";

const mapState = ({ auth, profile }) => ({
  user: auth.auth.user,
  profiles: profile.profiles,
  company: profile.profile,
});

const IncomeStatement = () => {
  const { company, profiles, user } = useSelector(mapState);
  const dispatch = useDispatch();
  const [period, setPeriod] = useState(null);

  const getProfiles = async () => {
    try {
      const { data } = await fetchAllProfilesApi();
      dispatch(fetchProfiles(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProfiles();
    if (company.data) {
      const month = yearEnds.filter(
        (data) => data.code === company.data.yearEnd
      )[0].period;
      setPeriod(month);
    }
    WebFont.load({
      google: {
        families: ["Montserrat", "Roboto", "Droid Sans"],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);
  return (
    <AppLayout>
      {!company.data ? (
        <SelectCompany />
      ) : (
        <Fragment>
          <FlexBox
            sx={{ fontFamily: "Montserrat", borderBottom: ".3em double grey" }}
          >
            <H4>
              {company.data.companyName} <br />
              Annual Report & Financial Statements
              <br />
              For the year ended{" "}
              {`${endMonth(
                company.data.yearEnd,
                company.data.year
              )} ${period} ${company.data.year}`}
            </H4>
          </FlexBox>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} md={12}>
              <H2 color="grey.900" sx={{ textDecoration: "underline" }}>
                Statement of Comprehensive Income
              </H2>
            </Grid>
            {/* Start Header for Statement */}
            <Grid item xs={6} md={6}></Grid>
            <Grid item xs={2} md={2} px={2}>
              <H5 sx={{ textAlign: "center", borderBottom: "2px solid grey" }}>
                <br />
                Notes
              </H5>
            </Grid>
            <Grid item xs={2} md={2} px={2}>
              <H5 sx={{ textAlign: "center", borderBottom: "2px solid grey" }}>
                {company.data.year} <br />
                Ksh.
              </H5>
            </Grid>
            <Grid item xs={2} md={2} px={2}>
              <H5 sx={{ textAlign: "center", borderBottom: "2px solid grey" }}>
                {company.data.year - 1} <br />
                Ksh.
              </H5>
            </Grid>
            {/* End Header for Statement */}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <H4>Revenue</H4>
            </Grid>
            <Grid item xs={2} md={2} px={2}>
              <H5 sx={{ textAlign: "center" }}>3</H5>
            </Grid>
            <Grid item xs={2} md={2} px={2}>
              <H5 sx={{ textAlign: "right", pr: 2 }}>{formatVal(3000)}</H5>
            </Grid>
            <Grid item xs={2} md={2} px={2}>
              <H5 sx={{ textAlign: "right", pr: 2 }}>{formatVal(30000)}</H5>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </AppLayout>
  );
};

export default IncomeStatement;
