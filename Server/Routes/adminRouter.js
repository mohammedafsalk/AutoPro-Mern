import express from "express";
import { adminDashboard } from "../Controllers/adminController.js";
const router = express.Router();

router.get('/dashboard',adminDashboard)

export default router;
