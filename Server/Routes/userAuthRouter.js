import express from "express";
import {
  checkUserLoggedIn,
  forgotOtp,
  googleAuth,
  resendOtp,
  signUpVerify,
  userLogin,
  userLogout,
  userPassReset,
  userSignup,
  verifyForgetOtp,
  verifyGAuth,
} from "../Controllers/userController.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/signup/verify", signUpVerify);
router.post("/resendOtp", resendOtp);
router.post("/login", userLogin);
router.get("/check", checkUserLoggedIn);
router.get("/logout", userLogout);

router.get("/google/callback", googleAuth);
router.get("/google/verify", verifyGAuth);

router.post("/forgot", forgotOtp);
router.post("/forgot/verify", verifyForgetOtp);
router.post("/forgot/resetPassword", userPassReset);

export default router;
