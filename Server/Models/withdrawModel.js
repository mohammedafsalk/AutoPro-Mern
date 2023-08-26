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
    default:true
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const WithdrawModel = mongoose.model("Withdraw", Schema);
export default WithdrawModel;
