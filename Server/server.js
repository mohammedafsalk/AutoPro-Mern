import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import dbConnect from "./config/dbConnect.js";
import userAuthRouter from "./Routes/userAuthRouter.js";
import adminAuthRouter from "./Routes/adminAuthRouter.js";
import adminRouter from "./Routes/adminRouter.js";
import userRouter from "./Routes/userRouter.js";
import serviceCenterRouter from "./Routes/serviceCenterRouter.js";
import { verifyAdminAuth } from "./Middlewares/verifyAdmin.js";
import { verifyUserAuth } from "./Middlewares/verifyUser.js";
import { verifyServiceCenter } from "./Middlewares/verifyServiceCenter.js";
import serviceCenterAuthRouter from "./Routes/serviceCenterAuthRouter.js";
import path from "path";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve() + "/public"));

dbConnect();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/user/auth/", userAuthRouter);
app.use("/user", verifyUserAuth, userRouter);
app.use("/admin/auth/", adminAuthRouter);
app.use("/admin", verifyAdminAuth, adminRouter);
app.use("/service-center/auth/", serviceCenterAuthRouter);
app.use("/service-center", verifyServiceCenter, serviceCenterRouter);

app.listen(5000, () => {
  console.log("Server Up at 5000");
});
