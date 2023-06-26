import express from "express";
import { checkUserLoggedIn, signUpVerify, userLogin, userLogout, userSignup } from "../Controllers/userController.js";
const router = express.Router();

router.post('/signup',userSignup)
router.post('/signup/verify',signUpVerify)
router.post('/login',userLogin)
router.get('/logout',userLogout)
router.get('/check',checkUserLoggedIn)

export default router;
