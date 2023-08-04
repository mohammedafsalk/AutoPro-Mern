import React from "react";
import UserNav from "./UserNav";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Typography as Joygraphy } from "@mui/joy";
import img from "../../assets/images/avatar.png";
import { Call, FmdGood, VerifiedOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Backdropspinner from "../Loader/BackdropSpinner";
import { grey } from "@mui/material/colors";
import ChooseCustomPackageModal from "./ChooseCustomPackageModal";
import BookingForm from "./BookingForm";
import MessageModal from "./MessageModal";
import loadingReducer from "../../reducers/loadingReducer";

export default function SelectPackage() {
  const [state, setState] = React.useReducer(loadingReducer, false);

  const { id } = useParams();
  const [center, setCenter] = React.useState({});
  const [types, setTypes] = React.useState([]);
  const [custom, setCustom] = React.useState([]);
  const [customPackage, setCustomPackage] = React.useState([]);
  const [packageType, setPackageType] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openBooking, setOpenBooking] = React.useState(false);
  const [openMsgModal, setOpenMsgModal] = React.useState(false);

  const handleClickOpenBooking = () => {
    setState({ type: "stop" });
    setOpenBooking(true);
  };

  const handleCloseBooking = () => {
    setOpenBooking(false);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenMsg = () => setOpenMsgModal(true);
  const handleCloseMsg = (type) => {
    if (type === "proceed") {
      setState({ type: "start" });
      setTimeout(() => {
        handleClickOpenBooking();
      }, 1000);
    }
    setOpenMsgModal(false);
  };

  const handleAdd = (id) => {
    let items = types.find((value) => value._id === id);
    setPackageType(items.packageType);
    handleOpenMsg();
  };

  React.useEffect(() => {
    (async function () {
      setState({ type: "start" });
      let { data } = await axios.post("user/service-centers", { id });
      if (data.err) {
        console.log(data.message);
      } else {
        setCenter(data.center);
        setTypes(data.packages);
        setCustom(data.center.customPackages);
        setState({ type: "stop" });
      }
    })();
  }, []);

  return (
    <>
      <UserNav />
      <Backdropspinner openLoader={state.loading} />
      <Container
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            marginBottom: 4,
            padding: 3,
            width: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
            borderRadius: 3,
          }}
        >
          <Box sx={{ width: "70%", height: "140px", overflow: "hidden" }}>
            <Box
              component={"img"}
              src={img}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Typography
            fontWeight={500}
            gutterBottom
            variant="h5"
            component="div"
          >
            {center.name}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <FmdGood color="error" />
            <Typography variant="body1" fontWeight={300} color={grey[800]}>
              {center.location}, {center.district}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Call />
            <Typography variant="body1" fontWeight={300} color={grey[800]}>
              {center.mobile}
            </Typography>
          </Box>
        </Paper>
        <Typography
          component={"span"}
          variant="h5"
          fontWeight={500}
          sx={{ borderBottom: "1px solid black" }}
        >
          Select Package
        </Typography>
        <Button variant="outlined" onClick={handleOpen}>
          Set Custom Package
        </Button>

        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {types &&
            types.map((type, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper
                  elevation={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    minHeight: 240,
                    gap: 1,
                    maxWidth: 500,
                    borderRadius: 3,
                  }}
                >
                  <Box display={"flex"} gap={2} padding={1}>
                    <Box
                      sx={{
                        width: "50%",
                        height: "100%",
                        overflow: "hidden",
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      <Box
                        component={"img"}
                        src={type.packageImage}
                        sx={{ width: "100%", height: 100 }}
                      />
                      <Typography variant="h6">{type.packageType}</Typography>
                    </Box>
                    {type.packageDetails && (
                      <Grid container direction={"row"}>
                        {type.packageDetails.map((item) => (
                          <Grid item xs={12}>
                            <Box
                              display={"flex"}
                              gap={1}
                              padding={1}
                              alignItems={"center"}
                            >
                              <VerifiedOutlined color="success" />
                              <Typography variant="h7" lineHeight={1}>
                                {item}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Box>
                  <Box padding={2} display={"flex"}>
                    <Box>
                      <Joygraphy
                        level="title-lg"
                        sx={{ mt: 1, fontWeight: "xl" }}
                      >
                        RS. 350
                      </Joygraphy>
                      <Joygraphy level="body-sm">
                        (This Amount Will Get Deducted At Delivery Time)
                      </Joygraphy>
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      {" "}
                      <Button
                        onClick={() => handleAdd(type._id)}
                        color="success"
                        variant="contained"
                      >
                        Choose
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Container>
      <ChooseCustomPackageModal
        open={open}
        onClose={handleClose}
        custom={custom}
        setCustomPackage={setCustomPackage}
        handleOpenMsg={handleOpenMsg}
      />
      <BookingForm
        openBooking={openBooking}
        onCloseBooking={handleCloseBooking}
        packageType={packageType}
      />
      <MessageModal openMsg={openMsgModal} onCloseMsg={handleCloseMsg} />
    </>
  );
}
