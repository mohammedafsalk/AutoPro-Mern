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
  packageImage: {
    type: String,
  },
});

PackageSchema.pre("save", function (next) {
  if (!this.packageImage) {
    if (this.packageType === "Basic") {
      this.packageImage = "/Packages/Basic.jpeg";
    } else if (this.packageType === "Standard") {
      this.packageImage = "/Packages/Standard.jpeg";
    } else if (this.packageType === "Premium") {
      this.packageImage = "/Packages/Premium.jpeg";
    } else {
      this.packageImage = "/Packages/Basic.jpeg";
    }
  }
  next();
});

const PackageModel = mongoose.model("Package", PackageSchema);
export default PackageModel;
