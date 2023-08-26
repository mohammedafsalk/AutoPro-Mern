import React, { useState, useEffect, useRef } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";

export default function ShowMap({ open, latitude, longitude, data }) {
  const [basicModal, setBasicModal] = useState(false);
  const mapContainer = useRef(null);
  let map = null;
  const initializeMap = () => {
    if (!mapContainer.current) return;
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWZzYWw0NTYiLCJhIjoiY2xraHU0N3NoMDZmcjNxbzZpN3k3bThpYyJ9.-sQCN_GaOvYY-3Ho92UpOg";

    map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 9,
    });
    map.on("load", () => {
      data.forEach((item) => {
        const { latitude, longitude, name, location, _id } = item;

        if (latitude && longitude) {
          const marker = new mapboxgl.Marker({ color: "blue"})
            .setLngLat([longitude, latitude])
            .addTo(map);

            marker.getElement().addEventListener("click", () => {
              window.location.href = `/select-package/${_id}`;
            });

          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          }).setHTML(`<div>${name}</div>
            <div>${location}</div>`);

          marker.setPopup(popup);

          marker.getElement().addEventListener("mouseenter", () => {
            popup.addTo(map);
          });
          marker.getElement().addEventListener("mouseleave", () => {
            popup.remove();
          });
        }
      });
    });
  };

  useEffect(() => {
    initializeMap();
  }, [data, latitude, longitude]);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <MDBModal show={open} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody>
              <div
                ref={mapContainer}
                style={{ height: "600px", width: "100%" }}
              />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
