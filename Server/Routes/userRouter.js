import express from "express";

import {
  addReview,
  chooseServiceCenter,
  getServiceCenter,
  getServiceCenterSchedule,
  getUserBookings,
} from "../Controllers/userController.js";
import {
  paymentOrder,
  verifyBillPayment,
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
router.post("/payment/bill/verify", verifyBillPayment);

router.route("/bookings").get(getUserBookings).patch(addReview)
export default router;
