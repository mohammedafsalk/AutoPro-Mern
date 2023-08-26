import React from "react";
import AdminBookingsTable from "../tables/AdminBookingTable";
import axios from "axios";
import AdminNav from "./AdminNav";
import img from "../../assets/images/No User.jpg";
import {
  Box,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
const options = [
  { value: "", label: "All" },
  { value: "Waiting For Pickup", label: "Waiting" },
  { value: "Delivered", label: "Delivered" },
  { value: "Paid", label: "Paid" },
  { value: "Cancelled", label: "Cancelled" },
];
export default function AdminBookings() {
  const rowHeads = ["No", "UserName", "CenterName", "Date", "Amount", "Status"];
  const [bookings, setBookings] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [status, setStatus] = React.useState("");
  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get(`admin/bookings?status=${status}`);
      if (data.err) {
        toast.error(data.message);
      } else {
        setBookings(data.bookings);
      }
    })();
  }, [refresh, status]);

  const handleValue = (e) => {
    setStatus(e.target.value);
  };
  console.log(status);
  return (
    <>
      <AdminNav />
      <Container fixed sx={{ marginTop: "20px" }}>
        <Box mt={4} mb={4}>
          <Grid container direction={"row"} gap={2}>
            <Grid item minWidth={100}>
              <TextField
                select
                label="Status"
                onChange={handleValue}
                fullWidth
                size="small"
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item minWidth={100}>
              <TextField type="date" fullWidth size="small" />
            </Grid>
          </Grid>
        </Box>
        {bookings.length === 0 ? (
          <Box
            width="100%"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box component="img" maxWidth="300px" src={img} />
            <Typography variant="h5">No Bookings Found!</Typography>
          </Box>
        ) : (
          <>
            <AdminBookingsTable rowheads={rowHeads} bookings={bookings} />
          </>
        )}
      </Container>
    </>
  );
}
