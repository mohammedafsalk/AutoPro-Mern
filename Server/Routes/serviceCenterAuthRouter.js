import express from "express";
import {
  loginVerify,
  serviceCenterLogin,
  serviceCenterLogout,
  serviceCenterSignup,
} from "../Controllers/serviceCenterController.js";
const router = express.Router();

router.post("/signup", serviceCenterSignup);
router.post("/login", serviceCenterLogin);
router.get("/logout", serviceCenterLogout);
router.get("/checkLogin", loginVerify);

export default router;
