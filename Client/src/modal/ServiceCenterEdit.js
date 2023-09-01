import { Avatar, Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import loadingReducer from "../../src/reducers/loadingReducer";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: { md: "column", xs: "row" },
  gap: 3,
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "96%",
  borderRadius: 5,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};
export default function ServiceCenterEdit({
  handleClose,
  open,
  serviceCenter,
}) {
  const [state, setState] = React.useReducer(loadingReducer, false);
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    name: serviceCenter.details.name,
    mobile: serviceCenter.details.mobile,
    img: serviceCenter.details.logo?.url,
  });
  const [avatarSrc, setAvatarSrc] = React.useState(
    serviceCenter.details.logo?.url
  );
  const [finalImg, seFinalImg] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatarSrc = URL.createObjectURL(file);
      setAvatarSrc(newAvatarSrc);
      baseChanger(file);
    }
  };
  const openForm = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const baseChanger = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      seFinalImg(reader.result);
    };
  };

  const handleSave = async () => {
    setState({ type: "start" });
    const { name, mobile } = formData;
    const { data } = await axios.patch("service-center/profile", {
      name,
      mobile,
      logo: finalImg,
    });
    if (data.err) {
      toast.error(data.message);
      setState({ type: "stop" });
    } else {
      setState({ type: "stop" });
      dispatch({ type: "refresh" });
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          <Box display={"flex"} justifyContent={"center"}>
            <Avatar
              variant="square"
              component={Button}
              onClick={openForm}
              alt="Remy Sharp"
              src={avatarSrc}
              sx={{ width: 200, height: 200 }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>
          <Box display={"flex"} gap={2} flexDirection={{ xs: "column" }}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
              gap={2}
            >
              <TextField
                value={formData.name}
                label="Name"
                onChange={handleChange}
                name="name"
                variant="standard"
              />
              <TextField
                value={formData.mobile}
                label="Mobile"
                onChange={handleChange}
                name="mobile"
                variant="standard"
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
                color="primary"
                variant="contained"
                onClick={handleSave}
              >
                {state.loading ? (
                  <BeatLoader  color="white" />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
