import React from "react";
import { Box, Container, IconButton } from "@mui/material";
import { Add, AddCircle } from "@mui/icons-material";
import NoPackages from "../../assets/images/noRequests.jpg";
import NavBar from "./Navbar";
import AddPackage from "./Packages-AddPackageModal";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";

export default function Packages() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (type) => {
    setOpen(false);
    if (type === "error") {
      toast.error("Please Try Again");
    } else if (type === "success") {
      toast.success("Package Added Succesfully");
    }
  };
  const centerId = useSelector((state) => {
    return state.serviceCenter.details._id;
  });

  return (
    <>
      <NavBar />
      <Toaster />
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
        <AddPackage open={open} onClose={handleClose} centerId={centerId} />
      </Container>
    </>
  );
}
