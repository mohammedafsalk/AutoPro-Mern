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
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workers",
    },
    invoice: {
      type: Array,
      default: [],
    },
    billPayment: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      enum: [
        "Waiting For Pickup",
        "Vehicle Picked Up",
        "Service Started",
        "Waiting For Confirmation",
        "Service Completed",
        "Not Paid",
        "Paid",
        "Delivered",
        "Cancelled",
        "Refund Processing",
        "Refund Completed",
      ],
      required: true,
      default: "Waiting For Pickup",
    },
    amountPaid: {
      type: Number,
    },
  },
  { timestamps: true }
);

BookingSchema.pre("save", function (next) {
  if (this.status === "Paid") {
    const sumRs = this.invoice.reduce((sum, item) => sum + item.price, 0);
    this.amountPaid = sumRs + 100;
  }
  next();
});

const BookingModel = mongoose.model("Booking", BookingSchema);
export default BookingModel;
