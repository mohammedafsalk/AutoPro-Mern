import React from "react";
import UserNav from "./UserNav";
import {
  Avatar,
  Box,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import img from "../../assets/images/avatar.png";
import { VerifiedOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Backdropspinner from "../Loader/BackdropSpinner";

export default function SelectPackage() {
  const { id } = useParams();
  const [center, setCenter] = React.useState({});
  const [types, setTypes] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      setOpenLoader(true);
      let { data } = await axios.post("user/service-centers", { id });
      if (data.err) {
        console.log(data.message);
      } else {
        setCenter(data.center);
        setTypes(data.packages);
        setOpenLoader(false);
      }
    })();
  }, []);

  return (
    <>
      <UserNav />
      <Backdropspinner openLoader={openLoader} />
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
              sx={{ objectFit: "cover", width: "100%", maxWidth: "150px" }}
              src={center?.logo?.url}
            />
            <Typography variant="h5" fontWeight={500}>
              {center.name}
            </Typography>
          </Box> 
        </Box>
        <Box flex={1} padding={2} display="flex" flexDirection="column" gap={4}>
          {types &&
            types.map((item) => (
              <Box
                key={item._id}
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
                    src={item.packageImage}
                    sx={{ width: "100%", height: "100px" }}
                  />
                  <Typography variant="h6" fontWeight={500}>
                    {item.packageType}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={0.5}>
                  {item.packageDetails &&
                    item.packageDetails.map((value, i) => (
                      <ListItem key={i}>
                        <ListItemAvatar>
                          <VerifiedOutlined color="success" />
                        </ListItemAvatar>
                        <ListItemText primary={value} />
                      </ListItem>
                    ))}
                </Box>
              </Box>
            ))}
        </Box>
      </Container>
    </>
  );
}
