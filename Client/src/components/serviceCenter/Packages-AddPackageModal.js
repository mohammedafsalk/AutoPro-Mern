import {
  Box,
  MenuItem,
  Modal,
  useTheme,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import React from "react";

const packages = ["Basic", "Standard", "Premium"];

export default function AddPackage({ open }) {
  const theme = useTheme();
  const placeholder = "e.g: Oil Change, Washing, etc...";
  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    borderRadius: 5,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    [theme.breakpoints.up("md")]: {
      width: "500px",
    },
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          sx={{ borderBottom: "1px solid black" }}
          component="span"
          fontWeight={500}
        >
          Add Package Details
        </Typography>
        <TextField
          id="outlined-select-currency"
          select
          fullWidth
          label="Package Type"
          defaultValue="Basic"
        >
          {packages.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="filled-multiline-static"
          label="Package Contents"
          multiline
          fullWidth
          rows={6}
          placeholder={placeholder}
          
        />
      <Button>
        Add
      </Button>
      </Box>
    </Modal>
  );
}
