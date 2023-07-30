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
import EditPackage from "./Packages-EditPackage";

export default function Packages() {
  const centerId = useSelector((state) => {
    return state.serviceCenter.details._id;
  });
  const [refresh, setrefresh] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editItem, setEditItem] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleOpenEdit = () => setOpenEdit(true);

  const handleClose = (type) => {
    setOpen(false);
    if (type === "error") {
      toast.error("Please Try Again");
    } else if (type === "success") {
      toast.success("Package Added Succesfully");
    }
  };

  const handleCloseEdit = (type) => {
    setOpenEdit(false);
    if (type === "error") {
      toast.error("Please Try Again");
    } else if (type === "success") {
      setrefresh((prev) => !prev);
      toast.success("Package Updated Succesfully");
    }
  };

  const handleEdit = (id) => {
    handleOpenEdit();
    let item = packages.find((value) => value._id === id);
    setEditItem(item);
  };

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("service-center/package");
      if (data.err) {
        toast.error(data.message);
      } else {
        setPackages(data.packages);
      }
    })();
  }, [refresh]);

  return (
    <>
      <NavBar />
      <Toaster />
      <AddPackage centerId={centerId} open={open} onClose={handleClose} />
      <EditPackage
        editItem={editItem}
        openEdit={openEdit}
        onCloseEdit={handleCloseEdit}
        centerId={centerId}
      />
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
        <IconButton
          sx={{
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
          onClick={handleOpen}
        >
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
              <Grid item key={i}>
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
                    <Button
                      onClick={() => handleEdit(item._id)}
                      sx={{
                        backgroundColor: "#5FA944",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#4C863C",
                        },
                      }}
                    >
                      Edit
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
