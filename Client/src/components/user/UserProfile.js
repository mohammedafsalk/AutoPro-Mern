import React, {useState} from "react";
import UserNav from "./UserNav";
import {
  Container,
  Tab,
  Tabs,
  setRef,
} from "@mui/material";
import {
  AccountCircle,
  EventNote,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import AttendingUsers from "./UserBookingCards";
import ProfileCard from "./ProfileCard";

export default function UserProfile() {
  const user = useSelector((state) => {
    return state.user.details;
  });

  const [bookings, setBookings] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [refresh, setRefresh] = useState(false)


  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("user/bookings");
      if (!data.err) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    })();
  }, [refresh]);

  return (
    <>
      <UserNav />
      <Toaster />
      <Container
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs
          variant="standard"
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
          sx={{ mb: 5 }}
        >
          <Tab icon={<AccountCircle />} label="PROFILE" />
          <Tab icon={<EventNote />} label="BOOKINGS" />
        </Tabs>
        {value === 0 && <ProfileCard user={user} />}
        {value === 1 && <AttendingUsers setRefresh={setRefresh} bookings={bookings} />}
      </Container>
    </>
  );
}
