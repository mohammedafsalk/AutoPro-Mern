import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  accountNo: {
    type: String,
    required: true,
  },
  ifsc: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  branch: {
    type: String,
    required: true,
  },
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "serviceCenter",
  },
  reqStatus: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const WithdrawModel = mongoose.model("Withdraw", Schema);
export default WithdrawModel;
