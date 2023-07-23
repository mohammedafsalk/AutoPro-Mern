import {
  Box,
  MenuItem,
  Modal,
  useTheme,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import axios from "axios";

const packages = ["Basic", "Standard", "Premium"];
const initialFormData = {
  type: "Basic",
  details: "",
};

export default function AddPackage({ open, onClose, centerId }) {
  const theme = useTheme();
  const placeholder = "e.g: Oil Change, Washing, etc...";

  const [formData, setFormData] = React.useState(initialFormData);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    let { type, details } = formData;
    let { data } = await axios.post("service-center/package", {
      id: centerId,
      type,
      details,
    });
    if (data.err) {
      onClose("error");
    } else {
      onClose("success");
      setFormData(initialFormData)
    }
  };

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
      onClose={onClose}
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
          name="type"
          value={formData.type}
          onChange={handleFormData}
          label="Package Type"
          defaultValue={formData.type}
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
          name="details"
          value={formData.details}
          onChange={handleFormData}
          rows={6}
          placeholder={placeholder}
        />
        <Button onClick={handleSubmit}>Add</Button>
      </Box>
    </Modal>
  );
}
