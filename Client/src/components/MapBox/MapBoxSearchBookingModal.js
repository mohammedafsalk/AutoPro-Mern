import React, { useState, useEffect } from "react";
import mapboxAPI from "./MapBoxApi";
import { MDBInput } from "mdb-react-ui-kit";


function MapSearchBoxBookingModal({ setFormData, handleFormData }) {
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
      const bbox = "74.3734,8.1901,77.0369,12.9896";
      const proximity = "76.2711,10.8505";
      const query = `places ${value}`;

      const url = `/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?bbox=${bbox}&proximity=${encodeURIComponent(proximity)}`;

      const response = await mapboxAPI.get(url);
      seItems(response.data.features);
      const suggestions = response.data.features.map(
        (feature) => feature.place_name
      );
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };


  const handleSuggestionClick = (suggestion) => {
    let value = items.find((item) => item.place_name === suggestion);
    const placeName = value.text;

    setSearchValue(placeName);
    setFormData((prev) => ({
      ...prev,
      place: placeName,
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
    </>
  );
}

export default MapSearchBoxBookingModal;
