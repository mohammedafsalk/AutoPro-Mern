import React from "react";
import AdminNav from "../AdminNav/AdminNav";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { CheckCircle, DoDisturb } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function AdminReq() {
  const ref = React.useRef();


  const [centers, setCenters] = React.useState([]);
  const [viewProof, setViewProof] = React.useState(null);
  const [mail, setMail] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openCnfrm, setOpenCnfrm] = React.useState(false);
  const [openRjct, setOpenRjct] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const handleClickOpenCnfrm = () => {
    setOpenCnfrm(true);
  };

  const handleCloseCnfrm = () => {
    setOpenCnfrm(false);
  };

  const handleClickOpenRjct = () => {
    setOpenRjct(true);
  };

  const handleCloseRjct = () => {
    setOpenRjct(false);
  };

  const handleOpen = (url) => {
    setViewProof(url);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleConfirm = (mail) => {
    (async function () {
      let { data } = await axios.post("admin/requests/accept", { email: mail });
      if (!data.err) {
        setRefresh((prev) => !prev);
        setOpenCnfrm(false);
        toast.success(data.message);
      } else {
        toast.error("Some Error Occured");
      }
    })();
  };

  const handleRejection = (e) => {
    e.preventDefault();
    console.log("kkkk");
  };

  React.useEffect(() => {
    const element = ref.current;
    console.log(element); // 👈️ element here
  }, []);

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("admin/requests");
      setCenters(data.centerRequests);
    })();
  }, [refresh]);

  return (
    <>
      <AdminNav />
      <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <Toaster />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          {centers &&
            centers.map((item, i) => (
              <Grid xs={12} sm={6} md={3}>
                <Card sx={{ maxWidth: 345, padding: "10px" }} key={i}>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    fontWeight="500"
                    color="black"
                  >
                    {item.name}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="194"
                    image={item.logo.url}
                    alt="Paella dish"
                  />
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography
                      variant="h7"
                      color="text.primary"
                      sx={{ fontWeight: "500" }}
                    >
                      Location:{" "}
                      <Typography variant="h7" fontWeight={3}>
                        {item.location}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="h7"
                      color="text.primary"
                      sx={{ fontWeight: "500" }}
                    >
                      District:{" "}
                      <Typography variant="h7" fontWeight={3}>
                        {item.district}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="h7"
                      color="text.primary"
                      sx={{ fontWeight: "500" }}
                    >
                      Contact No:{" "}
                      <Typography variant="h7" fontWeight={3}>
                        Some Location
                      </Typography>
                    </Typography>
                  </CardContent>
                  <Grid container justifyContent="space-around">
                    <CardActions disableSpacing>
                      <IconButton
                        onClick={() =>
                          handleClickOpenCnfrm(setMail(item.email))
                        }
                      >
                        <CheckCircle color="success" />
                      </IconButton>
                      <IconButton onClick={handleClickOpenRjct}>
                        <DoDisturb color="error" />
                      </IconButton>
                    </CardActions>
                    <Button onClick={() => handleOpen(item.proof.url)}>
                      View Proof
                    </Button>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
          }}
        >
          <img src={viewProof} alt="Modal Image" style={{ width: "100%" }} />
        </Box>
      </Modal>
      <div>
        <Dialog
          open={openCnfrm}
          onClose={handleCloseCnfrm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are You Sure To Confirm ?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseCnfrm}>Close</Button>
            <Button onClick={() => handleConfirm(mail)} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <form>
        <Dialog open={openRjct} onClose={handleCloseRjct}>
          <DialogTitle>Are You Sure To Reject?</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              ref={ref}
              id="outlined-multiline-static"
              label="Reason For Rejection"
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRjct}>Cancel</Button>
            <Button type="submit" onClick={handleRejection}>
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
}
