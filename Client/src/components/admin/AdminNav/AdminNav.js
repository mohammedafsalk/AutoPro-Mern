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
import { Menu, NewReleases, PeopleAlt, Warehouse } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function AdminNav() {
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
  return (
    <>
      <AppBar position="sticky" >
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
          anchorPosition={{ top: 50, left: 900 }}
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
          <MenuItem>Logout</MenuItem>
        </MuiMenu>
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
            ADMIN
          </Typography>
        </Toolbar>
        <List sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <ListItem>
            <ListItemIcon>
              <NewReleases sx={{ fontSize: "30px", color: "black" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
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
              <Typography variant="h6" fontSize={18}>
                Users
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Warehouse sx={{ fontSize: "30px", color: "black" }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6" fontSize={18}>
                Service Centers
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
