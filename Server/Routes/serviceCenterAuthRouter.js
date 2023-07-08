import express from "express";
import {
  centerPassReset,
  forgotOtp,
  loginVerify,
  serviceCenterLogin,
  serviceCenterLogout,
  serviceCenterSignup,
  verifyForgetOtp,
} from "../Controllers/serviceCenterController.js";
const router = express.Router();

router.post("/signup", serviceCenterSignup);
router.post("/login", serviceCenterLogin);
router.get("/logout", serviceCenterLogout);
router.get("/checkLogin", loginVerify);

router.post("/forgot", forgotOtp);
router.post("/forgot/verifyOtp", verifyForgetOtp);
router.post("/forgot/resetPassword", centerPassReset);

export default router;
