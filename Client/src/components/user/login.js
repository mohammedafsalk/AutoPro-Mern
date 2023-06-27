import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();

  const validForm = () => {
    if (password.trim() === "" || email.trim() === "") {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { data } = await axios.post("http://localhost:5000/user/auth/login", {
      email,
      password,
    });
    if (data.err) {
      setErrMsg(data.message);
    }else{
      dispatch({type:'refresh'})
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
            <img src={loginImg} class="img-fluid" alt="Phone image" />
          </MDBCol>
          <MDBCol col={0} lg={1}></MDBCol>
          <form onSubmit={handleSubmit}>
            <MDBCol col="12" lg="4" className="pt-5">
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
                <a href="!#">Forgot password?</a>
              </div>
              <MDBBtn
                type="submit"
                disabled={!validForm()}
                className="mb-4 w-100 bg-dark  "
                size="lg"
              >
                Log In
              </MDBBtn>

              {/* <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>
            
            <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
            <MDBIcon fab icon="facebook-f" className="mx-2"/>
            Continue with facebook
            </MDBBtn>

          <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
          <MDBIcon fab icon="twitter" className="mx-2"/>
          Continue with twitter
        </MDBBtn> */}
            </MDBCol>
          </form>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
