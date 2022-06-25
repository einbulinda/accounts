import { Card } from "@mui/material";
import { styled } from "@mui/system";

export const SideNavContainer = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: "calc(100vh-64px)",
    boxShadow: "none",
    overflowY: "auto",
  },
}));
