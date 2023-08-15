import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Rating, TextField } from "@mui/material";

export default function AddReview({
  reviewModal,
  setReviewModal,
  centerId,
  setRefresh,
}) {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const toggleShow = () => setReviewModal(!reviewModal);
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = async () => {
    let { data } = await axios.patch("user/bookings", {
      description,
      rating,
      centerId,
    });
    if (data.err) {
      toast.error(data.message);
    } else {
      toggleShow();
      toast.success(data.message);
    }
  };

  return (
    <>
      <MDBModal show={reviewModal} setShow={setReviewModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Your Review</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={2}
              >
                <Box display={"flex"} justifyContent={"center"}>
                  <Rating
                    name="size-large"
                    size="large"
                    value={rating}
                    onChange={handleRatingChange}
                  />
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                  <TextField
                    multiline
                    rows={5}
                    label="Add Description"
                    fullWidth
                    onChange={handleDescriptionChange}
                    variant="outlined"
                  />
                </Box>
              </Box>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Submit</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
