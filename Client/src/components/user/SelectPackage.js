import React from "react";
import UserNav from "./UserNav";
import {
  Avatar,
  Box,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import img from "../../assets/images/avatar.png";
import { CheckBox, VerifiedOutlined } from "@mui/icons-material";

export default function SelectPackage() {
  return (
    <>
      <UserNav />
      <Container
        sx={{
          minHeight: "70dvh",
          marginY: "20px",
          display: "flex",
        }}
      >
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width="50%"
            minWidth="230px"
            height="40%"
            maxHeight="280px"
            padding={4}
            component="div"
            boxShadow={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={img}
              sx={{ objectFit: "cover", width: "100%", maxWidth: "150px" }}
            />
            <Typography variant="h5" fontWeight={500}>
              Center Name
            </Typography>
          </Box>
        </Box>
        <Box flex={1} padding={2} display="flex" flexDirection="column" gap={4}>
          <Box
            width="80%"
            minWidth="210px"
            minHeight="204px"
            display="flex"
            justifyContent="space-around"
            boxShadow={2}
          >
            <Box
              width="90px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar
                component="image"
                srcSet=""
                src={img}
                sx={{ width: "100%", height: "100px" }}
              />
              <Typography variant="h6" fontWeight={500}>
                Package
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={0.5}>
              <ListItem>
                <ListItemAvatar>
                  <VerifiedOutlined color="success" />
                </ListItemAvatar>
                <ListItemText primary="Quality Repairs" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <VerifiedOutlined color="success" />
                </ListItemAvatar>
                <ListItemText primary="Expert Technicians" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <VerifiedOutlined color="success" />
                </ListItemAvatar>
                <ListItemText primary="Quick Turnaround" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <VerifiedOutlined color="success" />
                </ListItemAvatar>
                <ListItemText primary="Affordable Prices" />
              </ListItem>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
