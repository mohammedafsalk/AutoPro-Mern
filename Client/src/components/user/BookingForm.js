import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

export default function BookingForm({
  openBooking,
  onCloseBooking,
  packageType,
}) {
  return (
    <div>
      <Dialog open={openBooking} onClose={onCloseBooking}>
        <Box sx={{ paddingX: 3 }}>
          <DialogTitle textAlign={"center"}>Booking Details</DialogTitle>

          <Grid container spacing={3} direction="row" justifyContent="center">
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Owner Name"
                type="text"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Contact Number"
                inputProps={{ maxLength: 10, pattern: [0 - 9] }}
                type="tel"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Vehicle Reg Number"
                placeholder="eg:KL-XX-XX-XXXX"
                type="email"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Package Selected"
                type="text"
                defaultValue={packageType}
                inputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="date"
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button>Cancel</Button>
            <Button>Confirm</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
