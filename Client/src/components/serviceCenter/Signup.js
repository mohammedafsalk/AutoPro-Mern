import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBFile,
} from "mdb-react-ui-kit";
import loginImg from "../../assets/images/login.jpg";

export default function Signup() {
  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <MDBContainer>
        <MDBCol col="12">
          <h1 className="text-left mb-4">Service Center</h1>
        </MDBCol>
        <MDBRow>
          <MDBCol col="12" md="7">
            <img src={loginImg} class="img-fluid" alt="Phone image" />
          </MDBCol>
          <MDBCol col={0} lg={1}></MDBCol>
          <MDBCol col="12" lg="4" className="pt-5">
            <h3 className="w-100 text-center mb-5">Sign Up</h3>
            <MDBInput wrapperClass="mb-4" label="Name" type="text" size="lg" />
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              type="email"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              size="lg"
            />
            <MDBFile label="Upload Proof" id="customFile" className="mb-3" />
            <MDBFile label="Upload logo" id="customFile" className="mb-3" />

            <MDBBtn className="mb-4 w-100 bg-dark ">Sign in</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
