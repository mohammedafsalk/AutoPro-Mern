import mongoose from "mongoose";
import ServiceCenterModel from "../Models/serviceCenterModel.js";


function dbConnect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((result) => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Database error \n" + err);
    });
}

export default dbConnect;
