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
    mobile: {
      type: Number,
    },
    email: {
      type: String,
    },
    vehicleNumber: {
      type: String,
    },
    vehicleName: {
      type: String,
    },
    brand: {
      type: String,
    },
    date: {
      type: String,
    },
    place: {
      type: String,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "service pending",
        "vehicle picked up",
        "service started",
        "unpaid",
        "paid",
        "delivered",
        "cancelled",
        "refund processing",
        "refund completed",
      ],
      required: true,
      default: "service pending",
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", BookingSchema);
export default BookingModel;
