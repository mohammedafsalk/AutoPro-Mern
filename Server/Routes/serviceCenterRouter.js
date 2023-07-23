import express from "express";
import { addPackage, getPackages } from "../Controllers/serviceCenterController.js";
const router = express.Router();

router.post('/package',addPackage)
router.get('/package',getPackages)

export default router;
