import express from "express";
import { checkUserLoggedIn, forgotOtp, signUpVerify, userLogin, userLogout, userSignup } from "../Controllers/userController.js";
const router = express.Router();

router.post('/signup',userSignup)
router.post('/signup/verify',signUpVerify)
router.post('/login',userLogin)
router.get('/check',checkUserLoggedIn)
router.get('/logout',userLogout)

router.post("/forgot",forgotOtp)

export default router;
