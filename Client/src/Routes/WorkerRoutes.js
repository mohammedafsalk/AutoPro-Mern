import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WorkerLogin from "../components/Worker/WorkerLogin";
import WorkerHome from "../components/Worker/WorkerHome";
import axios from "axios";
import NotFoundPage from "../components/pageNotFound/PageNotFound";
export default function WorkerRoutes() {
  const { worker, refresh } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async function () {
      let { data: workerData } = await axios.get("/worker/auth/checkLogin");
      dispatch({
        type: "worker",
        payload: { login: workerData.loggedIn, details: workerData.worker },
      });
    })();
  }, [refresh]);

  return (
    <Routes>
      {worker.login && (
        <>
          <Route path="/" element={<WorkerHome />} />
          <Route path="/login" element={<Navigate to="/worker/" />} />
        </>
      )}

      {worker.login === false && (
        <>
          <Route path="/login" element={<WorkerLogin />} />
          <Route path="/" element={<Navigate to="/worker/login" />} />
        </>
      )}
      {worker.login !== null && <Route path="/*" element={<NotFoundPage />} />}
    </Routes>
  );
}
