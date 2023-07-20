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
  DialogTitle,
  Grid,
  styled,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { CheckCircle, DoDisturb } from "@mui/icons-material";
import img from "../../../assets/images/noRequests.jpg";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CenteredContainer = styled(Grid)(({ theme }) => ({
  minHeight: "100vh",
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
  },
}));

export default function AdminReq() {
  const [centers, setCenters] = React.useState([]);
  const [viewProof, setViewProof] = React.useState(null);
  const [rejectText, setRejectText] = React.useState(null);
  const [mail, setMail] = React.useState({
    accept: "",
    reject: "",
  });
  const [rejectMsg, setrejectMsg] = React.useState("");
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
    setrejectMsg("");
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

  const handleRejection = async (mail) => {
    let { data } = await axios.post("admin/requests/reject", {
      email: mail,
      rejectionMsg: rejectMsg,
    });
    if (data.err) {
      toast.error(data.message);
    } else {
      setRefresh((prev) => !prev);
      toast.success(data.message);
      setOpenRjct(false);
    }
  };

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("admin/requests");
      setCenters(data.centerRequests);
    })();
  }, [refresh]);

  return (
    <>
      <AdminNav />
      {centers.length === 0 ? (
        <CenteredContainer
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <img src={img} height="400px" width="400px" alt="No Messages" />
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textSecondary">
              No new Requests
            </Typography>
          </Grid>
        </CenteredContainer>
      ) : (
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
                            handleClickOpenCnfrm(
                              setMail((prev) => ({
                                ...prev,
                                accept: item.email,
                              }))
                            )
                          }
                        >
                          <CheckCircle color="success" />
                        </IconButton>
                        {item.rejectMessage.trim() === "" ? (
                          <IconButton
                            onClick={() =>
                              handleClickOpenRjct(
                                setMail((prev) => ({
                                  ...prev,
                                  reject: item.email,
                                }))
                              )
                            }
                          >
                            <DoDisturb color="error" />
                          </IconButton>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            Rejected
                          </Typography>
                        )}
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
      )}
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
      <>
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
            <Button onClick={() => handleConfirm(mail.accept)} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
      <>
        <Dialog open={openRjct} onClose={handleCloseRjct}>
          <DialogTitle>Are You Sure To Reject?</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={rejectMsg}
              onChange={(e) => setrejectMsg(e.target.value)}
              id="outlined-multiline-static"
              label="Reason For Rejection"
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRjct}>Cancel</Button>
            <Button onClick={() => handleRejection(mail.reject)}>Reject</Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}
