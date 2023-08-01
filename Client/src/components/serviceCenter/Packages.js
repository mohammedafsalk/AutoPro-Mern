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
import { AddCircle, Delete, VerifiedOutlined } from "@mui/icons-material";
import NavBar from "./Navbar";
import AddPackage from "./Packages-AddPackageModal";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import EditPackage from "./Packages-EditPackage";
import CustomPackages from "./Packages-Custom";
import EditCustom from "./Packages-EditCustom";

export default function Packages() {
  const centerId = useSelector((state) => {
    return state.serviceCenter.details._id;
  });

  const center = useSelector((state) => {
    return state.serviceCenter.details;
  });

  const [refresh, setrefresh] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCustom, setOpenCustom] = React.useState(false);
  const [openCustomEdit, setOpenCustomEdit] = React.useState(false);
  const [editItem, setEditItem] = React.useState([]);
  const [customItems, setCustomItems] = React.useState(null);
  const [packages, setPackages] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleOpenCustom = () => setOpenCustom(true);
  const handleOpenCustomEdit = () => setOpenCustomEdit(true);
  const handleCloseCustomEdit = () => setOpenCustomEdit(false);

  const handleClose = (type) => {
    setOpen(false);
    if (type === "error") {
      toast.error("Please Try Again");
    } else if (type === "success") {
      setrefresh((prev) => !prev);
      toast.success("Package Added Succesfully");
    }
  };

  const handleCloseCustom = (type) => {
    if (type === "closed") {
      return setOpenCustom(false);
    }
    setOpenCustom(false);
    toast.success(type);
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

  const handleDelete = async (id) => {
    let { data } = await axios.delete("service-center/package", {
      data: { id },
    });
    if (data.err) {
      toast.error(data.message);
    } else {
      setrefresh((prev) => !prev);
      toast.success(data.message);
    }
  };

  const handleEdit = (id) => {
    handleOpenEdit();
    let item = packages.find((value) => value._id === id);
    setEditItem(item);
  };

  const handleDeleteFrmCustom = (i) => {
    let updated = customItems.filter((item, index) => index !== i);
    setCustomItems(updated);
  };

  const handleSave = async () => {
    let { data } = await axios.put("service-center/custom-package", {
      details: customItems,
      id: centerId,
    });
    if (data.err) {
      setOpenCustomEdit(false);
      toast.error(data.message);
    } else {
      setOpenCustomEdit(false);
      toast.success(data.message);
    }
  };

  React.useEffect(() => {
    (async function () {
      let { data } = await axios.get("service-center/package");
      if (data.err) {
        toast.error(data.message);
      } else {
        setPackages(data.packages);
        setCustomItems(data.center?.customPackages);
      }
    })();
  }, [refresh]);

  return (
    <>
      <NavBar />
      <Toaster />
      <AddPackage centerId={centerId} open={open} onClose={handleClose} />
      <CustomPackages
        openCustom={openCustom}
        onCloseCustom={handleCloseCustom}
        centerId={centerId}
      />
      <EditCustom
        openCustomEdit={openCustomEdit}
        onCloseCustomEdit={handleCloseCustomEdit}
        customItems={customItems}
        setCustomItems={setCustomItems}
        handleDeleteFrmCustom={handleDeleteFrmCustom}
        handlesave={handleSave}
      />
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
        {packages.length < 3 ? (
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
        ) : (
          ""
        )}
        <Box>
          {center?.customPackages.length > 0 ? (
            <Button
              onClick={handleOpenCustomEdit}
              sx={{ marginY: "10px" }}
              variant="outlined"
              color="success"
            >
              Edit Custom
            </Button>
          ) : (
            <Button
              onClick={handleOpenCustom}
              sx={{ marginY: "10px" }}
              variant="outlined"
              color="success"
            >
              Add Custom
            </Button>
          )}
        </Box>
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
                    <IconButton onClick={() => handleDelete(item._id)}>
                      <Delete color="error" />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
