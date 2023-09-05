import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/serviceCenter/Home";
import Login from "../components/serviceCenter/Login";
import Signup from "../components/serviceCenter/Signup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PermissionPage from "../components/serviceCenter/PermissionPage";
import Workers from "../components/serviceCenter/Workers";
import Schedules from "../components/serviceCenter/Schedules";
import Bookings from "../components/serviceCenter/Bookings";
import Dashboard from "../components/serviceCenter/Dashboard";
import Profile from "../components/serviceCenter/Profile";
import NotFoundPage from "../components/pageNotFound/PageNotFound";
import Settings from "../components/serviceCenter/Settings";

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
          <Route path="/workers" element={<Workers />} />
          <Route path="/schedule" element={<Schedules />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Navigate to="/service-center/" />} />
          <Route path="/signup" element={<Navigate to="/service-center/" />} />
        </>
      )}

      {serviceCenter.login === false && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/service-center/login" />} />
          <Route
            path="/workers"
            element={<Navigate to="/service-center/login" />}
          />
          <Route
            path="/schedule"
            element={<Navigate to="/service-center/login" />}
          />
          <Route
            path="/bookings"
            element={<Navigate to="/service-center/login" />}
          />
          <Route
            path="/dashboard"
            element={<Navigate to="/service-center/login" />}
          />
          <Route
            path="/profile"
            element={<Navigate to="/service-center/login" />}
          />
          <Route
            path="/settings"
            element={<Navigate to="/service-center/login" />}
          />
        </>
      )} 
      {
        serviceCenter.login!==null &&
       <Route path="/*" element={<NotFoundPage />} />
      }
    </Routes>
  );
}
