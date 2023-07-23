import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { getCurrentDirectory } from "../DirectoryHelper.js";
import path from "path";
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

PackageSchema.pre("save", async function (next) {
  if (!this.packageImage) {
    try {
      const currentDirectory = getCurrentDirectory();
      if (this.packageType === "Basic") {
        const basicImage = path.join(
          currentDirectory,
          "public/Packages/Basic.jpeg"
        );
        const result = await uploadImageToCloudinary(basicImage);
        this.packageImage = result.secure_url;
      } else if (this.packageType === "Standard") {
        const standardImage = path.join(
          currentDirectory,
          "public/Packages/Standard.jpeg"
        );
        const result = await uploadImageToCloudinary(standardImage);
        this.packageImage = result.secure_url;
      } else if (this.packageType === "Premium") {
        const premiumImage = path.join(
          currentDirectory,
          "public/Packages/Premium.jpeg"
        );
        const result = await uploadImageToCloudinary(premiumImage);
        this.packageImage = result.secure_url;
      } else {
        this.packageImage = "/Packages/Basic.jpeg";
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  }
  next();
});

async function uploadImageToCloudinary(imagePath) {
  try {
    console.log(imagePath);
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "AutoPro",
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}

const PackageModel = mongoose.model("Package", PackageSchema);
export default PackageModel;
