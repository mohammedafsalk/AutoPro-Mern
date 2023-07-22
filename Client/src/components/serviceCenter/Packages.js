import React from "react";
import { Box, Container, IconButton } from "@mui/material";
import { Add, AddCircle } from "@mui/icons-material";
import NoPackages from "../../assets/images/noRequests.jpg";
import NavBar from "./Navbar";
import AddPackage from "./Packages-AddPackageModal";

export default function Packages() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <NavBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100vh",
        }}
      >
        <Box
          mb={2}
          sx={{
            width: { sm: "300px", md: "600px" },
            height: { sm: "250px", md: "500px" },
          }}
        >
          <img src={NoPackages} width="100%" max alt="No Packages" />
        </Box>
        <IconButton onClick={handleOpen}>
          <AddCircle />
        </IconButton>
        <AddPackage  open={open} />
      </Container>
    </>
  );
}
