import express from "express";
import { getBookings, setStatus } from "../Controllers/workerController.js";
const router = express.Router();

router.route("/view-bookings").get(getBookings).patch(setStatus);

export default router;
