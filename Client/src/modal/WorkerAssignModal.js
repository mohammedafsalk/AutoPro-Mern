import React from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 3,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

export default function AssignWorkers({ handleClose, open, item }) {
  const [workers, setWorkers] = React.useState([]);
  const [assign, setAssign] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAssign(e.target.value);
  };

  if (workers.length === 0) {
    style.justifyContent = "center";
    style.alignItems = "center";
  } else {
    if (style.hasOwnProperty("alignItems")) {
      delete style.alignItems;
    }
  }

  const handleAddWorkers = () => {
    navigate("/service-center/workers");
  };

  const handleSave = async () => {
    let { data } = await axios.patch("service-center/bookings/assignWork", {
      bookingId: item._id,
      id: assign,
    });
    if (data.err) {
      toast.error(data.message);
    } else {
      toast.success("Assigned Successfully!");
      handleClose();
    }
  };
  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("service-center/workers");
      setWorkers(data.workers);
    })();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {workers.length === 0 ? (
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              type="button"
              variant="contained"
              onClick={handleAddWorkers}
              sx={{ color: "white", bgcolor: "black" }}
            >
              Add Workers
            </Button>
          </Box>
        ) : (
          <>
            <Box textAlign={"center"}>
              <Typography variant="h5" fontWeight={500}>
                Available Workers
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {workers &&
                  workers.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      onChange={handleChange}
                      value={item._id}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
              </RadioGroup>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                type="button"
                variant="contained"
                onClick={handleSave}
                sx={{ color: "white", bgcolor: "black" }}
              >
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
