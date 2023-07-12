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
    console.log(otp);
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

export async function resendOtp(req, res) {
  const { email } = req.body;
  let otp = Math.ceil(Math.random() * 100000);
  console.log("resend",otp);
  let newOtpHash = crypto
    .createHmac("sha256", process.env.OTP_SECRET)
    .update(otp.toString())
    .digest("hex");
  await sentOTP(email, otp);
  const token = jwt.sign(
    {
      otp: newOtpHash,
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

export async function forgotOtp(req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email }).lean();
    if (!user) {
      return res.json({ error: true, message: "no user found" });
    }
    let otp = Math.ceil(Math.random() * 1000000);
    console.log(otp);
    await sentOTP(email, otp);
    let otpHash = crypto
      .createHmac("sha256", process.env.OTP_SECRET)
      .update(otp.toString())
      .digest("hex");
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
      .json({ err: false });
  } catch (error) {
    res.json({ err: true, error: error, message: "Something went wrong" });
  }
}

export async function verifyForgetOtp(req, res) {
  try {
    const { otp } = req.body;
    const tempToken = req.cookies.tempToken;

    if (!tempToken) {
      return res.json({ err: true, message: "OTP Session Timed Out" });
    }

    const verifiedTempToken = jwt.verify(tempToken, process.env.JWT_SECRET);
    let otpHash = crypto
      .createHmac("sha256", process.env.OTP_SECRET)
      .update(otp.toString())
      .digest("hex");
    if (otpHash != verifiedTempToken.otp) {
      return res.json({ err: true, message: "Invalid OTP" });
    }
    return res.json({ err: false });
  } catch (error) {
    console.log(error);
    res.json({ error: error, err: true, message: "Something went wrong" });
  }
}

export async function userPassReset(req, res) {
  try {
    const { email, password } = req.body;
    let hashedPassword = bcrypt.hashSync(password, salt);
    await UserModel.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    return res.json({ err: false });
  } catch (error) {
    res.json({ error: error, err: true, message: "Something went wrong" });
  }
}
