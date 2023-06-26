import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import dbConnect from "./config/dbConnect.js";
import userAuthRouter from "./Routes/userAuthRouter.js";
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
// app.use('/user',userRouter)

app.listen(5000, () => {
  console.log("Server Up at 5000");
});
