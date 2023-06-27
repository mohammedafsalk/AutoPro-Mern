import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sentOTP from "../helpers/sentOtp.js";
import crypto from "crypto";

var salt = bcrypt.genSaltSync(10);

export async function userSignup(req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user)
      return res.json({ err: true, message: "User already registered!" });
    let otp = Math.ceil(Math.random() * 100000);
    let otpHash = crypto
      .createHmac("sha256", process.env.OTP_SECRET)
      .update(otp.toString())
      .digest("hex");
    await sentOTP(email, otp);
    const token = jwt.sign(
      {
        otp: otpHash,
      },
      process.env.JWT_SECRET
    );
    return res
      .cookie("tempToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 10,
        sameSite: "none",
      })
      .json({ err: false, tempToken: token });
  } catch (error) {
    res.json({ error: error, err: true, message: "Something bad happend!" });
  }
}

export async function signUpVerify(req, res) {
  try {
    const { name, email, password, phone, otp } = req.body;
    const temptoken = req.cookies.tempToken;
    if (!temptoken)
      return res.json({ err: true, message: "OTP Session failed" });
    const verifiedTemptoken = jwt.verify(temptoken, process.env.JWT_SECRET);
    let otpHash = crypto
      .createHmac("sha256", process.env.OTP_SECRET)
      .update(otp.toString())
      .digest("hex");
    if (otpHash !== verifiedTemptoken.otp)
      return res.json({ err: true, message: "Incorrect OTP" });
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      "myjwtsecretkey"
    );
    return res
      .cookie("userToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ err: false });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error, err: true, message: "Something bad happend!" });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ err: true, message: "User Not Found" });
    if (user.block)
      return res.json({ err: true, message: "Sorry,You are Blocked" });
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid)
      return res.json({ err: true, message: "Email or Password is Wrong" });
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    return res
      .cookie("userToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ error: false });
  } catch (error) {
    res.json({ error: error, err: true, message: "Something bad happend!" });
  }
}

export const checkUserLoggedIn = async (req, res) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.json({
        loggedIn: false,
        error: true,
        message: "No User Token",
      });
    }
    const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(verifiedJWT.id, { password: 0 });
    if (!user) {
      return res.json({ loggedIn: false });
    }
    return res.json({ user, loggedIn: true });
  } catch (error) {
    res.json({ error: error, err: true, message: "Something bad happened!" });
  }
};

export async function userLogout(req, res) {
  res
    .cookie("userToken", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .json({ message: "logged out", error: false });
}
