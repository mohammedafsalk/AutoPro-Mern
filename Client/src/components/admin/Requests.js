import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdminHome from "./AdminHome";
import "../../assets/css/adminHome.css";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
} from "mdb-react-ui-kit";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("admin/requests");
      setRequests([...data.centerRequests]);
    })();
  }, []);

  const openModal = (img) => {
    setModalOpen(true);
    setImage(img);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <AdminHome />
      </div>
      <MDBContainer>
        <MDBRow className="mt-5 ">
          {requests.map((item, index) => (
            <MDBCol key={index} className="mt-3  " md={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="Service Center"
                  height="140"
                  image={item.logo.url}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 500 }}
                    component="div"
                  >
                    {item.name}
                  </Typography>
                </CardContent>
                <CardActions className="d-flex justify-content-around">
                  <div>
                    <Button
                      size="medium"
                      onClick={() => openModal(item.proof.url)}
                    >
                      View Proof
                    </Button>
                  </div>
                  <div className="d-flex">
                    <Button size="small" sx={{ fontSize: 15 }} color="success">
                      Accept
                    </Button>
                    <Button size="small" sx={{ fontSize: 15 }} color="error">
                      Reject
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
      <MDBModal show={modalOpen} onHide={closeModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <img src={image} alt="Logo" style={{ maxWidth: "100%" }} />
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
