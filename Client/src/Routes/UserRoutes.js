import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../components/user/signup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Login from "../components/user/login";
import UserAuth from "../components/user/UserAuth";
import UserProfile from "../components/user/UserProfile";
import Backdropspinner from "../components/Loader/BackdropSpinner";
import UserHome from "../components/user/UserHome";
import ChooseServiceCenter from "../components/user/ChooseServiceCenter";
import UserServicePage from "../components/user/UserServicePage";

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
  return (
    <>
      <Routes>
        {user.login && (
          <>
            <Route path="/" element={<UserHome />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/serviceCenter" element={<ChooseServiceCenter />} />
            <Route path="/select-package/:id" element={<UserServicePage />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/callback" element={<Navigate to="/" />} />
          </>
        )}
        {user.login === false && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/callback" element={<UserAuth />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/profile" element={<Navigate to="/login" />} />
            <Route path="/serviceCenter" element={<Navigate to="/login" />} />
            <Route
              path="/select-package/:id"
              element={<Navigate to="/login" />}
            />
            <Route path="/booking-details" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      {user.login === null && (
        <Backdropspinner openLoader={true}></Backdropspinner>
      )}
    </>
  );
}
