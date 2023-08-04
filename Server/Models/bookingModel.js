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
    packageType: {
      type: String,
    },
    customDetails: {
      type: Array,
    },
    ExpectedDate: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      },
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", BookingSchema);
export default BookingModel;
