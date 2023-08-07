import React from "react";
import NavBar from "./Navbar";

import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Button, Container } from "@mui/material";
import AddWorkerModal from "../../modal/AddWorkerModal";

export default function Workers() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (type) => {
    setOpen(false);
    if (type === "error") {
      return toast.error("An Error Ocurred,Try Again");
    } else if (type === "success") {
      toast.success("Worker Added Successfully");
    }
  };

  return (
    <>
      <NavBar />
      <Toaster />
      <Container sx={{ mt: 4 }}>
        <Button onClick={handleOpen} variant="outlined">
          Add Worker
        </Button>
      </Container>
      <AddWorkerModal open={open} handleClose={handleClose} />
    </>
  );
}
