import mongoose from "mongoose";
const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "serviceCenter",
  },
  bookingId: {
    type: Array,
  },
});

const workerModel = mongoose.model("Workers", workerSchema);
export default workerModel;
