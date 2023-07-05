import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBInput,
  MDBFile,
} from "mdb-react-ui-kit";
import loginImg from "../../assets/images/login.jpg";

export default function Signup() {
  const [proof, setProof] = useState(null);
  const [logo, setLogo] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    district: "",
    location: "",
    password: "",
    confrmPassword: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
  };

  const handleProofChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProof(URL.createObjectURL(file));
    } else {
      setErr("Invalid Format");
      setProof(null);
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogo(URL.createObjectURL(file));
    } else {
      setErr("Invalid Format");
      setLogo(null);
    }
  };

  const openModal = (state) => {
    setShowImage(state);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
            <MDBInput
              wrapperClass="mb-4"
              label="Center Name"
              name="name"
              value={formData.name}
              onChange={handleFormData}
              type="text"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleFormData}
              type="email"
              size="lg"
            />

            <MDBInput
              wrapperClass="mb-4"
              label="District"
              name="district"
              value={formData.district}
              onChange={handleFormData}
              type="text"
              size="lg"
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleFormData}
              type="text"
              size="lg"
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleFormData}
              type="password"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm Password"
              name="confrmPassword"
              value={formData.confrmPassword}
              onChange={handleFormData}
              type="password"
              size="lg"
            />
            <div>
              <MDBFile
                label="Upload Proof"
                id="customFile"
                className="mb-3"
                accept="image/*"
                onChange={handleProofChange}
              />
              {proof && (
                <MDBBtn
                  color="secondary"
                  onClick={() => openModal(proof)}
                  size="sm"
                  className="mb-3"
                >
                  View
                </MDBBtn>
              )}
            </div>
            <div>
              <MDBFile
                label="Upload Logo"
                id="customFile"
                className="mb-3"
                accept="image/*"
                onChange={handleLogoChange}
              />

              {logo && (
                <MDBBtn
                  color="secondary"
                  size="sm"
                  onClick={() => openModal(logo)}
                  className="mb-3"
                >
                  View
                </MDBBtn>
              )}
            </div>
            {err && <p>{err}</p>}
            <MDBBtn className="w-100 bg-dark ">Sign in</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBModal show={modalOpen} onHide={closeModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <img src={showImage} alt="Logo" style={{ maxWidth: "100%" }} />
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
