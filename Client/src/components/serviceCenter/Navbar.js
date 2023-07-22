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
} from "@mui/material";
import { Settings, Menu as MenuIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import axios from "axios";
import userimage from "../../assets/images/AutoPro-logos_black.png";
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
    await axios.get("http://localhost:5000/user/auth/logout");
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
          anchorPosition={{ top: 40, left: 1450 }}
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
            <Link component={link} to="/profile">
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
        sx={{ width: "50%" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            bgcolor: "white",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Typography variant="h5" fontWeight={500}>
            Service Center
          </Typography>
        </Toolbar>
        <List sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <ListItem>
            <ListItemIcon>
              <Settings sx={{ fontSize: "30px" }} />
            </ListItemIcon>
            <ListItemText>
              <NavLink to="/service-center/packages" className="packages-link">
                <Typography variant="h6" fontSize={18}>
                  Packages
                </Typography>
              </NavLink>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
