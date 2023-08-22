import React from "react";
import AdminBookingsTable from "../tables/AdminBookingTable";

export default function AdminBookings() {
  const rowHeads = ["No", "Image", "Name", "E-mail", "Contact", "Action"];
  const [bookings, setBookings] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("admin/bookings");
      if (data.err) {
        toast.error(data.message);
      } else {
        setBookings(data.bookings);
      }
    })();
  }, [refresh]);
  return (
    <>
      <AdminBookingsTable rowheads={rowHeads} bookings={bookings} />
    </>
  );
}
