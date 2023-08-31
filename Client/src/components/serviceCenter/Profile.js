import React from "react";
import NavBar from "./Navbar";
import { Box, Button, Container, Typography } from "@mui/material";
import profile from "../../assets/images/avatar.png";

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <NavBar />
      <Container
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}
      >
        <Box
          sx={{ minWidth: 300 }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
        >
          <Box>
            <img src={profile} width={200} height={200} alt="" />
          </Box>
          <Box textAlign={"center"}>
            <Typography variant="h5" fontWeight={500}>
              user.name
            </Typography>
            <Typography>user.email</Typography>
          </Box>
          <Box display={"flex"} gap={1}>
            <Button variant="contained" color="error">
              Logout
            </Button>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
              Edit
            </Button>
          </Box>
        </Box>
      </Container>
      <ServiceCenterEdit open={open} handleClose={handleClose} />
    </>
  );
}
