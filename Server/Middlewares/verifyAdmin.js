import jwt from "jsonwebtoken";
import AdminModel from "../Models/adminModel.js";

export async function verifyAdminAuth(req, res, next) {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.json({
        loggedIn: false,
        err: true,
        message: "No Token Found",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminModel.findById(verified.id, { password: 0 });
    if (!admin) {
      return res.json({ loggedIn: false });
    }
    req.admin = admin;
    next();
  } catch (error) {
    res.json({
      error: error,
      message: "Something Went Wrong",
      loggedIn: false,
    });
  }
}
