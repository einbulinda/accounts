import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import BalanceIcon from "@mui/icons-material/Balance";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { menus } from "navigation/menuLinks";
import { useDispatch, useSelector } from "react-redux";
import { stringAvatar } from "services/helpers.functions";
import { logoutUser } from "redux/slices/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const [navMenu, setNavMenu] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const username = `${user.firstName} ${user.lastName}`;

  const handleCloseNavMenu = () => setNavMenu(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleOpenNavMenu = (e) => {
    setNavMenu(e.currentTarget);
  };

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BalanceIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            noWrap
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ANNUAL ACCOUNTS
          </Typography>
          {/* For Smaller Screens. Consider including sideLinks */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={navMenu}
              keepMounted
              open={Boolean(navMenu)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {menus
                .filter((menu) => menu.type !== "user")
                .map((page) => (
                  <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <BalanceIcon
            fontSize="large"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ANNUAL ACCOUNTS
          </Typography>
          {/* MD Main Menus */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menus
              .filter((menu) => menu.type === "main")
              .map((page) => (
                <Button
                  key={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              ))}
          </Box>
          <Box sx={{}}>
            <Tooltip title={username} placement="bottom-start">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar {...stringAvatar(username)} />
              </IconButton>
            </Tooltip>
            {/* User menu and settings */}
            <Menu
              keepMounted
              sx={{ mt: "45px" }}
              id="menu-appBar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {menus
                .filter((menu) => menu.type === "user")
                .map((setting) => (
                  <MenuItem key={setting.path} onClick={handleOpenNavMenu}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              <MenuItem onClick={() => dispatch(logoutUser())}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
