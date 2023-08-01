import express from "express";
import {
  EditPackage,
  addPackage,
  deletePackage,
  editCustom,
  getPackages,
  saveCustom,
} from "../Controllers/serviceCenterController.js";
const router = express.Router();

router
  .route("/package")
  .get(getPackages)
  .post(addPackage)
  .put(EditPackage)
  .delete(deletePackage);

router.route("/custom-package").post(saveCustom).put(editCustom);

export default router;
