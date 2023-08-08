import React from "react";
import UserNav from "./UserNav";
import img from "../../assets/images/avatar.png";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import AttendingUsers from "./UserBookingCards";

export default function UserProfile() {
  const user = useSelector((state) => {
    return state.user.details;
  });

  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("user/bookings");
      if (!data.err) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    })();
  }, []);

  return (
    <>
      <UserNav />
      <Toaster />
      <Container sx={{ mt: 5 }}>
        <Card
          sx={{
            maxWidth: 345,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Avatar
              component={"image"}
              src={img}
              sx={{ width: 200, height: 200 }}
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Box textAlign={"center"}>
              <Typography variant="h5" fontWeight={500}>
                {user?.name}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="body1" fontWeight={300}>
                {user?.email}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button color="error" variant="contained">
              LogOut
            </Button>
          </Box>
        </Card>
        <AttendingUsers bookings={bookings}  />
      </Container>
    </>
  );
}
