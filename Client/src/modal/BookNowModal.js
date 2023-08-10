import React, { useState, useEffect } from "react";
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
  MDBCheckbox,
  MDBTextArea,
} from "mdb-react-ui-kit";
import {
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import getDayName from "../utils/getDayName";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BookNowModal({ open, id, setOpen }) {
  const navigate = useNavigate();
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

  const toggleShow = () => setOpen(!open);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get("/user/schedule/" + id);
    console.log(!data.err && data.schedule);
    if (!data.err && data.schedule) {
      console.log("hai");
      const scheduleData = data.schedule;
      let date = new Date(),
        n = 0;
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
    } else {
      console.log("jojojojojodjofjojojsofjsfosjofsj");
    }
  };

  const handleBooking = async () => {
    const { data } = await axios.post("/user/payment", { amount: 100 });
    console.log(formData);
    if (!data.err) {
      handleRazorPay(data.order);
    }
  };
  const handleRazorPay = (order) => {
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
        });
        if (data.err) {
          toast.error(data.message);
        } else {
          toast.success("Payment SuccessFull");
          navigate("/profile");
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
    <Toaster/>
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
                    label="Vehicle Number"
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
                    value={formData.brand}
                    name="brand"
                    label="Brand"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
                </MDBCol>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    onChange={handleFormData}
                    value={formData.mobile}
                    name="mobile"
                    label="Mobile"
                    id="formControlDefault"
                    size="lg"
                    type="number"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol className="mt-2" md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Date</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      onChange={handleFormData}
                      value={formData.date}
                      name="date"
                      id="demo-simple-select"
                      fullWidth
                      size="small"
                      label="Date"
                      variant="outlined"
                    >
                      {datesAvailable[0] &&
                        datesAvailable.map((date, index) => (
                          <MenuItem value={date}>
                            {date.toLocaleDateString()}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </MDBCol>
                <MDBCol className="mt-2" md={6}>
                  <MDBInput
                    onChange={handleFormData}
                    value={formData.place}
                    name="place"
                    label="Place"
                    id="formControlDefault"
                    size="lg"
                    type="text"
                  />
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
              <MDBBtn color="dark" onClick={handleBooking}>
                Book Now
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
