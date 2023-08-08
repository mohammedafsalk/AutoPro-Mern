import express from "express";

import {
  chooseServiceCenter,
  getServiceCenter,
  getServiceCenterSchedule,
  getUserBookings,
} from "../Controllers/userController.js";
import {
  paymentOrder,
  verifyPayment,
} from "../Controllers/paymentController.js";
const router = express.Router();

router
  .route("/service-centers")
  .get(chooseServiceCenter)
  .post(getServiceCenter);

router.get("/schedule/:id", getServiceCenterSchedule);
router.post("/payment", paymentOrder);
router.post("/payment/verify", verifyPayment);

router.route("/bookings").get(getUserBookings);
export default router;
