import {
  Avatar,
  Box,
  Button,
  styled,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { VerifiedOutlined } from "@mui/icons-material";
import bannerImage from "../../assets/images/bannerDemo.jpeg";
import servicesImage from "../../assets/images/services.jpeg";
import React from "react";
import { Link } from "react-router-dom";

const Mybtn = styled("Button")(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.2s ease-in-out",
  position: "absolute",
  left: "calc(50% - 100px)",
  bottom: "100px",

  [theme.breakpoints.down("sm")]: {
    left: "calc(50% - 75px)",
    bottom: "0px",
    padding: "8px 18px",
  },

  "&:hover": {
    background: theme.palette.primary.dark,
  },
}));

export default function Userbanner() {
  return (
    <Container
      sx={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box borderRadius={10} position="relative">
        <img src={bannerImage} width="100%" height="100%" alt="" />
        <Mybtn>
          <Link style={{color:"white"}} to="/chooseServiceCenter" >Book Now</Link>
        </Mybtn>
      </Box>
      <Grid container>
        <Grid item md={6}>
          <Box>
            <img src={servicesImage} style={{ width: "100%" }} alt="" />
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box padding={5}>
            <Typography
              variant="h3"
              fontWeight={500}
              sx={{
                borderBottom: "1px solid #333",
                padding: "10px",
                fontSize: { xs: "2rem" },
              }}
            >
              Our Services
            </Typography>

            <ListItem divider>
              <ListItemAvatar>
                <VerifiedOutlined color="success" />
              </ListItemAvatar>
              <ListItemText
                primary="Quality Repairs"
                secondary="We offer high-quality repairs for various vehicle issues."
              />
            </ListItem>
            <ListItem divider>
              <ListItemAvatar>
                <VerifiedOutlined color="success" />
              </ListItemAvatar>
              <ListItemText
                primary="Expert Technicians"
                secondary="Our service center is staffed with expert technicians to ensure the best service."
              />
            </ListItem>
            <ListItem divider>
              <ListItemAvatar>
                <VerifiedOutlined color="success" />
              </ListItemAvatar>
              <ListItemText
                primary="Quick Turnaround"
                secondary="We provide quick turnaround times for all repair services."
              />
            </ListItem>
            <ListItem divider>
              <ListItemAvatar>
                <VerifiedOutlined color="success" />
              </ListItemAvatar>
              <ListItemText
                primary="Affordable Prices"
                secondary="Our services come at affordable and competitive prices."
              />
            </ListItem>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
