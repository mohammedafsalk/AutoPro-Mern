import React, { useState, useEffect } from "react";
import mapboxAPI from "./MapBoxApi";
import { MDBInput } from "mdb-react-ui-kit";
import { Button } from "@mui/material";

function MapSearchBox({ setFormData }) {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [items, seItems] = useState([]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    fetchSuggestions(value);
  };
  const fetchSuggestions = async (value) => {
    try {
      const region = "Kerala";
      const radius = 100000;
      const proximity = " 76.2711,10.8505";
      const query = `places ${value} in ${region}`;
      const access_token =
        "pk.eyJ1IjoiYWZzYWw0NTYiLCJhIjoiY2xteWRtd2MzMWpsMzJpcGV2aHAybm1xaCJ9.o_CpCUnw2iXwQ2IlW_ZEjQ";

      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?region=${encodeURIComponent(
        region
      )}&proximity=${encodeURIComponent(
        proximity
      )}&radius=${radius}&access_token=${access_token}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network Error");
      }

      let data = await response.json();

      seItems(data.features);
      const suggestions = data.features.map((feature) => feature.place_name);
      setSuggestions(suggestions);
    } catch (error) {
      console.log(error);
      console.error("Error fetching suggestions:", error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const onSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const accessToken =
      "pk.eyJ1IjoiYWZzYWw0NTYiLCJhIjoiY2xteWRtd2MzMWpsMzJpcGV2aHAybm1xaCJ9.o_CpCUnw2iXwQ2IlW_ZEjQ";
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

    fetch(geocodingUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const placeName = data.features[0].text;
          let [long, lat] = data.features[0].center;
          const district = data.features[0].context[3].text;
          setSearchValue(placeName + ", " + district);
          setFormData((prev) => ({
            ...prev,
            location: placeName + ", " + district,
            latitude: lat,
            longitude: long,
          }));
        }
      })
      .catch((error) => {
        console.log("Error occurred during geocoding:", error);
      });
  };

  const onError = (error) => {
    console.log("Error occurred during geolocation:", error);
  };
  const handleSuggestionClick = (suggestion) => {
    let value = items.find((item) => item.place_name === suggestion);
    let [long, lat] = value.center;
    const placeName = value.text;
    let district;
    for (let obj of value.context) {
      if (obj.id.includes("district")) {
        district = obj.text;
      } else if (obj.id.includes("locality")) {
        district = obj.text;
      } else {
        district = "Kerala";
      }
    }
    setSearchValue(placeName + ", " + district);
    setFormData((prev) => ({
      ...prev,
      location: placeName + ", " + district,
      latitude: lat,
      longitude: long,
    }));
    setSuggestions([]);
  };
  return (
    <>
      <div>
        <fieldset>
          <div style={{ position: "relative" }}>
            <MDBInput
              wrapperClass="mb-1"
              type="text"
              label="Location"
              value={searchValue}
              size="lg"
              onChange={handleSearchChange}
            />
            {suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 1,
                  background: "#fff",
                  padding: "5px",
                }}
              >
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion._id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{ cursor: "pointer" }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </fieldset>
      </div>
      <div>
        <Button onClick={getCurrentLocation}>Get Current Location</Button>
      </div>
    </>
  );
}

export default MapSearchBox;
