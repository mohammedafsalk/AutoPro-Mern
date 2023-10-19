import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import UserNav from "./UserNav";
import { Link } from "react-router-dom";
import img from "../../assets/images/No service centers.jpeg";
import predefinedBrands from "../../utils/brands";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Backdropspinner from "../Loader/BackdropSpinner";
import { MyLocation } from "@mui/icons-material";
import ShowMap from "../MapBox/ShowMap";
import { Toaster, toast } from "react-hot-toast";

export default function ChooseServiceCenter() {
  const [data, setData] = React.useState([]);
  const [mapData, setMapData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [brand, setBrand] = React.useState("All");
  const [open, setOpen] = React.useState(false);
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const handleOpen = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setOpen(true);
      },
      (error) => {
        toast.error("Error Fetching Location, Try Again");
      },
      { enableHighAccuracy: true }
    );
  };

  const handleClose = () => setOpen(false);
  const [state, setState] = React.useState({ loading: false });

  React.useEffect(() => {
    const fetchData = async () => {
      setState({ loading: true });
      try {
        const response = await axios.get(
          `/user/service-centers?page=${page}&name=${name}&category=${category}&brand=${brand}`
        );
        if (response.data.err) {
          toast.error(response.data.message);
        } else {
          setData(response.data.center);
          setCount(response.data.totalPage);
        }
      } catch (error) {
        toast.error("Error Fetching Service Centers");
      } finally {
        setState({ loading: false });
      }
    };

    fetchData();
  }, [page, name, category, brand]);

  React.useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get("/user/loadmap");
        setMapData(response.data.centers);
      } catch (error) {
        console.error("Error fetching map data:", error);
        toast.error("Error Fetching Map Data");
      }
    };

    fetchMapData();
  }, []);

  return (
    <>
      <UserNav></UserNav>
      <Toaster />
      <MDBContainer className="my-5 ">
        <>
          <MDBRow className="align-items-center">
            <MDBCol
              xs={4}
              sm={8}
              md={4}
              className="d-flex justify-content-center mb-2"
            >
              <TextField
                size="small"
                label="Search"
                fullWidth
                placeholder="Search Centers"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleOpen}>
                        <MyLocation color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MDBCol>
            <MDBCol xs={4} sm={4} md={4} className="mb-2">
              <TextField
                select
                onChange={(e) =>
                  setCategory(e.target.value === "All" ? [] : [e.target.value])
                }
                defaultValue="All"
                variant="outlined"
                fullWidth
                size="small"
                label="Category"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Four Wheeler">Four Wheeler</MenuItem>
                <MenuItem value="Heavy Vehicles">Heavy Vehicles</MenuItem>
                <MenuItem value="Two Wheeler">Two Wheeler</MenuItem>
                <MenuItem value="Three Wheeler">Three Wheeler</MenuItem>
              </TextField>
            </MDBCol>
            <MDBCol xs={4} sm={4} md={4} className="mb-2">
              <TextField
                select
                onChange={(e) =>
                  setBrand(e.target.value === "All" ? [] : [e.target.value])
                }
                defaultValue="All"
                variant="outlined"
                fullWidth
                size="small"
                label="Brands"
              >
                <MenuItem value="All">All</MenuItem>
                {predefinedBrands.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </MDBCol>
          </MDBRow>

          {data[0] ? (
            <>
              <MDBRow className="mt-5 mb-3  ">
                {data &&
                  data.map((item) => (
                    <MDBCol md="12" lg="4" className="mb-4">
                      <Link
                        className="text-dark"
                        to={`/select-package/${item._id}`}
                        state={{ itemData: item }}
                      >
                        <MDBCard>
                          <MDBCardImage
                            src={item?.logo?.url}
                            className="img-height-200-cover"
                            position="top"
                            alt="Laptop"
                          />
                          <MDBCardBody className=" d-flex flex-column align-items-center justify-content-center">
                            <div className="mb-3">
                              <h5 className="mb-0">{item.name}</h5>{" "}
                            </div>

                            <div class="d-flex flex-column mb-2">
                              <div className="d-flex flex-row">
                                <div className="text-danger mb-1 me-2">
                                  <MDBIcon
                                    fas
                                    color="success"
                                    icon="phone-alt"
                                  />
                                </div>
                                <span>{item.mobile}</span>
                              </div>
                              <div className="d-flex flex-row">
                                <div className="text-danger mb-1 me-2">
                                  <MDBIcon
                                    fas
                                    color="success"
                                    icon="map-marker-alt"
                                  />
                                </div>
                                <span>
                                  {item.location}.{item.district}
                                </span>
                              </div>
                              <div class="text-warning text-center">
                                <MDBIcon fas icon="star" />
                                <MDBIcon fas icon="star" />
                                <MDBIcon fas icon="star" />
                                <MDBIcon fas icon="star" />
                                <MDBIcon fas icon="star" />
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      </Link>
                    </MDBCol>
                  ))}
              </MDBRow>
              <MDBRow className="justify-content-center">
                <MDBCol sm={2} className="d-flex justify-content-center">
                  <Stack spacing={2}>
                    <Pagination
                      color="standard"
                      count={count}
                      page={page}
                      onChange={(e, val) => setPage(val)}
                    />
                  </Stack>
                </MDBCol>
              </MDBRow>
            </>
          ) : (
            <Grid container direction={"row"} justifyContent={"center"}>
              <Grid item textAlign={"center"}>
                <Box>
                  <img src={img} alt="" />
                </Box>
                <Typography fontWeight={500} variant="h5">
                  No Centers Found!
                </Typography>
              </Grid>
            </Grid>
          )}
        </>
      </MDBContainer>

      <ShowMap
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        data={mapData}
        latitude={latitude}
        longitude={longitude}
      />

      <Backdropspinner openLoader={state.loading} />
    </>
  );
}
