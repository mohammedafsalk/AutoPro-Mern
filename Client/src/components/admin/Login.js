import React, { useEffect, useState } from "react";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "../../assets/css/login.css";
import loginImg from "../../assets/images/Admin.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const validForm = () => {
    if (formData.password.trim() === "" || formData.email.trim() === "") {
      return false;
    }
    return true;
  };

  const handleFormdata = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrMsg("")
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let { email, password } = formData;
    let { data } = await axios.post("http://localhost:5000/admin/auth/login", {
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
        <MDBCol col="12">
          <h1 className="text-left mb-4">ADMIN</h1>
        </MDBCol>
        <MDBRow>
          <MDBCol col="12" lg="7">
            <img src={loginImg} alt="Phone image" className="img-fluid" />
          </MDBCol>
          <MDBCol col={0} lg={1}></MDBCol>
          <MDBCol col="12" lg="4" className="pt-5">
            <form>
              <h3 className="w-100 text-center mb-5">Login</h3>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                type="email"
                size="lg"
                name="email"
                value={formData.email}
                onChange={handleFormdata}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                type="password"
                size="lg"
                name="password"
                value={formData.password}
                onChange={handleFormdata}
              />
              {errMsg && (
                <div className="d-flex justify-content-between mb-4">
                  <p className="text-danger">{errMsg}</p>
                </div>
              )}

              <MDBBtn
                type="submit"
                disabled={!validForm()}
                onClick={handleLogin}
                className="mb-4 w-100 bg-dark"
                size="lg"
              >
                Log In
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
