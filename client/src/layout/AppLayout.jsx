import { Container, Grid } from "@mui/material";
import React from "react";
import SideNav from "components/SideNav";
import Navbar from "components/Navbar";

const AppLayout = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Grid container spacing={2}>
        <Grid
          item
          md={3}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <SideNav />
        </Grid>
        <Grid item md={9} sx={{ p: 2 }} justifyContent="center">
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppLayout;
