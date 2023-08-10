import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function UserAuth() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      const token = searchParams.get("token");
      const { data } = await axios.get(
        "/user/auth/google/verify?token=" + token
      );
      console.log(data);
      if (!data.error) {
        console.log("hhh");
        dispatch({ type: "refresh" });
        navigate("/");
      } else {
        navigate("/login");
      }
    })();
  }, []);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
