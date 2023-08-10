import React, { useState, useEffect } from "react";
import mapboxAPI from "./MapBoxApi";
import { MyLocationOutlined } from "@mui/icons-material";
import { MDBInput } from "mdb-react-ui-kit";

function MapSearchBox({ setPlace }) {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    fetchSuggestions(value);
  };
  useEffect(() => {
    setPlace(searchValue);
  }, [searchValue]);

  const fetchSuggestions = async (value) => {
    try {
      const url = `/geocoding/v5/mapbox.places/${encodeURIComponent(
        value
      )}.json`;
      const response = await mapboxAPI.get(url);
      const suggestions = response.data.features.map(
        (feature) => feature.place_name
      );
      setSuggestions(suggestions);
    } catch (error) {
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
      "pk.eyJ1IjoiYWZzYWw0NTYiLCJhIjoiY2xraHU0N3NoMDZmcjNxbzZpN3k3bThpYyJ9.-sQCN_GaOvYY-3Ho92UpOg";
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

    fetch(geocodingUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const placeName = data.features[0].place_name;
          setSearchValue(placeName);
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
    setSearchValue(suggestion.split(",")[0].trim());
    setSuggestions([]);
  };

  return (
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
            containerClass="md-form"
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
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{ cursor: "pointer" }}
                >
                  {suggestion.substring(0, 20)}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 10 }} onClick={getCurrentLocation}>
          <p>Choose Current Location</p>
          <MyLocationOutlined />
        </div>
      </fieldset>
    </div>
  );
}

export default MapSearchBox;
