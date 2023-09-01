import React from "react";
import NavBar from "./Navbar";
import { Box, Button, Container, Typography } from "@mui/material";
import profile from "../../assets/images/avatar.png";
import ServiceCenterEdit from "../../modal/ServiceCenterEdit";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

export default function Profile() {
  const serviceCenter = useSelector((state) => {
    return state.serviceCenter;
  });
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
        sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 4 }}
      >
        <Toaster />
        <Box
          sx={{ width: 300 }}
          display={"flex"}
          p={2}
          flexDirection={"column"}
          alignItems={"center"}
          boxShadow={1}
          borderRadius={4}
          gap={2}
        >
          <Box>
            <img
              src={serviceCenter.details.logo?.url}
              width={200}
              height={200}
              alt=""
            />
          </Box>
          <Box textAlign={"center"}>
            <Typography variant="h5" fontWeight={500}>
              {serviceCenter.details.name}
            </Typography>
            <Typography>{serviceCenter.details.email}</Typography>
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
      <ServiceCenterEdit
        open={open}
        handleClose={handleClose}
        serviceCenter={serviceCenter}
      />
    </>
  );
}
