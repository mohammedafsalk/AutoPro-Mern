import express from "express";
import { acceptRequest, requests } from "../Controllers/adminController.js";
const router = express.Router();

router.get("/requests", requests);
router.post("/requests/accept",acceptRequest);

export default router;
