import React from "react";
import AdminNav from "./AdminNav";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import {
  GarageOutlined,
  MonetizationOnOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AdminDashBoard() {
  const [users, setUsers] = React.useState(null);
  const [centers, setCenters] = React.useState(null);
  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("admin/");
      if (data.err) {
        toast.error(data.message);
      } else {
        setUsers(data.usersCount);
        setCenters(data.centerCount);
      }
    })();
  }, []);
  return (
    <>
      <AdminNav />
      <Container sx={{ marginTop: 5 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item maxHeight="150px" width="300px" xs={12} sm={4} md={4}>
            <Paper
              elevation={5}
              sx={{
                height: "100%",
                maxHeight: "300px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "30px",
                padding: "10px",
              }}
            >
              <MonetizationOnOutlined
                sx={{ color: "#6BAF76" }}
                fontSize="large"
              />
              <Box textAlign="center">
                <Typography variant="h5" fontWeight={500}>
                  Total Revenue
                </Typography>
                <Typography variant="h6" fontWeight={300}>
                  Count
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item maxHeight="150px" width="300px" xs={12} sm={4} md={4}>
            <Paper
              elevation={5}
              sx={{
                height: "100%",
                maxHeight: "300px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "30px",
                padding: "10px",
              }}
            >
              <GarageOutlined sx={{ color: "#DA3E40" }} fontSize="large" />
              <Box textAlign="center">
                <Typography variant="h5" fontWeight={500}>
                  Total Centers
                </Typography>
                <Typography variant="h6" fontWeight={300}>
                  {centers}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item maxHeight="150px" width="300px" xs={12} sm={4} md={4}>
            <Paper
              elevation={5}
              sx={{
                height: "100%",
                maxHeight: "300px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "30px",
                padding: "10px",
              }}
            >
              <PeopleAltOutlined sx={{ color: "#DD9167" }} fontSize="large" />
              <Box textAlign="center">
                <Typography variant="h5" fontWeight={500}>
                  Total Users
                </Typography>
                <Typography variant="h6" fontWeight={300}>
                  {centers}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
