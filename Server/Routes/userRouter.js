import express from "express";
import {
  chooseServiceCenter,
  getServiceCenter,
} from "../Controllers/userController.js";
const router = express.Router();

router
  .route("/service-centers")
  .get(chooseServiceCenter)
  .post(getServiceCenter);

export default router;
