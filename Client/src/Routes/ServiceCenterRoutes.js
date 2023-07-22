import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/serviceCenter/Home";
import Login from "../components/serviceCenter/Login";
import Signup from "../components/serviceCenter/Signup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PermissionPage from "../components/serviceCenter/PermissionPage";

export default function ServiceCenterRoutes() {
  const { serviceCenter, refresh } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async function () {
      let { data: centerData } = await axios.get(
        "service-center/auth/checkLogin"
      );
      dispatch({
        type: "serviceCenter",
        payload: {
          login: centerData.loggedIn,
          details: centerData.serviceCenter,
        },
      });
    })();
  }, [refresh]);
  console.log(serviceCenter.details);

  return (
    <Routes>
      {serviceCenter.login && serviceCenter.details.rejected && (
        <>
          <Route
            path="/"
            element={<PermissionPage center={serviceCenter.details} />}
          />
          <Route
            path="/*"
            element={
              <PermissionPage rejected={serviceCenter.details.rejectMessage} />
            }
          />
        </>
      )}
      {serviceCenter.login && !serviceCenter.details.permission && (
        <>
          <Route
            path="/"
            element={<PermissionPage center={serviceCenter.details} />}
          />
          <Route
            path="/*"
            element={
              <PermissionPage rejected={serviceCenter.details.rejectMessage} />
            }
          />
        </>
      )}

      {serviceCenter.login && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Navigate to="/service-center/" />} />
          <Route path="/signup" element={<Navigate to="/service-center/" />} />
        </>
      )}

      {!serviceCenter.login && (
        <>
          <Route path="/" element={<Navigate to="/service-center/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}
    </Routes>
  );
}
