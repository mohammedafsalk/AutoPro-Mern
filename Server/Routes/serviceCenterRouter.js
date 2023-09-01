import express from "express";
import {
  addWorker,
  assignWork,
  centerDashboard,
  getBookings,
  getSchedule,
  getWorkers,
  profileUpdate,
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
router.route("/").get(centerDashboard)
router.patch('/bookings/assignWork',assignWork)
router.patch('/bookings/invoice',updateInvoice)
router.patch('/profile',profileUpdate)


router.route("/schedule").post(setSchedule).get(getSchedule);

export default router;
