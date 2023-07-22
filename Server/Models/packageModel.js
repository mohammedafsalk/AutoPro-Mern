import mongoose from "mongoose";
const PackageSchema = new mongoose.Schema({
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceCenter",
  },
  packageType: {
    type: String,
  },
  packageDetails: {
    type: [String], 
  },
});

const PackageModel = mongoose.model("Package", PackageSchema);
export default PackageModel;
