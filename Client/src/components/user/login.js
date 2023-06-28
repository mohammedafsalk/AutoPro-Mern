import React, { useRef, useState } from "react";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "../../assets/css/login.css";
import loginImg from "../../assets/images/login.jpg";
import ForgetOtpModal from "./forgetOtpModal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const validForm = () => {
    if (password.trim() === "" || email.trim() === "") {
      return false;
    }
    return true;
  };

  const handleModal = async () => {
    await axios.post("http://localhost:5000/user/auth/forgot", { email });
    setShowModal(true);
  };

  const handleOtp = async () => {};

  const handleclose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { data } = await axios.post("http://localhost:5000/user/auth/login", {
      email,
      password,
    });
    if (data.err) {
      setErrMsg(data.message);
    } else {
      dispatch({ type: "refresh" });
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <MDBContainer className="">
        <MDBRow>
          <MDBCol col="12" lg="7">
            <img src={loginImg} className="img-fluid" alt="Phone image" />
          </MDBCol>
          <MDBCol col={0} lg={1}></MDBCol>
          <MDBCol col="12" lg="4" className="pt-5">
            <form onSubmit={handleSubmit}>
              <h3 className="w-100 text-center mb-5">Login</h3>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
              />
              {errMsg && (
                <div className="d-flex justify-content-between mb-4">
                  <p className="text-danger">{errMsg}</p>
                </div>
              )}

              <div className="d-flex justify-content-between mb-4">
                {email && <Link onClick={handleModal}>Forgot password?</Link>}
              </div>

              <MDBBtn
                type="submit"
                disabled={!validForm()}
                className="mb-4 w-100 bg-dark"
                size="lg"
              >
                Log In
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ForgetOtpModal
        email={email}
        showModal={showModal}
        handleclose={handleclose}
        otp={otp}
        setOtp={setOtp}
        handleOtp={handleOtp}
      />
    </div>
  );
}
