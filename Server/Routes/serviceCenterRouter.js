import express from "express";
import {
  addWorker,
  getSchedule,
  getWorkers,
  setSchedule,
  workerAccessSetting,
} from "../Controllers/serviceCenterController.js";
const router = express.Router();

router
  .route("/workers")
  .get(getWorkers)
  .post(addWorker)
  .patch(workerAccessSetting);

router.route("/schedule").post(setSchedule).get(getSchedule);

export default router;
