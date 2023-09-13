import React from "react";
import WorkerNav from "./WorkerNav";
import BookingList from "../tables/WorkerBookingLIst";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Container } from "@mui/material";

export default function WorkerHome() {
  let rowHeads = ["No", "Date", "Place","Status" ,"Action"];
  const [bookings, setBookings] = React.useState([]);
  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("worker/view-bookings");
      if (!data.err) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    })();
  }, []);
  return (
    <>
      <WorkerNav />
      <Toaster />
      <Container sx={{mt:5}} >
        <BookingList bookings={bookings} rowHeads={rowHeads} />
      </Container>
    </>
  );
}
