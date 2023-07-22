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
      this.packageImage = "default_basic_image.jpg";
    } else if (this.packageType === "Standard") {
      this.packageImage = "default_standard_image.jpg";
    } else if (this.packageType === "Premium") {
      this.packageImage = "default_premium_image.jpg";
    } else {
      this.packageImage = "default_image.jpg";
    }
  }
  next();
});

const PackageModel = mongoose.model("Package", PackageSchema);
export default PackageModel;
