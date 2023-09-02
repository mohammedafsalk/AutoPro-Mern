import { CheckCircle, Delete, Preview, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
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
export default function ChargeSettingModal({ open, handleClose }) {
  const [value, setValue] = React.useState([0, 10]);
  const [price, setPrice] = React.useState("");
  const [saved, setSaved] = React.useState([]);

  React.useEffect(() => {
    let priceRanges;
    (async function () {
      const { data } = await axios.get("/service-center/priceRanges");
      if (data.err) {
        toast.error(data.message);
      } else {
       setSaved([...data.ranges])
      }
    })();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDelete = (index) => {
    let filtered = saved.filter((item, i) => i != index);
    setSaved([...filtered]);
  };
  const handleAdd = () => {
    let rangeConverted = value.join("-");
    let item = { range: rangeConverted, price };
    setSaved((prev) => [...prev, item]);
  };
  const handleSave = async () => {
    const { data } = await axios.patch("/service-center/priceRanges", {
      pickUpPrice: saved,
    });
    if (data.err) {
      toast.error(data.message);
    } else {
      handleClose();
      toast.success(data.message);
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box textAlign={"center"}>
            <Typography variant="h5" fontWeight={500}>
              Set Price Ranges
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} km`}
              max={80}
            />
            <TextField
              label="Enter Price"
              variant="outlined"
              sx={{ maxWidth: 90 }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <IconButton onClick={handleAdd}>
              <CheckCircle color="success" />
            </IconButton>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDirection={"column"}
            gap={2}
          >
            {saved.map((item, i) => (
              <Box display="flex" alignItems="center" gap={2}>
                <Typography fontWeight={500}>
                {i}  {item.range} Km : Rs.{item.price}
                </Typography>
                <IconButton onClick={() => handleDelete(i)}>
                  <Delete color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Box display="flex" justifyContent="center">
            <Button onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
