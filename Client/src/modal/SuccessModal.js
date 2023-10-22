import { Box, Button, Modal, Typography } from "@mui/material";
import success from "../../src/assets/images/success.webp";
import React from "react";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 3,
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "96%",
  borderRadius: 5,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};
export default function SuccessModal({ openModalSuccess, handleClose }) {
  return (
    <>
      <Modal
        open={openModalSuccess}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={success} alt="Success" width="100%" maxHeight="150" />
          <Typography variant="h5" fontWeight={600} component="div">
            Booking Successful
          </Typography>
          <Typography variant="body1"  component="div">
            Thank you for your booking. Your reservation is confirmed.Our agent
            will pickup your vehicle at the exact date
          </Typography>
          <Button variant="contained" color="success" onClick={handleClose}>
            Done
          </Button>
        </Box>
      </Modal>
    </>
  );
}
