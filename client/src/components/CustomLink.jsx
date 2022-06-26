import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  marginRight: "0.8rem",
  cursor: "pointer",
  "&:hover": {
    fontWeight: 500,
    color: "#98ddd2",
    textTransform: "uppercase",
    transition: "text-transform 3s ease-in-out",
  },
}));

export const CustomLink = (props) => {
  return <StyledLink to={props.path}>{props.children}</StyledLink>;
};
