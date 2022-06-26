import Box from "@mui/system/Box";
import { styled } from "@mui/material/styles";
import Menu from "@mui/icons-material/Menu";
import useWindowSize from "hooks/useWindowSize";
import FlexBox from "components/FlexBox";
import { H2 } from "components/Typography";
import SideNav from "components/SideNav";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  padding: "0.5rem",

  marginTop: theme.spacing(-2),
  marginBottom: theme.spacing(3),
  "& .headerHold": {
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  [theme.breakpoints.up("md")]: {
    "& .side-nav": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    "& .headerHold": {},
  },
}));

const DashboardHeader = ({ title, navigation, button, ...props }) => {
  const width = useWindowSize();
  const isTablet = width < 1025;
  return (
    <StyledBox>
      <FlexBox mt={2} className="headerHold">
        <FlexBox alignItems="center">
          {props.icon && <props.icon color="primary" fontSize="large" />}
          <H2 ml={1.5} my="0px" lineHeight="1" whiteSpace="pre">
            {title}
          </H2>
        </FlexBox>
        {/* isTablet Menu Icon */}
        <Box className="side-nav">
          <SideNav position="left" handle={<Menu fontSize="small" />}>
            {navigation}
          </SideNav>
        </Box>
        {!isTablet && button}
      </FlexBox>
      {isTablet && !!button && <Box mt={2}>{button}</Box>}
    </StyledBox>
  );
};

export default DashboardHeader;
