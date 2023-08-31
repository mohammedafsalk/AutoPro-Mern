import { Box, Modal } from "@mui/material";
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
export default function ServiceCenterEdit({ handleClose, open }) {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    </>
  );
}
