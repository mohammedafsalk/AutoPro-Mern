import React from "react";
import { MDBBtn, MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import axios from "axios";
import UserNav from "./UserNav";
import banner from "../../assets/images/bannerDemo.jpeg";

export default function Userhome() {
  return (
    <div>
      <UserNav />
      {/* <div className="container my-3">
        <MDBCarousel showControls showIndicators>
          <MDBCarouselItem
            className="w-100 d-block rounded-5 "
            itemId={1}
            src={banner}
            alt="..."
          >
            <MDBBtn>Book Your Slot</MDBBtn>
          </MDBCarouselItem>
        </MDBCarousel>
      </div> */}
    </div>
  );
}
