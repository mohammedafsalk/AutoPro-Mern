import React, { useState, useEffect } from "react";
import "../../src/assets/css/login.css";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBInput,
  MDBCol,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import getDayName from "../utils/getDayName";
import { validatePlace } from "../helpers/placeValidator";
import { calculateDistance } from "../helpers/distanceCalculator";
import { priceChecker } from "../helpers/priceSetter";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MapSearchBoxBookingModal from "../components/MapBox/MapBoxSearchBookingModal";
import CustomDatePicker from "../components/user/CustomDatePicker";

export default function BookNowModal({
  open,
  id,
  setOpen,
  serviceCenter,
  handleSuccess,
}) {
  const serviceCenterLatitude = serviceCenter.latitude;
  const serviceCenterLongitude = serviceCenter.longitude;
  const priceRanges = serviceCenter.pickUpPrice;

  const userId = useSelector((state) => {
    return state.user.details._id;
  });
  const [datesAvailable, setDatesAvailable] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vehicleName: "",
    vehicleNumber: "",
    brand: "",
    mobile: "",
    date: "",
    place: "",
    address: "",
  });
  const validForm = () => {
    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.vehicleName.trim() === "" ||
      formData.vehicleNumber.trim() === "" ||
      formData.brand.trim() === "" ||
      formData.mobile.trim() === "" ||
      formData.place.trim() === "" ||
      formData.address.trim() === ""
    ) {
      return false;
    }
    return true;
  };
  const toggleShow = () => setOpen(!open);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get("/user/schedule/" + id);
    if (!data.err && data.schedule) {
      const scheduleData = data.schedule;
      let date = new Date();
      let n = 0;
      let tempDatesAvailable = [];
      while (n < 9) {
        date = new Date(new Date().setDate(new Date(date).getDate() + 1));
        let day = new Date(date).getDay();
        let dayName = getDayName(day);
        if (scheduleData[dayName]) {
          tempDatesAvailable.push(date);
        }
        n++;
      }
      setDatesAvailable([...tempDatesAvailable]);
    }
  };

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  function validateVehicleNumber(vehicleNumber) {
    const vehicleNumberPattern = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/;
    return vehicleNumberPattern.test(vehicleNumber);
  }

  function validateMobileNumber(mobileNumber) {
    return /^\d{1,10}$/.test(mobileNumber);
  }

  const handleBooking = async () => {
    setOpen(false);
    const isEmailValid = validateEmail(formData.email);
    const isVehicleNumberValid = validateVehicleNumber(formData.vehicleNumber);
    const isMobileNumberValid = validateMobileNumber(formData.mobile);
    if (!isEmailValid) {
      toast.error("Ensure email is properly entered");
      return;
    }
    if (!isVehicleNumberValid) {
      toast.error("Enter vehicle number is in correct format KL-XX-XX-XXXX ");
      return;
    }
    if (!isMobileNumberValid) {
      toast.error("Ensure mobile number is properly entered");
      return;
    }
    const data = await validatePlace(formData.place);
    const { latitude, longitude } = data;
    if (data.isValid) {
      const distance = calculateDistance(
        latitude,
        longitude,
        serviceCenterLatitude,
        serviceCenterLongitude
      );
      console.log(distance);
      const amount = priceChecker(distance, priceRanges);

      if (typeof amount === "undefined") {
        toast.error("Enter a place which is inside our pickUp range");
        return;
      }

      const { data } = await axios.post("/user/payment", { amount });
      if (!data.err) {
        handleRazorPay(data.order);
      }
    } else {
      toggleShow();
      toast.error(data.message);
    }
  };
  const handleRazorPay = (order) => {
    let deliveryCharge = order.amount / 100;
    const options = {
      key: "rzp_test_0ksLH8MhxszVRr",
      amount: order.amount,
      currency: order.currency,
      name: "Auto Pro",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
        const {
          name,
          email,
          vehicleName,
          vehicleNumber,
          brand,
          mobile,
          date,
          place,
          address,
        } = formData;
        const { data } = await axios.post("/user/payment/verify", {
          response,
          name,
          email,
          vehicleName,
          vehicleNumber,
          brand,
          mobile,
          date,
          place,
          address,
          centerId: id,
          userId,
          deliveryCharge,
        });
        if (data.err) {
          toast.error(data.message);
        } else {
          handleSuccess();
        }
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", (response) => {
      toast.error("Payment Failed");
      setRefresh(!refresh);
    });
  };
  const handleFormData = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      setFormData((prev) => ({ ...prev, brand: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  return (
    <>
      <Toaster />
      <MDBModal tabIndex="-1" show={open} setShow={setOpen}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Enter Vehicle Details</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    onChange={handleFormData}
                    value={formData.name}
                    name="name"
                    label="User Name"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    onChange={handleFormData}
                    value={formData.email}
                    name="email"
                    label="User Email"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    onChange={handleFormData}
                    value={formData.vehicleName}
                    name="vehicleName"
                    label="Vehicle Name"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    onChange={handleFormData}
                    value={formData.vehicleNumber}
                    name="vehicleNumber"
                    placeholder="KL-XX-XX-XXXX"
                    label="Vehicle Number"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-2" md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Brands</InputLabel>
                    <Select
                      name="brand"
                      value={formData.brand}
                      onChange={handleFormData}
                    >
                      {serviceCenter.brands.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MDBCol>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    onChange={handleFormData}
                    value={formData.mobile}
                    name="mobile"
                    label="Mobile"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-2" md={6}>
                  <CustomDatePicker
                    datesAvailable={datesAvailable}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </MDBCol>
                <MDBCol className="mt-2" md={6}>
                  <MapSearchBoxBookingModal setFormData={setFormData} />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-2">
                  <MDBTextArea
                    label="Address"
                    onChange={handleFormData}
                    name="address"
                    value={formData.address}
                    id="textAreaExample"
                    rows={3}
                  />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="dark" outline onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn
                color="dark"
                disabled={!validForm()}
                onClick={handleBooking}
              >
                Book Now
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
