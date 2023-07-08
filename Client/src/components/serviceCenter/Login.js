import React, { useEffect, useReducer, useState } from "react";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "../../assets/css/login.css";
import loginImg from "../../assets/images/login.jpg";
import validatePassword from "../../helpers/passwordValidate";
import ForgetOtpModal from "./forgetOtpModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import forgotReducer from "../../reducers/forgotReducer";

export default function Login() {
  const initialState = {
    err: "",
    otp: "",
    showModal: false,
  };
  const [state, setDispatch] = useReducer(forgotReducer, initialState);

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showResetPassPage, setShowResetPassPage] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (formdata.newPassword) {
      !validatePassword(formdata.newPassword).status
        ? setErrMsg(
            validatePassword(formdata.newPassword).message[0].message.replace(
              "string",
              "password"
            )
          )
        : setErrMsg("");
    }
    if (formdata.confirmNewPassword) {
      {
        formdata.newPassword !== formdata.confirmNewPassword
          ? setErrMsg("Password not match")
          : setErrMsg("");
      }
    }
  }, [formdata]);

  const validForm = () => {
    if (formdata.email.trim() === "" || formdata.password.trim() === "") {
      return false;
    }
    return true;
  };

  const validResetPasswordForm = () => {
    validatePassword(formdata.newPassword);
    if (
      !validatePassword(formdata.newPassword).status ||
      formdata.newPassword.trim() === "" ||
      formdata.newPassword !== formdata.confirmNewPassword
    ) {
      return false;
    }
    return true;
  };

  const handleFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModal = async () => {
    let { email } = formdata;
    setLoading(true);
    let { data } = await axios.post("service-center/auth/forgot", { email });
    if (data.error) {
      toast.error("Enter Registered Email");
    }
    setDispatch({ type: "showModal" });
    setLoading(false);
  };

  const handleOtp = async () => {
    let flag = 0;
    let otp = state.otp;
    console.log(otp);
    let { data } = await axios.post("service-center/auth/forgot/verifyOtp", {
      otp,
    });
    console.log(data);
    if (data.err) {
      setDispatch({ type: "err", payload: data.message });
    }
  };

  const handlesave = async (e) => {
    e.preventDefault();
    let newPassword = formdata.newPassword;
    let { data } = await axios.post(
      "http://localhost:5000/user/auth/forgot/resetPassword",
      {
        email,
        password: newPassword,
      }
    );
    if (data.err) {
      toast.error(data.message);
    } else {
      navigate("/login");
      toast.success("Password Changed Succesfully");
    }
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
                    name="email"
                    type="email"
                    value={formdata.email}
                    onChange={handleFormData}
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    name="password"
                    type="password"
                    value={formdata.password}
                    onChange={handleFormData}
                    size="lg"
                  />
                  {errMsg && (
                    <div className="d-flex justify-content-between mb-4">
                      <p className="text-danger">{errMsg}</p>
                    </div>
                  )}

                  <div className="d-flex justify-content-between mb-4">
                    {formdata.email && (
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
                </form>
                <div className="d-flex justify-content-between mb-4">
                  <p>
                    Dont Have An Account ? <Link to="/signup">Register</Link>
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
                    name="newPassword"
                    type="password"
                    value={formdata.newPassword}
                    onChange={handleFormData}
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Confirm Password"
                    id="formControlLg"
                    name="confirmNewpassword"
                    type="password"
                    value={formdata.confirmNewPassword}
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
        show={state.showModal}
        email={formdata.email}
        setDispatch={setDispatch}
        otp={state.otp}
        handleOtp={handleOtp}
        err={state.err}
      />
    </div>
  );
}
