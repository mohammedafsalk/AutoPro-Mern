import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AdminHome from "../components/admin/AdminHome";
import Login from "../components/admin/Login";

export default function AdminRoutes() {
  const { admin, refresh } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      let { data: adminData } = await axios.get(
        "http://localhost:5000/admin/auth/checkLogin"
      );
      dispatch({
        type: "admin",
        payload: { login: adminData.loggedIn },
      });
    })();
  }, [refresh]);
  return (
    <Routes>
      {admin.login && (
        <>
          <Route path="/" element={<AdminHome />} />
          <Route path="/login" element={<Navigate to="/admin/" />} />
        </>
      )}
      {!admin.login && (
        <>
          <Route path="/" element={<Navigate to="/admin/login" />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
    </Routes>
  );
}