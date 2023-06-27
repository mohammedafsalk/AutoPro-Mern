import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../components/user/signup";
import Userhome from "../components/user/userHome";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Login from "../components/user/login";

export default function UserRoutes() {
  const { user, refresh } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("http://localhost:5000/user/auth/check");
      dispatch({
        type: "user",
        payload: { login: data.loggedIn, details: data.user },
      });
    })();
  }, [refresh]);
  return (
    <Routes>
      {user.login && (
        <>
          <Route path="/" element={<Userhome />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
        </>
      )}
      {!user.login && (
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )}
    </Routes>
  );
}
