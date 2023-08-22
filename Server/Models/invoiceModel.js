import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  details: {
    type: String,
  },
  price: {
    type: Number,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
});

const invoiceModel = mongoose.model("Invoice", invoiceSchema);
export default invoiceModel;