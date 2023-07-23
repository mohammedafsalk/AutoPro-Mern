import express from "express";
import { addPackage } from "../Controllers/serviceCenterController.js";
const router = express.Router();

router.post('/package',addPackage)

export default router;
