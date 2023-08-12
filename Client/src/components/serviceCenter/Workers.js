import React from "react";
import NavBar from "./Navbar";

import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Box, Button, Container } from "@mui/material";
import AddWorkerModal from "../../modal/AddWorkerModal";
import WorkersTable from "../tables/serviceCenterWorkers";

export default function Workers() {
  let rowHeads = ["No", "Worker Name", "Contact No", "Email", "Action"];
  const [open, setOpen] = React.useState(false);
  const [workers, setWorkers] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  console.log(refresh)
  const handleOpen = () => setOpen(true);
  const handleClose = (type) => {
    setOpen(false);
    if (type === "error") {
      return toast.error("An Error Ocurred,Try Again");
    } else if (type === "success") {
      toast.success("Worker Added Successfully");
    }
  };

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("service-center/workers");
      console.log(data)
      if (data.err) {
        toast.error(data.message);
      } else {
        setWorkers(data.workers);
      }
    })();
  }, [refresh]);
  return (
    <>
      <NavBar />
      <Toaster />
      <Container
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}
      >
        <Box display={"flex"} justifyContent={"center"}>
          <Button onClick={handleOpen} variant="outlined">
            Add Worker
          </Button>
        </Box>

        <WorkersTable
          workers={workers}
          rowHeads={rowHeads}
          setRefresh={setRefresh}
        />
      </Container>
      <AddWorkerModal open={open} handleClose={handleClose} setRefresh={setRefresh} />
    </>
  );
}
