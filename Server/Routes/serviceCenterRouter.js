import express from "express";
import {
  addWorker,
  assignWork,
  getBookings,
  getSchedule,
  getWorkers,
  setSchedule,
  updateInvoice,
  workerAccessSetting,
} from "../Controllers/serviceCenterController.js";
const router = express.Router();

router
  .route("/workers")
  .get(getWorkers)
  .post(addWorker)
  .patch(workerAccessSetting);

router.route("/bookings").get(getBookings)
router.patch('/bookings/assignWork',assignWork)
router.patch('/bookings/invoice',updateInvoice)

router.route("/schedule").post(setSchedule).get(getSchedule);

export default router;
