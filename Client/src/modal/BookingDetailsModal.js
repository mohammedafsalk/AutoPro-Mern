import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

import axios from "axios";
import { BeatLoader } from "react-spinners";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 3,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

export default function BookingDetails({ handleClose, open, item }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box textAlign={"center"}>
          <Typography variant="h5" fontWeight={500}>
            Details
          </Typography>
        </Box>
        <Box textAlign={"center"}>
          <Typography fontWeight={500} gutterBottom color={"black"}>
            {item.vehicleName}
          </Typography>
          <Typography fontWeight={500} gutterBottom color={"black"}>
            {item.brand}
          </Typography>
          <Typography fontWeight={500} color={"black"}>
            {item.vehicleNumber}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            onClick={handleClose}
            type="button"
            variant="contained"
            sx={{ color: "white", bgcolor: "black" }}
          >
            Assign
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
