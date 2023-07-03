import express from "express";
import { adminCheckLogin, adminLogin, adminLogout } from "../Controllers/adminController.js";
const router = express.Router();

router.get("/checkLogin",adminCheckLogin);
router.get("/logout",adminLogout);
router.post("/login",adminLogin);

export default router;
