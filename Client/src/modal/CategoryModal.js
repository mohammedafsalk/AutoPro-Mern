import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
  width: 600,
  maxWidth: "96%",
  borderRadius: 5,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

export default function CategoryModal({ handleClose, open, item }) {
  const [values, setValues] = React.useState({
    twowheeler: false,
    fourwheeler: false,
    heavyvehicles: false,
    threewheeler: false,
  });
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: checked }));
  };
  const handleSave = async () => {
    await axios.patch("service-center/categories", { values });
  };
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
            Choose Categories
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <FormControlLabel
            sx={{ width: 200 }}
            control={
              <Checkbox
                name="twowheeler"
                checked={values.twowheeler}
                onChange={handleChange}
              />
            }
            label="Two Wheeler"
          />
          <FormControlLabel
            sx={{ width: 200 }}
            control={
              <Checkbox
                name="threewheeler"
                checked={values.threewheeler}
                onChange={handleChange}
              />
            }
            label="Three Wheeler"
          />
          <FormControlLabel
            sx={{ width: 200 }}
            control={
              <Checkbox
                name="fourwheeler"
                checked={values.fourwheeler}
                onChange={handleChange}
              />
            }
            label="Four Wheeler"
          />
          <FormControlLabel
            sx={{ width: 200 }}
            control={
              <Checkbox
                name="heavyvehicles"
                checked={values.heavyvehicles}
                onChange={handleChange}
              />
            }
            label="Heavy Vehicles"
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Button variant="contained" onClick={handleSave} color="success">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
