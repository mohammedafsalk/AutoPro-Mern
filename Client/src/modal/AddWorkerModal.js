import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import validatePassword from "../../src/helpers/passwordValidate";
import loadingReducer from "../reducers/loadingReducer";
import axios from "axios";
import { BeatLoader } from "react-spinners";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddWorkerModal({ handleClose, open, setRefresh }) {
  const [state, setState] = React.useReducer(loadingReducer, false);
  const [formData, setFormdata] = React.useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = React.useState("");
  const isAnyFieldEmpty = Object.values(formData).some((value) => value === "");

  React.useEffect(() => {
    if (formData.password) {
      const passwordValidation = validatePassword(formData.password);
      !validatePassword(formData.password).status
        ? setErr(
            passwordValidation.message[0].message.replace("string", "password")
          )
        : setErr("");
    }
    if (formData.confirmPassword) {
      {
        formData.password !== formData.confirmPassword
          ? setErr("Password Not Matching")
          : setErr("");
      }
    }
  }, [formData.password, formData.confirmPassword]);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setState({ type: "start" });
    let { name, email, password, mobile } = formData;
    let { data } = await axios.post("service-center/workers", {
      name,
      email,
      password,
      mobile,
    });
    if (data.err) {
      setState({ type: "stop" });
      handleClose("error");
      setRefresh((prev) => !prev);
    } else {
      setState({ type: "stop" });
      handleClose("success");
      setRefresh((prev) => !prev);
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
            Enter Worker Details
          </Typography>
        </Box>
        <Box py={2} display={"flex"} flexDirection={"column"} gap={3}>
          <TextField
            onChange={handleFormData}
            value={formData.name}
            variant="standard"
            name="name"
            type="text"
            label="Worker Name"
            fullWidth
          />
          <TextField
            onChange={handleFormData}
            value={formData.email}
            variant="standard"
            name="email"
            type="email"
            label="Email"
            fullWidth
          />
          <TextField
            onChange={handleFormData}
            value={formData.mobile}
            name="mobile"
            variant="standard"
            type="tel"
            label="Mobile"
            fullWidth
          />
          <TextField
            onChange={handleFormData}
            value={formData.password}
            variant="standard"
            name="password"
            type="password"
            label="Password"
            fullWidth
          />
          {err && <Typography color="error">{err}</Typography>}
          <TextField
            onChange={handleFormData}
            value={formData.confirmPassword}
            variant="standard"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            fullWidth
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          {state.loading ? (
            <BeatLoader color="blue" loading={state.loading} />
          ) : (
            <Button
              type="button"
              disabled={isAnyFieldEmpty}
              onClick={handleSave}
              variant="contained"
              sx={{ color: "white", bgcolor: "black" }}
            >
              Save
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
