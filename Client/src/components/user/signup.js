import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";
import validatePassword from "../../helpers/passwordValidate";
import toast, { Toaster } from "react-hot-toast";

import { BeatLoader } from "react-spinners";
import MapSearchBox from "../MapBox/MapSearchBox";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [place, setPlace] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    let interval;
    if (showOtpPage) {
      setTimer(10);
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [showOtpPage]);

  React.useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendOtp = async () => {
    toast.success(`New OTP Has Been Sent to ${email}`);
    let { data: resendOtpData } = await axios.post("user/auth/resendOtp", {
      email,
    });
    setTimer(10);
    setCanResend(false);
  };

  const validForm = () => {
    validatePassword(password);
    if (
      name.trim() === "" ||
      !validatePassword(password).status ||
      password.trim() === "" ||
      email.trim() === "" ||
      password !== confirmPassword
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (password) {
      !validatePassword(password).status
        ? setErrMessage(
            validatePassword(password).message[0].message.replace(
              "string",
              "password"
            )
          )
        : setErrMessage("");
    }
    if (confirmPassword) {
      {
        password !== confirmPassword
          ? setErrMessage("Password not match")
          : setErrMessage("");
      }
    }
  }, [password, confirmPassword]);

  const handleOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let { data } = await axios.post("user/auth/signup/verify", {
        otp,
        name,
        email,
        password,
        phone,
        place,
      });
      if (data.err) {
        toast.error("Incorrect OTP");
      } else {
        dispatch({ type: "refresh" });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Server Is Down,Try Later");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validForm()) {
      setLoading(true);
      try {
        let { data } = await axios.post(
          "http://localhost:5000/user/auth/signup",
          { email }
        );
        if (data.err) {
          setErrMessage(data.message);
        } else {
          setErrMessage("");
          setShowOtpPage(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <Toaster />
      <MDBContainer className="">
        <MDBRow>
          <MDBCol col="12" lg="7">
            <img src={loginImg} class="img-fluid" alt="Phone image" />
          </MDBCol>
          <MDBCol col={0} lg={1}></MDBCol>
          <MDBCol col="12" lg="4" className="pt-5">
            <h3 className="w-100 text-center mb-5">
              {!showOtpPage ? "Sign Up" : "Enter OTP"}
            </h3>

            <form onSubmit={!showOtpPage ? handleSubmit : handleOtp}>
              {!showOtpPage ? (
                <>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id=""
                    type="text"
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id=""
                    type="email"
                    size="lg"
                  />
                  <MapSearchBox setPlace={setPlace} />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id=""
                    type="tel"
                    maxLength={10}
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id=""
                    type="password"
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    id=""
                    type="password"
                    size="lg"
                  />
                  {errMessage && (
                    <div className="d-flex justify-content-between mb-4">
                      <p className="text-danger">{errMessage}</p>
                    </div>
                  )}
                  <MDBBtn
                    type="submit"
                    disabled={!validForm()}
                    className="mb-4 w-100 bg-dark"
                    size="lg"
                  >
                    <div>
                      {!loading ? (
                        "Sign Up"
                      ) : (
                        <div className="d-flex justify-content-center">
                          <BeatLoader color="white" />
                        </div>
                      )}
                    </div>
                  </MDBBtn>
                  <div className="d-flex justify-content-between mb-4">
                    <p>
                      Already Registered ? <Link to="/login">Log In</Link>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    id=""
                    type="tel"
                    size="lg"
                  />
                  {timer > 0 ? (
                    <p className="danger">
                      {`Enter the OTP before ${timer} seconds`}
                    </p>
                  ) : (
                    <MDBBtn
                      className="mb-2"
                      onClick={handleResendOtp}
                      disabled={!canResend}
                      type="button"
                    >
                      Resend OTP
                    </MDBBtn>
                  )}
                  {otp && (
                    <MDBBtn
                      type="submit"
                      disabled={otp.trim() == ""}
                      className="mb-4 w-100 bg-dark"
                      size="lg"
                    >
                      {!loading ? (
                        "Continue"
                      ) : (
                        <div className="d-flex justify-content-center">
                          <BeatLoader color="white" />
                        </div>
                      )}
                    </MDBBtn>
                  )}
                </>
              )}
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
