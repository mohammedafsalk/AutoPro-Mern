import express from "express";
import {
  acceptRequest,
  adminDashboard,
  deleteUser,
  rejectRequest,
  requests,
  serviceCenters,
  users,
} from "../Controllers/adminController.js";
const router = express.Router();

router.get("/", adminDashboard);
router.get("/users", users);
router.delete("/users/:id", deleteUser);
router.get("/service-centers", serviceCenters);
router.get("/requests", requests);
router.post("/requests/accept", acceptRequest);
router.post("/requests/reject", rejectRequest);

export default router;
