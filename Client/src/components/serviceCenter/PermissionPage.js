import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Stack,
  Container,
} from "@mui/material";
import axios from "axios";
import img from "../../../src/assets/images/Permission waiting.jpg"

export default function PermissionPage({ rejected }) {
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await axios.get("/service-center/auth/logout");
    dispatch({ type: "refresh" });
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight={500} color="black">
            AUTO PRO
          </Typography>
          <Avatar onClick={(e) => setShow(true)} />
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
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container
        color="primary"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Stack sx={{maxWidth:"600px",width:"100%"}} >
            <img src={img}   alt="" />
            <Typography fontWeight={500} textAlign="center" >
                Your Permission Is Being Processed.You Will Notified Through Your Registered Mail. 
            </Typography>
        </Stack>
      </Container>
    </div>
  );
}
