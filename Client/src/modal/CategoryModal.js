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
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
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

export default function CategoryModal({ handleClose, open, details }) {
  const dispatch = useDispatch();
  const items = details.categories;

  const categories = [
    "Two Wheeler",
    "Four Wheeler",
    "Three Wheeler",
    "Heavy Vehicles",
  ];
  const [selectedCategories, setSelectedCategories] = useState(() => {
    return categories.filter((category) => items.includes(category));
  });

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((c) => c !== category)
      );
    } else {
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    }
  };

  const handleSave = async () => {
    const { data } = await axios.patch("service-center/categories", {
      values: selectedCategories,
    });
    if (data.err) {
      toast.error(data.message);
    } else {
      dispatch({ type: "refresh" });
      handleClose();
      toast.success(data.message);
    }
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
          {categories.map((category) => (
            <FormControlLabel
              sx={{ width: 200 }}
              key={category}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={category}
            />
          ))}
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
