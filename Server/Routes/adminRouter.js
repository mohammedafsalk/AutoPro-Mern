import express from "express";
import { requests } from "../Controllers/adminController.js";
const router = express.Router();

router.get("/requests", requests);

export default router;
