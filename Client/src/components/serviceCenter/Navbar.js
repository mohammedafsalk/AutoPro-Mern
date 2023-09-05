import React, { useState } from "react";
import { NavLink, Link as link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Container,
  MenuItem,
  Toolbar,
  Menu,
  Typography,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Settings,
  Menu as MenuIcon,
  ViewCarousel,
  Engineering,
  SpaceDashboard,
  CalendarMonth,
  AccessTime,
  AccountCircle,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import axios from "axios";
import profileImageUrl from "../../assets/images/avatar.png";
import { grey } from "@mui/material/colors";

export default function NavBar() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get("service-center/auth/logout");
    dispatch({ type: "refresh" });
  };

  return (
    <>
      <AppBar style={{ backgroundColor: grey[100] }} position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: grey[50],
            alignItems: "center",
          }}
        >
          <MenuIcon onClick={toggleDrawer(true)} color="primary" />

          <Typography
            variant="h5"
            noWrap
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "black",
            }}
          >
            AUTO PRO
          </Typography>
          <Avatar onClick={(e) => setShow(true)}></Avatar>
        </Toolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={show}
          onClose={(e) => setShow(false)}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 50, left: 2000 }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem>
            <Link
              component={link}
              to="/service-center/profile"
              sx={{ textDecoration: "none",color:"inherit" }}
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ width: "100%" }}
      >
        <Box
          width="250px"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "white",
              padding: "10px",
              marginTop: "10px",
              gap: "10px",
              borderBottom: "1px solid black",
            }}
          >
            <Avatar
              alt="Profile Image"
              src={profileImageUrl}
              sx={{
                width: 80,
                height: 80,
              }}
            />
            <Typography variant="h5" fontWeight={500}>
              Service Center
            </Typography>
          </Toolbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <ListItem>
              <ListItemIcon>
                <SpaceDashboard sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h6"
                  sx={{ color: "inherit" }}
                  fontSize={18}
                  component={NavLink}
                  to="/service-center/dashboard"
                >
                  DashBoard
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CalendarMonth sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h6"
                  sx={{ color: "inherit" }}
                  fontSize={18}
                  component={NavLink}
                  to="/service-center/bookings"
                >
                  Bookings
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Engineering sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h6"
                  sx={{ color: "inherit" }}
                  fontSize={18}
                  component={NavLink}
                  to="/service-center/workers"
                >
                  Workers
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessTime sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h6"
                  sx={{ color: "inherit" }}
                  fontSize={18}
                  component={NavLink}
                  to="/service-center/schedule"
                >
                  Schedules
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountCircle sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h6"
                  sx={{ color: "inherit" }}
                  fontSize={18}
                  component={NavLink}
                  to="/service-center/profile"
                >
                  Profile
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h6"
                  sx={{ color: "inherit" }}
                  fontSize={18}
                  component={NavLink}
                  to="/service-center/settings"
                >
                  Settings
                </Typography>
              </ListItemText>
            </ListItem>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
