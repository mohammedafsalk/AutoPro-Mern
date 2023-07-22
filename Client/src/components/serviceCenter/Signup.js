import React, { useState, useEffect } from "react";
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
import loginImg from "../../assets/images/serviceCenterLogin.jpg";
import validatePassword from "../../helpers/passwordValidate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Backdropspinner from "../Loader/BackdropSpinner";

export default function Signup() {
  const [openLoader, setOpenLoader] = React.useState(false);
  const [proof, setProof] = useState(null);
  const [logo, setLogo] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [uploadImg, setUploadImg] = useState({
    proofUpload: "",
    logoUpload: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [err, setErr] = useState({
    data: "",
    Imageproof: { message: "", valid: false },
    Imagelogo: { message: "", valid: false },
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    district: "",
    location: "",
    password: "",
    mobile: "",
    confrmPassword: "",
  });

  const navigate = useNavigate();

  const validForm = () => {
    validatePassword(formData.password);
    if (
      formData.name.trim() === "" ||
      !validatePassword(formData.password).status ||
      formData.password.trim() === "" ||
      formData.email.trim() === "" ||
      formData.location.trim() === "" ||
      formData.district.trim() === "" ||
      !err.Imagelogo.valid ||
      !err.Imageproof.valid ||
      formData.password != formData.confrmPassword
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (formData.password) {
      const passwordValidation = validatePassword(formData.password);
      !validatePassword(formData.password).status
        ? setErr((prev) => ({
            ...prev,
            data: passwordValidation.message[0].message.replace(
              "string",
              "password"
            ),
          }))
        : setErr((prev) => ({ ...prev, data: "" }));
    }
    if (formData.confrmPassword) {
      {
        formData.password !== formData.confrmPassword
          ? setErr((prev) => ({ ...prev, data: "Password Not Matching" }))
          : setErr((prev) => ({ ...prev, data: "" }));
      }
    }
  }, [formData.password, formData.confrmPassword]);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProofChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProof(URL.createObjectURL(file));
      setErr((prev) => ({ ...prev, Imageproof: { message: "", valid: true } }));
      proofToBase(file);
    } else {
      setErr((prev) => ({
        ...prev,
        Imageproof: { ...prev, message: "selected Wrong File" },
      }));
      setProof(null);
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogo(URL.createObjectURL(file));
      setErr((prev) => ({ ...prev, Imagelogo: { message: "", valid: true } }));
      logoToBase(file);
    } else {
      setErr((prev) => ({
        ...prev,
        Imagelogo: { ...prev, message: "Selected Wrong File" },
      }));
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

  const proofToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadImg((prev) => ({ ...prev, proofUpload: reader.result }));
    };
  };

  const logoToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadImg((prev) => ({ ...prev, logoUpload: reader.result }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenLoader(true);
    let { name, email, password, location, district } = formData;
    let { data } = await axios.post("/service-center/auth/signup", {
      name,
      email,
      password,
      location,
      district,
      proof: uploadImg.proofUpload,
      logo: uploadImg.logoUpload,
    });
    if (data.err) {
      setOpenLoader(false);
      setErr((prev) => ({ ...prev, data: data.message }));
    } else {
      setOpenLoader(false);
      navigate("/service-center/login");
    }
  };

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center"
        style={{ height: "100vh" }}
      >
        <Backdropspinner openLoader={openLoader} />
        <MDBContainer>
          <MDBCol col="12">
            <h1 className="text-left mb-4">Service Center</h1>
          </MDBCol>
          <MDBRow>
            <MDBCol col="12" md="7">
              <img src={loginImg} className="img-fluid" alt="Phone image" />
            </MDBCol>
            <MDBCol col={0} lg={1}></MDBCol>
            <form onSubmit={handleSubmit}>
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
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleFormData}
                  type="text"
                  size="lg"
                  maxLength={12}
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
                {err.data && (
                  <div className="d-flex justify-content-between mb-4">
                    <p className="text-danger">{err.data}</p>
                  </div>
                )}

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
                    className="mb-3"
                    accept="image/*"
                    onChange={handleProofChange}
                  />
                  {err.Imageproof && (
                    <div className="d-flex justify-content-between ">
                      <p className="text-danger">{err.Imageproof.message}</p>
                    </div>
                  )}
                  {proof && (
                    <MDBBtn
                      type="button"
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
                    className="mb-3"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  {err.Imagelogo && (
                    <div className="d-flex justify-content-between">
                      <p className="text-danger">{err.Imagelogo.message}</p>
                    </div>
                  )}
                  {logo && (
                    <MDBBtn
                      type="button"
                      color="secondary"
                      size="sm"
                      onClick={() => openModal(logo)}
                      className="mb-3"
                    >
                      View
                    </MDBBtn>
                  )}
                </div>
                <MDBBtn
                  className="w-100 bg-dark "
                  disabled={!validForm()}
                  type="submit"
                >
                  Sign in
                </MDBBtn>
              </MDBCol>
            </form>
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
    </>
  );
}
