import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const StyledLink = styled(Link)({
  textDecoration: "none",
  marginRight: "0.8rem",
  cursor: "pointer",
  "&:hover": {
    fontWeight: 500,
    color: "#d32f2f",
    textTransform: "uppercase",
    transition: "text-transform 3s ease-in-out",
  },
});

export const CustomLink = (props) => {
  return <StyledLink to={props.path}>{props.children}</StyledLink>;
};
