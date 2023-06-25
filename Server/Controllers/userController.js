import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

var salt = bcrypt.genSaltSync(20);

export async function userSignup(req, res) {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) return res.json({ message: "User already registered!" });
  
}
