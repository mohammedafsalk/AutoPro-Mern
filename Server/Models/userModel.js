import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { getCurrentDirectory } from "../DirectoryHelper.js";
import path from "path";
const UserSchema = new mongoose.Schema({
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
  admin: {
    type: String,
    default: false,
  },
  phone: {
    type: Number,
    required: true,
  },
  profile: {
    type: String,
  },
  block: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const currentDirectory = getCurrentDirectory();
    const avatar = path.join(currentDirectory, "public/User/avatar.png");
    const result = await uploadImageToCloudinary(avatar);
    this.profile = result.secure_url;

    next();
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
});

async function uploadImageToCloudinary(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "AutoPro",
    });
    return result;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
