import express from "express";
import {
  acceptRequest,
  acceptWithdrawRequests,
  adminDashboard,
  bookings,
  deleteUser,
  getWithdrawRequests,
  rejectRequest,
  requests,
  serviceCenters,
  userAccessSetting,
  users,
} from "../Controllers/adminController.js";
const router = express.Router();

router.get("/", adminDashboard);
router.get("/users", users);
router.delete("/users/:id", deleteUser);
router.post("/users", userAccessSetting);
router.get("/service-centers", serviceCenters);
router.get("/requests", requests);
router.post("/requests/accept", acceptRequest);
router.post("/requests/reject", rejectRequest);
router.get("/bookings", bookings);
router
  .route("/withdraws")
  .get(getWithdrawRequests)
  .post(acceptWithdrawRequests);

export default router;
