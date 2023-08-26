import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import axios from "axios";
import dayjs from "dayjs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Toaster, toast } from "react-hot-toast";
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

export default function WalletModal({ handlClose, open }) {
  const [data, setData] = React.useState({
    accno: "",
    ifsc: "",
    branch: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = ()=>{
    console.log(data);
  }

  return (
    <Modal
      open={open}
      onClose={handlClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <TextField
            value={data.accno}
            onChange={handleData}
            name="accno"
            label="Account Number"
          />
          <TextField
            value={data.ifsc}
            onChange={handleData}
            name="ifsc"
            label="IFSC Code"
          />
          <TextField
            value={data.branch}
            onChange={handleData}
            name="branch"
            label="Branch"
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
