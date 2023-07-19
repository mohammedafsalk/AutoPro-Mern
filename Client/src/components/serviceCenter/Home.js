import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await axios.get("/service-center/auth/logout");
    dispatch({ type: "refresh" });
  };

  return (
    <div>
      <h1>Service Center Home</h1>
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
}
