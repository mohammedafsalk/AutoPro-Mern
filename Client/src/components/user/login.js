import React, { useEffect, useState } from "react";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import "../../assets/css/login.css";
import loginImg from "../../assets/images/login.jpg";
import validatePassword from "../../helpers/passwordValidate";
import ForgetOtpModal from "./forgetOtpModal";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/AutoPro-logos_black.png";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [NewPasswordData, setNewPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [errMsgOtp, setErrMsgOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetPassPage, setShowResetPassPage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    let redirectUri =
      process.env.REACT_APP_CLIENT_URL + "/user/auth/google/callback";
    let clientId = process.env.REACT_APP_CLIENT_GOOGLE_ID;
    try {
      window.open(
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email%20profile`,
        "_self"
      );
    } catch (error) {
      console.log("Google login error:", error);
    }
  };

  useEffect(() => {
    if (NewPasswordData.password) {
      !validatePassword(NewPasswordData.password).status
        ? setErrMsg(
            validatePassword(
              NewPasswordData.password
            ).message[0].message.replace("string", "password")
          )
        : setErrMsg("");
    }
    if (NewPasswordData.confirmPassword) {
      {
        NewPasswordData.password !== NewPasswordData.confirmPassword
          ? setErrMsg("Password not match")
          : setErrMsg("");
      }
    }
  }, [NewPasswordData]);

  const validForm = () => {
    if (password.trim() === "" || email.trim() === "") {
      return false;
    }
    return true;
  };

  const validResetPasswordForm = () => {
    validatePassword(NewPasswordData.password);
    if (
      !validatePassword(NewPasswordData.password).status ||
      NewPasswordData.password.trim() === "" ||
      NewPasswordData.password !== NewPasswordData.confirmPassword
    ) {
      return false;
    }
    return true;
  };

  const handlePasswordData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModal = async () => {
    setLoading(true);
    let { data } = await axios.post("/user/auth/forgot", {
      email,
    });
    if (data.error) {
      toast.error(data.message);
      setLoading(false);
    } else {
      setShowModal(true);
      setLoading(false);
    }
  };

  const handleOtp = async () => {
    let { data } = await axios.post(
      "user/auth/forgot/verify",
      { otp }
    );
    if (data.err) {
      setErrMsgOtp(data.message);
    } else {
      setShowModal(false);
      setShowResetPassPage(true);
    }
  };

  const handleclose = () => {
    setShowModal(false);
  };

  const handlesave = async (e) => {
    e.preventDefault();
    let newPassword = NewPasswordData.password;
    let { data } = await axios.post(
      "user/auth/forgot/resetPassword",
      {
        email,
        password: newPassword,
      }
    );
    if (data.err) {
      toast.error(data.message);
    } else {
      setShowResetPassPage(false);
      navigate("/login");
      toast.success("Password Changed Succesfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { data } = await axios.post("/user/auth/login", {
      email,
      password,
    });
    if (data.err) {
      toast.error(data.message);
    } else {
      dispatch({ type: "refresh" });
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <Toaster />
      <MDBContainer>
        <MDBRow>
          <MDBCol col="12" lg="7">
            <img src={loginImg} className="img-fluid" alt="Phone image" />
          </MDBCol>
          <MDBCol col={0} lg={1}></MDBCol>
          {!showResetPassPage ? (
            <>
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

                  <div className="d-flex justify-content-between mb-4">
                    {email && (
                      <Link onClick={handleModal}>
                        {loading ? <BeatLoader /> : "Forgot Password"}
                      </Link>
                    )}
                  </div>

                  <MDBBtn
                    type="submit"
                    disabled={!validForm()}
                    className="mb-4 w-100 bg-dark"
                    size="lg"
                  >
                    Log In
                  </MDBBtn>
                  <MDBBtn
                    color="danger"
                    className="d-flex w-100 align-items-center justify-content-center mb-4 "
                    onClick={handleGoogleLogin}
                  >
                    <MDBIcon fab icon="google" size="lg" className="me-2" />
                    Login with Google
                  </MDBBtn>
                </form>
                <div className="d-flex justify-content-between mb-4">
                  <p>
                    Dont Have An Account ? <Link to="/signup">Sign Up</Link>
                  </p>
                </div>
              </MDBCol>
            </>
          ) : (
            <>
              <MDBCol col="12" lg="4" className="pt-5">
                <form>
                  <h3 className="w-100 text-center mb-5">
                    Reset Your Password
                  </h3>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Enter New Password"
                    id="formControlLg"
                    name="password"
                    type="password"
                    value={NewPasswordData.password}
                    onChange={handlePasswordData}
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Confirm Password"
                    id="formControlLg"
                    name="confirmPassword"
                    type="password"
                    value={NewPasswordData.confirmPassword}
                    onChange={handlePasswordData}
                    size="lg"
                  />
                  {errMsg && (
                    <div className="d-flex justify-content-between mb-4">
                      <p className="text-danger">{errMsg}</p>
                    </div>
                  )}

                  <MDBBtn
                    type="submit"
                    disabled={!validResetPasswordForm()}
                    onClick={handlesave}
                    className="mb-4 w-100 bg-dark"
                    size="lg"
                  >
                    Save
                  </MDBBtn>
                </form>
              </MDBCol>
            </>
          )}
        </MDBRow>
      </MDBContainer>
      <ForgetOtpModal
        email={email}
        showModal={showModal}
        handleclose={handleclose}
        otp={otp}
        setOtp={setOtp}
        handleOtp={handleOtp}
        errMsgOtp={errMsgOtp}
      />
    </div>
  );
}
