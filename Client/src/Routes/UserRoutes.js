import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../components/user/signup";
import Userhome from "../components/user/userHome";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Login from "../components/user/login";
import UserAuth from "../components/user/UserAuth";

export default function UserRoutes() {
  const { user, refresh } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("user/auth/check");
      dispatch({
        type: "user",
        payload: { login: data.loggedIn, details: data.user },
      });
    })();
  }, [refresh]);
  console.log(user);
  return (
    <Routes>
      {user.login && (
        <>
          <Route path="/" element={<Userhome />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="/callback" element={<Navigate to="/" />} />
        </>
      )}
      {!user.login && (
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/callback" element={<UserAuth />} />
        </>
      )}
    </Routes>
  );
}
