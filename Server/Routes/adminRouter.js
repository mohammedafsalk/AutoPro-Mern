import express from "express";
import {
  acceptRequest,
  rejectRequest,
  requests,
} from "../Controllers/adminController.js";
const router = express.Router();

router.get("/requests", requests);
router.post("/requests/accept", acceptRequest);
router.post("/requests/reject", rejectRequest);

export default router;
