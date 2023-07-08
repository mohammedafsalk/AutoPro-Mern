import ServiceCenterModel from "../Models/serviceCenterModel.js";
import cloudinary from "../config/cloudinary.js";
import sentOTP from '../helpers/sentOtp.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);

export async function serviceCenterSignup(req, res) {
  try {
    const { name, email, password, location, district } = req.body;
    const temp = await ServiceCenterModel.findOne({ email });
    if (temp) {
      return res.json({ err: true, message: "Center Already Registered" });
    }
    const proof = await cloudinary.uploader.upload(req.body.proof, {
      folder: "AutoPro",
    });
    const logo = await cloudinary.uploader.upload(req.body.logo, {
      folder: "AutoPro",
    });
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newCenter = new ServiceCenterModel({
      name,
      email,
      password: hashedPassword,
      location,
      district,
      proof,
      logo,
    });
    await newCenter.save();
    const token = jwt.sign(
      {
        id: newCenter._id,
      },
      process.env.JWT_SECRET
    );
    return res
      .cookie("serviceCenterToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ err: false });
  } catch (error) {
    res.json({ error: error, message: "Something went wrong" });
  }
}

export async function serviceCenterLogin(req, res) {
  try {
    const { email, password } = req.body;
    const center = await ServiceCenterModel.findOne({ email });
    if (!center) {
      return res.json({ err: true, message: "No Service Center Found" });
    }
    if (!center.permission) {
      return res.json({
        err: true,
        message: "Your Permission Is Not Approved,Try After Sometime",
      });
    }
    const centerValid = bcrypt.compareSync(password, center.password);
    if (!centerValid) {
      return res.json({ err: true, message: "Email Or Password Is Wrong" });
    }
    const token = jwt.sign(
      {
        id: center._id,
      },
      process.env.JWT_SECRET
    );

    return res
      .cookie("serviceCenterToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ err: false });
  } catch (error) {
    res.json({ error: error, message: "Something went wrong" });
  }
}

export async function loginVerify(req, res) {
  try {
    const token = req.cookies.serviceCenterToken;
    if (!token) {
      return res.json({
        err: true,
        message: "No Token Found",
        loggedIn: false,
      });
    }
    const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET);
    const serviceCenter = await ServiceCenterModel.findById(verifiedJWT.id, {
      password: 0,
    });
    if (!serviceCenter) {
      return res.json({ loggedIn: false });
    }
    return res.json({ serviceCenter, loggedIn: true });
  } catch (error) {
    res.json({ error: error, message: "Something went wrong" });
  }
}

export async function forgotOtp(req, res) {
  try {
    const { email } = req.body;
    const center = await ServiceCenterModel.findOne({ email: email }).lean();
    if (!center) {
      return res.json({ error: true, message: "No Center Found" });
    }
    let otp = Math.ceil(Math.random() * 1000000);
    await sentOTP(email, otp);
    let otpHash = crypto
      .createHmac("sha256", process.env.OTP_SECRET)
      .update(otp.toString())
      .digest("hex");
    console.log(otp);
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

export async function centerPassReset(req, res) {
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

export async function serviceCenterLogout(req, res) {
  res
    .cookie("serviceCenterToken", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .json({ message: "Logged Out", error: false });
}
