import React, { useState, useEffect, useRef } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

export default function ShowMap({ open, latitude, longitude, data }) {
  const [basicModal, setBasicModal] = useState(false);
  const mapContainer = useRef(null);
  let map = null;
  console.log("first");
  const initializeMap = () => {
    console.log("second");

    if (!mapContainer.current) return;
    console.log("third");
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWZzYWw0NTYiLCJhIjoiY2xraHU0N3NoMDZmcjNxbzZpN3k3bThpYyJ9.-sQCN_GaOvYY-3Ho92UpOg";

    map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 9,
    });
    console.log("fourth");

    map.on("load", () => {
      console.log("fifth");
      data.forEach((item) => {
        const { latitude, longitude, name } = item;

        if (latitude && longitude) {
          const marker = new mapboxgl.Marker({ color: "blue" })
            .setLngLat([longitude, latitude])
            .addTo(map);

          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          }).setHTML(`<div>${name}</div>`);

          marker.setPopup(popup);
        }
      });
    });
  };

  useEffect(() => {
    console.log("sixth");

    initializeMap();
  }, [data, latitude, longitude]);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn>
      <MDBModal show={open} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            
            <MDBModalBody>
              <div
                ref={mapContainer}
                style={{ height: "600px", width: "100%" }}
              />
            </MDBModalBody>

            {/* <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter> */}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
