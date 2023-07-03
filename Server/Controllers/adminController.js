import AdminModel from "../Models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);

export async function adminLogin(req, res) {
  try {
    const adminData = {
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    const newAdmin = new AdminModel(adminData);
    await newAdmin.save();

    console.log("Admin created successfully");
  } catch (error) {
    console.log(`${error.message}`);
  }
}
