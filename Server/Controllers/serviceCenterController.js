import ServiceCenterModel from "../Models/serviceCenterModel.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

var salt = bcrypt.genSaltSync(10);

export async function serviceCenterSignup(req, res) {
  try {
    const { name, email, password, location, district } = req.body;
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
      return res.json({ err: true, message: "no servie center found" });
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
