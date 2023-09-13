import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Alert, Button, Chip, Snackbar } from "@mui/material";
import ViewInvoice from "../../modal/ViewInvoice";
import AddReview from "../../modal/AddReview";
import axios from "axios";
import loadingReducer from "../../reducers/loadingReducer";
import BackdropSpinner from "../Loader/BackdropSpinner";

export default function AttendingUsers({ bookings, setRefresh }) {
  const [state, setState] = React.useReducer(loadingReducer, false);
  const [basicModal, setBasicModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [centerId, setCenterId] = useState("");
  const [data, setData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleOpenReview = (id) => {
    setCenterId(id);
    setReviewModal(true);
  };

  const openInvoice = (item) => {
    setData(item);
    setBasicModal(true);
  };

  const handleRefund = async (id) => {
    try {
      setState({ type: "start" });
      let { data } = await axios.post("user/payment/cancel", { id });
      if (!data.err) {
        setState({ type: "stop" });
        setSnackbarMessage(data.message);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setRefresh((prev) => !prev);
      } else {
        setState({ type: "stop" });
        setSnackbarMessage(data.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Something went wrong");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="align-items-center h-100">
          {bookings[0] ? (
            bookings.map((item) => (
              <MDBCol sm="3" md="4" key={item._id}>
                <MDBCard className="mb-5" style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h3">{item.vehicleName}</MDBTypography>
                    <MDBCardText className="small">
                      <strong>Booked On</strong> {item.date}
                    </MDBCardText>
                    <MDBCardText className="small">
                      <Chip
                        color={
                          item.status === "Cancelled" ? "error" : "success"
                        }
                        label={item?.status}
                      />
                    </MDBCardText>
                    <div className="d-flex justify-content-start gap-1 align-items-center">
                      {item?.invoice[0] ? (
                        <Button
                          color="primary"
                          onClick={() => openInvoice(item)}
                          variant="contained"
                        >
                          View Bill
                        </Button>
                      ) : (
                        <Button
                          color="error"
                          onClick={() => handleRefund(item._id)}
                          disabled={item.status === "Cancelled"}
                          variant="contained"
                        >
                          Cancel
                        </Button>
                      )}
                      {item?.status === "Delivered" && (
                        <Button
                          color="primary"
                          onClick={() => handleOpenReview(item.centerId)}
                          variant="outlined"
                        >
                          Add Review
                        </Button>
                      )}
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          ) : (
            <MDBCol className="d-flex justify-content-center">
              <p>No Bookings</p>
            </MDBCol>
          )}
        </MDBRow>
      </MDBContainer>
      <ViewInvoice
        data={data}
        setRefresh={setRefresh}
        setBasicModal={setBasicModal}
        basicModal={basicModal}
      />
      <AddReview
        setReviewModal={setReviewModal}
        reviewModal={reviewModal}
        centerId={centerId}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <BackdropSpinner openLoader={state.loading} />
    </>
  );
}
