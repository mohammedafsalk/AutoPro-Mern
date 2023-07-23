import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { AddCircle, VerifiedOutlined } from "@mui/icons-material";
import NoPackages from "../../assets/images/noRequests.jpg";
import NavBar from "./Navbar";
import AddPackage from "./Packages-AddPackageModal";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function Packages() {
  const centerId = useSelector((state) => {
    return state.serviceCenter.details._id;
  });
  const [open, setOpen] = React.useState(false);
  const [packages, setPackages] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = (type) => {
    setOpen(false);
    if (type === "error") {
      toast.error("Please Try Again");
    } else if (type === "success") {
      toast.success("Package Added Succesfully");
    }
  };

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("service-center/package");
      if (data.err) {
        toast.error(data.message);
      } else {
        console.log(data.packages);
        setPackages(data.packages);
      }
    })();
  }, []);

  return (
    <>
      <NavBar />
      <Toaster />
      <AddPackage centerId={centerId} open={open} onClose={handleClose} />
      <Container
        fixed
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <IconButton onClick={handleOpen}>
          <AddCircle />
        </IconButton>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          justifyContent="center"
        >
          {packages &&
            packages.map((item, i) => (
              <Grid item>
                <Card sx={{ maxWidth: 345, borderRadius: 5 }} elevation={3}>
                  <CardMedia sx={{ height: 160 }} image={item.packageImage} />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      fontWeight={500}
                      component="span"
                      borderBottom="3px solid"
                      borderBottomColor="#495DFC"
                      sx={{
                        borderRadius: "3px",
                        padding: "8px",
                        display: "inline-block",
                      }}
                    >
                      {item.packageType}
                    </Typography>
                    <Box marginTop={2} marginBottom={2}>
                      {
                        item.packageDetails &&
                        item.packageDetails.map((value)=>(
                          <ListItem>
                        <ListItemAvatar>
                          <VerifiedOutlined color="success" />
                        </ListItemAvatar>
                        <ListItemText primary={value} />
                      </ListItem>
                        ))
                      }
                    </Box>
                    <Button
                      sx={{
                        backgroundColor: "#5FA944",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#4C863C",
                        },
                      }}
                    >
                      Choose
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
