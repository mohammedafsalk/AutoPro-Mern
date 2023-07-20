import React from "react";
import { useDispatch } from "react-redux";
import {
  Image,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Stack,
  Container,
  Box,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import Permission from "../../../src/assets/images/Permission waiting.jpg";
import Rejected from "../../../src/assets/images/Rejected.jpg";
import { Toaster, toast } from "react-hot-toast";
import Backdropspinner from "../Loader/BackdropSpinner";

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

export default function PermissionPage({ center }) {
  const [open, setOpen] = React.useState(false);
  const [modalType, SetModalType] = React.useState(null);
  const [updateProof, setUpdateproof] = React.useState(null);
  const [upload, setUpload] = React.useState(null);
  const [view, setView] = React.useState(false);
  const [sample, setSample] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [openLoader, setOpenLoader] = React.useState(false);

  const handleView = () => {
    setView((prev) => !prev);
  };

  const handleProofChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUpdateproof(URL.createObjectURL(file));
      proofToBase(file);
    } else {
      toast.error("Please Select Proper Image");
      setUpdateproof(null);
    }
  };

  const proofToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUpload(reader.result);
    };
  };

  const handleOpen = (type) => {
    if (type === "details") {
      SetModalType(true);
    } else {
      SetModalType(false);
    }
    setOpen(true);
  };
  const handleClose = () => {
    SetModalType("");
    setOpen(false);
  };
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setOpenLoader(true);
    let { email } = center;
    let image = upload;
    handleClose();
    let { data } = await axios.patch("service-center/auth/reApply", {
      email,
      image,
    });
    if (!data.err) {
      setOpenLoader(false);
      toast.success("Proof Updated Successfully");
    } else {
      handleClose();
      toast.error("Something Went Wrong,Try Again");
    }
  };

  const handleLogout = async () => {
    await axios.get("/service-center/auth/logout");
    dispatch({ type: "refresh" });
  };

  return (
    <>
    <div>
      <Toaster />
      <AppBar position="sticky">
        <Toolbar
          sx={{
              backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
        }}
        >
          <Typography variant="h6" fontWeight={500} color="black">
            AUTO PRO
          </Typography>
          <Avatar onClick={(e) => setShow(true)} />
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={show}
            onClose={(e) => setShow(false)}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 50, left: 900 }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container
        color="primary"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        {sample ? (
            <Stack sx={{ maxWidth: "600px", width: "100%", ma }}>
            <img src={Permission} alt="" />
            <Typography fontWeight={500} textAlign="center">
              Your Permission Is Being Processed.You Will Notified Through Your
              Registered Mail.
            </Typography>
          </Stack>
        ) : (
          <>
            <Stack sx={{ maxWidth: "600px", width: "100%" }}>
              <img src={Rejected} alt="" />
              <Typography fontWeight={500} textAlign="center">
                Your Permission Is Rejected Due To Some Issues
              </Typography>
            </Stack>
            <Button onClick={() => handleOpen("details")} variant="contained">
              View Details
            </Button>
            <Button onClick={() => handleOpen("reApply")} variant="outlined">
              Re Apply
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {modalType ? (
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    color="black"
                    variant="h6"
                    component="h2"
                  >
                    Details Of Your Request
                  </Typography>
                  {center.rejectMessage}
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2 }}
                  ></Typography>
                </Box>
              ) : (
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    color="black"
                    variant="h6"
                    component="h2"
                    >
                    Change Your Proof
                  </Typography>
                  <TextField
                    type="file"
                    onChange={handleProofChange}
                    required
                    id="outlined-required"
                    sx={{ marginTop: "10px" }}
                  />
                  {view && updateProof && (
                      <Box sx={{ width: "100%", marginTop: "10px" }}>
                      <img
                        src={updateProof}
                        width="100%"
                        height="100%"
                        alt=""
                      />
                    </Box>
                  )}
                  <Box
                    sx={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "space-between",
                        marginTop: "20px",
                    }}
                  >
                    <Box>
                      <Image
                        fontSize="large"
                        color="primary"
                        onClick={handleView}
                      />
                    </Box>
                    <Box
                      sx={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "space-between",
                        }}
                    >
                      <Button color="success" onClick={handleSubmit}>
                        Submit
                      </Button>
                      <Button color="error" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Modal>
          </>
        )}
      </Container>
    </div>
<Backdropspinner  openLoader={openLoader} />
</>
  );
}
