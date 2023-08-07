import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBInput,
  MDBCol,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { FormControl, InputLabel, Menu, MenuItem, Select, TextField } from "@mui/material";

export default function BookNowModal({ open, setOpen }) {
  const toggleShow = () => setOpen(!open);

  return (
    <>
      <MDBModal tabIndex="-1" show={open} setShow={setOpen}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Enter Vehicle Details</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    label="User Name"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    label="User Email"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    label="Vehicle Name"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    label="Vehicle Number"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    label="Brand"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    label="Mobile"
                    id="formControlDefault"
                    size="lg"
                    type="number"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-2">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Date</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      size="small"
                      label="Date"
                      variant="outlined"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="dark" outline onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn color="dark">Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
