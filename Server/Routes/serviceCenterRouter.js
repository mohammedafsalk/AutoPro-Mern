import express from "express";
import {
  EditPackage,
  addPackage,
  getPackages,
} from "../Controllers/serviceCenterController.js";
const router = express.Router();

router.route("/package").get(getPackages).post(addPackage).put(EditPackage);
export default router;
