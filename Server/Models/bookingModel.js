import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    centerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCenter",
    },
    name: {
      type: String,
    },
    contactNo: {
      type: Number,
    },
    emailId: {
      type: String,
    },
    vehicleRegNo: {
      type: String,
    },
    vehicleName: {
      type: String,
    },
    brand: {
      type: String,
    },
    status:{
      type:String,
      enum: ["service pending", "vehicle picked up", "service started","unpaid", "paid", "delivered", "cancelled", "refund processing", "refund completed"],
      required:true,
      default:"pending"
    }
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", BookingSchema);
export default BookingModel;
