import express from "express";

import {
  addReview,
  chooseServiceCenter,
  getMapList,
  getServiceCenter,
  getServiceCenterSchedule,
  getUserBookings,
  profileUpdate,
} from "../Controllers/userController.js";
import {
  cancelPayment,
  paymentOrder,
  verifyBillPayment,
  verifyPayment,
} from "../Controllers/paymentController.js";
const router = express.Router();

router
  .route("/service-centers")
  .get(chooseServiceCenter)
  .post(getServiceCenter);

router.get("/loadmap", getMapList);
router.get("/schedule/:id", getServiceCenterSchedule);
router.post("/payment", paymentOrder);
router.post("/payment/cancel", cancelPayment);
router.post("/payment/verify", verifyPayment);
router.post("/payment/bill/verify", verifyBillPayment);
router.route("/bookings").get(getUserBookings).patch(addReview);
router.route("/profile").patch(profileUpdate);
export default router;
