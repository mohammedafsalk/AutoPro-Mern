import { Box, Button, Typography } from "@mui/material";
import React from "react";
import profile from "../../assets/images/avatar.png";

export default function ProfileCard({user}) {
    console.log(user);
  return (
    <Box sx={{ minWidth: 300 }} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
      <Box>
        <img src={profile} width={200} height={200} alt="" />
      </Box>
      <Box textAlign={"center"}>
        <Typography variant="h5" fontWeight={500} >{user.name}</Typography>
        <Typography>{user.email}</Typography>
      </Box>
      <Box display={"flex"} gap={1} >
        <Button variant="contained" color="error" >
            Logout
        </Button>
        <Button variant="outlined" color="primary" >
            Edit
        </Button>
      </Box>
    </Box>
  );
}
