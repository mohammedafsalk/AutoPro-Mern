import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Menu as MuiMenu,
  MenuItem,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Menu,
  NewReleases,
  PeopleAlt,
  Wallet,
  Warehouse,
  Window,
} from "@mui/icons-material";
import profileImageUrl from "../../assets/images/avatar.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function AdminNav() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    await axios.get("admin/auth/logout");
    dispatch({ type: "refresh" });
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "white",
          }}
        >
          <IconButton edge="start" color="primary" onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h5" fontWeight={500} color={"black"}>
            AUTO PRO
          </Typography>
          <Avatar onClick={(e) => setShow(true)}></Avatar>
        </Toolbar>
        <MuiMenu
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
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MuiMenu>
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
              ADMIN
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
                <Window sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h6"
                  sx={{ color: "inherit" }}
                  fontSize={18}
                  component={NavLink}
                  to="/admin/"
                >
                  Dash Board
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NewReleases sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="h6"
                  sx={{ color: "inherit" }}
                  fontSize={18}
                  component={NavLink}
                  to="/admin/requests"
                >
                  Requests
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PeopleAlt sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{ color: "inherit" }}
                  variant="h6"
                  fontSize={18}
                  component={NavLink}
                  to="/admin/users"
                >
                  Users
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warehouse sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{ color: "inherit" }}
                  variant="h6"
                  fontSize={18}
                  component={NavLink}
                  to="/admin/service-centers"
                >
                  Service Centers
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Wallet sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{ color: "inherit" }}
                  variant="h6"
                  fontSize={18}
                  component={NavLink}
                  to="/admin/withdraws"
                >
                  Withdraws
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warehouse sx={{ fontSize: "30px", color: "black" }} />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  sx={{ color: "inherit" }}
                  variant="h6"
                  fontSize={18}
                  component={NavLink}
                  to="/admin/bookings"
                >
                  Bookings
                </Typography>
              </ListItemText>
            </ListItem>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
