import { Container, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import mapboxAPI from "./MapBox/MapBoxApi";

export default function Checking() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = async () => {
    try {
      const url = `/geocoding/v5/mapbox.places/${encodeURIComponent(
        value
      )}.json`;
      const response = await mapboxAPI.get(url);

      if (response.data.features.length > 0) {
        setResult("Place exists!");
      } else {
        setResult("Place doesn't exist!");
      }
    } catch (error) {
      setResult("Error checking place");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setResult("");
  };

  return (
    <Container>
      <TextField
        type="text"
        variant="outlined"
        onChange={handleChange}
        value={value}
      />
      <Button onClick={handleCheck}>Check</Button>
      <p>{result}</p>
    </Container>
  );
}
