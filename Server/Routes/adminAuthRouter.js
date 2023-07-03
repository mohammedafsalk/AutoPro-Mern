import express from "express";
import { adminLogin } from "../Controllers/adminController.js";
const router = express.Router();

router.get("/checkLogin");
router.get("/logout");
router.post("/login",adminLogin);

export default router;
