import { Container, Grid } from "@mui/material";
import React from "react";
import SideNav from "components/SideNav";

const AppLayout = ({ children }) => {
  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
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
