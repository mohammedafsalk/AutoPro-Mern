import express from "express";
import { addWorker } from "../Controllers/serviceCenterController.js";
const router = express.Router();

router.route("/workers").post(addWorker);

export default router;
