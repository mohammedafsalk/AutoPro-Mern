import mongoose from "mongoose";
import ServiceCenterModel from "../Models/serviceCenterModel.js";
import cron from "node-cron";

function dbConnect() {
  mongoose
    .connect("mongodb://127.0.0.1/AutoPro")
    .then((result) => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Database error \n" + err);
    });

  cron.schedule("0 0 * * *", async () => {
    try {
      await ServiceCenterModel.updateMany({}, { slot: 10 });
      console.log("Slots reset to 10 for all service centers");
    } catch (err) {
      console.error("An error occurred while resetting slots:", err);
    }
  });
}

export default dbConnect;
