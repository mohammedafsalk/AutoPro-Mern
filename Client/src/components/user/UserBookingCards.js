import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button, Chip } from "@mui/material";
import ViewInvoice from "../../modal/ViewInvoice";
import AddReview from "../../modal/AddReview";

export default function AttendingUsers({ bookings, setRefresh }) {
  const [basicModal, setBasicModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [centerId, setCenterId] = useState("");
  const [data, setData] = useState([]);
  const handleOpenReview = (id) => {
    setCenterId(id);
    setReviewModal(true);
  };
  const openInvoice = (item) => {
    setData((prev) => item);
    setBasicModal(true);
  };
  return (
    <>
      <MDBContainer className="py-5 h-100 ">
        <MDBRow className=" align-items-center h-100 ">
          {bookings && bookings.map((item) => (
            <MDBCol sm="3" md="4">
              <MDBCard className="mb-5" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h3">{item.vehicleName}</MDBTypography>
                  <MDBCardText className="small">
                    <strong>Booked On</strong> {item.date}
                  </MDBCardText>
                  <MDBCardText className="small">
                    <Chip color="success" label={item?.status} />
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
                      <Button color="error" variant="contained">
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
          ))}
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
    </>
  );
}
