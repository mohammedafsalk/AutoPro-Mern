import express from "express";
import {
  centerPassReset,
  demoLogin,
  forgotOtp,
  loginVerify,
  proofUpdate,
  serviceCenterLogin,
  serviceCenterLogout,
  serviceCenterSignup,
  verifyForgetOtp,
} from "../Controllers/serviceCenterController.js";
const router = express.Router();

router.post("/signup", serviceCenterSignup);
router.route("/login").post(serviceCenterLogin).get(demoLogin);
router.get("/logout", serviceCenterLogout);
router.get("/checkLogin", loginVerify);

router.post("/forgot", forgotOtp);
router.post("/forgot/verifyOtp", verifyForgetOtp);
router.post("/forgot/resetPassword", centerPassReset);

router.patch("/reApply", proofUpdate);

export default router;
