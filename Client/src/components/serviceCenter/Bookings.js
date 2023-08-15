import React from "react";
import NavBar from "./Navbar";
import { Container } from "@mui/material";
import ServiceCenterBookings from "../tables/ServiceCenterBookings";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import BookingDetails from "../../modal/BookingDetailsModal";
export default function Bookings() {
  let rowHeads = ["No", "Cust.Name", "Contact No", "Date", "Status", "Details", "Worker", "Invoice"];
  const [bookings, setBookings] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false)
  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("service-center/bookings");
      console.log(data)
      if (data.err) {
        toast.error(data.message);
      } else {
        setBookings(data.bookings);
      }
    })();
  }, [refresh]);
  return (
    <>
      <NavBar />
      <Toaster/>
      <Container sx={{ mt: 4 }}>
        <ServiceCenterBookings rowheads={rowHeads} setRefresh={setRefresh} bookings={bookings} />
      </Container>
    </>
  );
}
