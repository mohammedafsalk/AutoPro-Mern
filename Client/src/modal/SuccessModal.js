import { Avatar, Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: { md: "column", xs: "row" },
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
export default function SuccessModal({
  openModalSuccess,
  setOpenModalSuccess,
}) {
    console.log(openModalSuccess);
  return (
    <>
      <Modal
        open={openModalSuccess}
        onClose={setOpenModalSuccess(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    </>
  );
}
