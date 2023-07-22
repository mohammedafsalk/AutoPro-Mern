import express from "express";
import { chooseServiceCenter } from "../Controllers/userController.js";
const router = express.Router();

router.get("/chooseServiceCenter", chooseServiceCenter);

export default router;
