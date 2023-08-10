import jwt from "jsonwebtoken";
import UserModel from "../Models/userModel.js";

export async function verifyUserAuth(req, res, next) {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.json({
        loggedIn: false,
        err: true,
        message: "No Token Found",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(verified.id, { password: 0 });
    if (!user) {
      return res.json({ loggedIn: false });
    }
    req.user = user;
    next();
  } catch (error) {
    res.json({
      error: error,
      message: "Something Went Wrong",
      loggedIn: false,
    });
  }
}
