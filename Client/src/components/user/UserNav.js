import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  MenuItem,
  Toolbar,
  Menu,
  Typography,
} from "@mui/material";
import {} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import axios from "axios";
import userimage from "../../assets/images/AutoPro-logos_black.png";
import { grey } from "@mui/material/colors";

export default function UserNav() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/user/auth/logout");
    dispatch({ type: "refresh" });
  };

  return (
    <Container>
      <AppBar style={{ backgroundColor: grey[100] }} position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: grey[50],
            alignItems: "center",
          }}
        >
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={userimage}
              alt="User"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </Box>
          <Avatar onClick={(e) => setShow(true)}></Avatar>
          <Menu
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
            <MenuItem onClick={handleLogout} >Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
