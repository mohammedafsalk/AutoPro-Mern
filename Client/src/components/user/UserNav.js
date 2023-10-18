import React, { useState } from "react";
import { Link as link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  MenuItem,
  Toolbar,
  Menu,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import {} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import logo from "../../assets/images/AutoPro-logos_black.png";
import { grey } from "@mui/material/colors";
import { MDBContainer } from "mdb-react-ui-kit";

export default function UserNav() {
  const user = useSelector((state) => state.user.details);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const navigateto = () => {
    navigate("/");
  };

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.get("/user/auth/logout");
    dispatch({ type: "refresh" });
  };

  return (
    <AppBar
      style={{
        backgroundColor: grey[100],
        boxShadow: "0px 0px 10px 3px RGBA(233, 233, 233, 0.9)",
      }}
      position="sticky"
    >
      <MDBContainer>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: grey[50],
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => navigateto()}>
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
          </IconButton>
          <Avatar onClick={(e) => setShow(true)} src={user.profile}></Avatar>
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
            <Link
              component={link}
              to="/profile"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </MDBContainer>
    </AppBar>
  );
}
