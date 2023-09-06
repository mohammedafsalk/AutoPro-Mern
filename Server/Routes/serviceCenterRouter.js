import express from "express";
import {
  addWorker,
  assignWork,
  centerDashboard,
  getBookings,
  getPriceRange,
  getSchedule,
  getWorkers,
  manageBrands,
  manageCategories,
  profileUpdate,
  setPriceRange,
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

router.route("/bookings").get(getBookings);
router.route("/").get(centerDashboard);
router.patch("/bookings/assignWork", assignWork);
router.patch("/bookings/invoice", updateInvoice);
router.patch("/profile", profileUpdate);
router.route("/priceRanges").patch(setPriceRange).get(getPriceRange);
router.route("/schedule").post(setSchedule).get(getSchedule);
router.route("/categories").patch(manageCategories)
router.route("/brands").patch(manageBrands)

export default router;
