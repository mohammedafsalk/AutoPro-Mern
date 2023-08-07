import React from "react";
import { Paper, Container, Grid, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import UserNav from "./UserNav";
import { Typography, Button } from "@mui/joy";
import BasicModal from "./Calender";
import axios from "axios";

export default function BookingForm() {
  const location = useLocation();
  const { id, customPackage, packageType } = location.state;
  const [slots,setSlots] = React.useState([])
  React.useEffect(() => {
    (async function () {
      try {
        await axios.get("user/booking-details", {
          params: { serviceCenterId: id },
        });
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, [id]);
  return (
    <>
      <UserNav />
      <Container
        fixed
        sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}
      >
        <Paper
          elevation={3}
          sx={{ minHeight: "500px", width: "600px", textAlign: "center" }}
        >
          <Typography color="neutral" level="h2" noWrap={false} variant="plain">
            Booking Details
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            padding={3}
          >
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                color="secondary"
                fullWidth
                id="email"
                label="Owner Name"
                name="name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="number"
                label="Contact No"
                name="phone"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Vehicle Reg No"
                name="regno"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Manufacture"
                name="brand"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Package Type"
                defaultValue={packageType}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BasicModal />
            </Grid>
          </Grid>
          <Button color="primary" size="md">
            Book Now
          </Button>
        </Paper>
      </Container>
    </>
  );
}
