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
import {RiDeleteBin2Fill} from 'react-icons/ri'
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
  maxWidth:"96%",
  borderRadius: 5,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

export default function InvoiceForm({ handleClose, open, item }) {
  const [data, setData] = React.useState({
    details: "",
    price: "",
  });
  const [billItems, setBillItems] = useState([]);
  useEffect(()=>{
    const billInvoice= item.invoice ?? [];
    setBillItems([...billInvoice])
  },[item])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSend = async () => {
    let { data:invoiceData } = await axios.patch("service-center/bookings/invoice", {
      invoice:billItems,
      bookingId:item._id
    });
    if (invoiceData.err) {
      toast.error(data.message);
    } else {
      handleClose();
      toast.success(data.message);
    }
  };
  const handleAdd = () => {
    setBillItems([...billItems, data]);
    setData({
      details: "",
      price: "",
    });
  };
  const handleRemove = (index) => {
    let arr = billItems.filter((item, i)=>i!=index)
    setBillItems([...arr])
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
        {billItems.map((item, index) => (
          <div key={index} className="d-flex gap-2 mt-1">
            <Box>
              <TextField
                id="filled-multiline-static"
                label="Enter Service Details"
                name="details"
                value={item.details}
                multiline
                fullWidth
                onChange={handleChange}
                variant="outlined"
                inputProps={{ readOnly: true }}
              />
            </Box>
            <Box>
              <TextField
                label="Enter Total Amount"
                onChange={handleChange}
                name="price"
                value={item.price}
                id="outlined-start-adornment"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rs</InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleRemove(index)}
              >
                <RiDeleteBin2Fill/>
              </Button>
            </Box>
          </div>
        ))}
        <div className="d-flex gap-2 mt-3">
          <Box>
            <TextField
              id="filled-multiline-static"
              label="Enter Service Details"
              name="details"
              value={data.details}
              multiline
              fullWidth
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
          <Box>
            <TextField
              label="Enter Amount"
              onChange={handleChange}
              name="price"
              type="number"
              value={data.price}
              id="outlined-start-adornment"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rs</InputAdornment>
                ),
              }}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              variant="contained"
              color="info"
              className="w-100"
              disabled={data.details == "" || data.price == ""}
              onClick={() => handleAdd()}
            >
              Add
            </Button>
          </Box>
        </div>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            color="primary"
            className="w-100"
            disabled={!billItems[0]}
            onClick={() => handleSend()}>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
