import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import predefinedBrands from "../utils/brands";
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

export default function BrandsModal({ handleClose, open, details }) {
  const item = details.brands;
  const [selectedBrands, setSelectedBrands] = useState(() => {
    return predefinedBrands.filter((category) => item.includes(category));
  });

  const handleBrandChange = (event) => {
    setSelectedBrands(event.target.value);
  };
  const dispatch = useDispatch();
  const handleSave = async () => {
    const { data } = await axios.patch("service-center/brands", {
      values: selectedBrands,
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
            Choose Brands
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <FormControl fullWidth>
            <InputLabel>Select Vehicle Brands</InputLabel>
            <Select
              fullWidth
              multiple
              variant="outlined"
              value={selectedBrands}
              onChange={handleBrandChange}
            >
              {predefinedBrands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedBrands.includes(brand)}
                        color="primary"
                      />
                    }
                    label={brand}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
