import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Typography,
} from "@mui/material";

import axios from "axios";
import dayjs from "dayjs";
import { Toaster, toast } from "react-hot-toast";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 3,
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  minHeight: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

export default function WorkerBookingDetails({ handleClose, open, item }) {
  let currDate = new Date();
  let formattedDate = dayjs(currDate).format("DD-MM-YYYY");

  const [change, setChange] = React.useState({
    pickup: false,
    delivery: false,
  });

  const handleChange = (e) => {
    if (e.target.checked) {
      setChange((prev) => ({ ...prev, pickup: true }));
    } else {
      setChange((prev) => ({ ...prev, pickup: false }));
    }
  };
  const handleChangeDelivery = (e) => {
    if (e.target.checked) {
      setChange((prev) => ({ ...prev, delivery: true }));
    } else {
      setChange((prev) => ({ ...prev, delivery: false }));
    }
  };

  const handleSave = async (id, status) => {
    if (status === "Waiting For Pickup") {
      let { data } = await axios.patch("worker/view-bookings", {
        status: "Vehicle Picked Up",
        id: id,
      });
      if (data.err) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        handleClose();
      }
    } else if (status === "Paid") {
      let { data } = await axios.patch("worker/view-bookings", {
        status: "Delivered",
        id: id,
      });
      if (data.err) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        handleClose();
      }
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
            Details
          </Typography>
        </Box>
        <Box textAlign={"center"}>
          <Typography fontWeight={500} gutterBottom color={"black"}>
            {item.vehicleName}
          </Typography>
          <Typography fontWeight={500} gutterBottom color={"black"}>
            {item.brand}
          </Typography>
          <Typography fontWeight={500} gutterBottom color={"black"}>
            {item.vehicleNumber}
          </Typography>
          <Typography fontWeight={500} gutterBottom color={"black"}>
            {item.place}
          </Typography>
          <Typography fontWeight={500} color={"black"}>
            {item.address}
          </Typography>
        </Box>
        {item.date === formattedDate &&
          item.status === "Waiting For Pickup" && (
            <Box display={"flex"} justifyContent={"center"}>
              <FormControlLabel
                onChange={handleChange}
                control={<Checkbox />}
                label="Proceed PickUp"
              />
            </Box>
          )}
        {item.status === "Paid" && (
          <Box display={"flex"} justifyContent={"center"}>
            <FormControlLabel
              onChange={handleChangeDelivery}
              control={<Checkbox />}
              label="Delivery Completed"
            />
          </Box>
        )}
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            onClick={
              change.delivery || change.pickup
                ? () => handleSave(item._id, item.status)
                : handleClose
            }
            type="button"
            variant="contained"
            sx={{ color: "white", bgcolor: "black" }}
          >
            {change.delivery || change.pickup ? "Save" : "Close"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
