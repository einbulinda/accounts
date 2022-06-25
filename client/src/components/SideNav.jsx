import { Box } from "@mui/system";
import { SideNavContainer } from "components/SideNavContainer";
import { sidebarLinks } from "navigation/sidebarLinks";
import { Button, Grid, Typography } from "@mui/material";
import { CustomLink } from "components/CustomLink";
import FlexBox from "components/FlexBox";

const SideNav = () => {
  return (
    <SideNavContainer
      sx={{ px: "0.8rem", py: "1.5rem", color: "grey.900", height: "90vh" }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {sidebarLinks.map((item) => (
          <Grid container spacing={2} key={item.title}>
            <Grid item xs={12}>
              <CustomLink path={item.path}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <FlexBox alignItems="center">
                    <item.icon
                      fontSize="small"
                      color="inherit"
                      sx={{ mr: "1rem" }}
                    />
                    <Typography variant="body1" component="span">
                      {item.title}
                    </Typography>
                  </FlexBox>
                </Box>
              </CustomLink>
            </Grid>
          </Grid>
        ))}
        <Button sx={{}}>Log Out</Button>
      </Box>
    </SideNavContainer>
  );
};

export default SideNav;
