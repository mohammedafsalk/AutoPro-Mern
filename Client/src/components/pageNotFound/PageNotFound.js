import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pageNotFound.css";

export default function NotFoundPage() {
  const navigate = useNavigate();
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
        <Link to="/" class="btn-back">
          Back to previous page
        </Link>
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
