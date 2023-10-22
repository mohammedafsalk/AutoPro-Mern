import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pageNotFound.css";
import { Button } from "@mui/material";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const handleBck = () => {
    navigate(-1);
  };
  return (
    <div className="body">
      <div class="mars"></div>
      <img src="https://assets.codepen.io/1538474/404.svg" class="logo-404" />
      <img src="https://assets.codepen.io/1538474/meteor.svg" class="meteor" />
      <p class="title">Oh no!!</p>
      <p class="subtitle">
        You’re either misspelling the URL <br /> or requesting a page that's no
        longer here.
      </p>
      <div align="center">
        <Button onClick={handleBck} className="btn-back">
          Back to previous page
        </Button>
      </div>
      <img
        src="https://assets.codepen.io/1538474/astronaut.svg"
        class="astronaut"
      />
      <img
        src="https://assets.codepen.io/1538474/spaceship.svg"
        class="spaceship"
      />
    </div>
  );
}
