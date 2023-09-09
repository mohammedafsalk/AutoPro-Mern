import { Box, Button, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import UserProfileEdit from "../../modal/UserProfileEdit";
import { Toaster } from "react-hot-toast";

export default function ProfileCard({ user }) {
  console.log(user);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await axios.get("user/auth/logout");
    dispatch({ type: "refresh" });
  };
  return (
    <>
      <Toaster />
      <Box
        sx={{ minWidth: 300 }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
      >
        <Box>
          <img src={user.profile} width={200} height={200} alt="" />
        </Box>
        <Box textAlign={"center"}>
          <Typography variant="h5" fontWeight={500}>
            {user.name}
          </Typography>
          <Typography>{user.email}</Typography>
          <Typography>{user.phone}</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Button variant="contained" onClick={handleLogout} color="error">
            Logout
          </Button>
          <Button onClick={handleOpen} variant="outlined" color="primary">
            Edit
          </Button>
        </Box>
      </Box>
      <UserProfileEdit open={open} handleClose={handleClose} user={user} />
    </>
  );
}
