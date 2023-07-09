import AdminModel from "../Models/adminModel.js";
import serviceCenterModel from "../Models/serviceCenterModel.js";
import bcrypt from "bcryptjs";
import sentMail from "../helpers/sentMail.js";
import jwt from "jsonwebtoken";

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.json({
        err: true,
        message: "You have No Access To This Page",
      });
    }
    const verifiedAdmin = bcrypt.compareSync(password, admin.password);
    if (!verifiedAdmin) {
      return res.json({ err: true, message: "Email Or Password Is Wrong" });
    }
    const token = jwt.sign(
      {
        admin: true,
        id: admin._id,
      },
      process.env.JWT_SECRET
    );
    return res
      .cookie("adminToken", token, {
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

export async function adminCheckLogin(req, res) {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.json({ err: true, message: "No Token Found" });
    }
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminModel.findById(tokenVerify.id, { password: 0 });
    if (!admin) {
      return res.json({ loggedIn: false });
    }
    return res.json({ loggedIn: true });
  } catch (error) {
    res.json({ error: error, message: "Something went wrong" });
  }
}

export async function adminLogout(req, res) {
  try {
    res
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .json({ err: false, message: "Logged Out " });
  } catch (error) {
    res.json({ error: error, message: "Something went wrong" });
  }
}

export async function requests(req, res) {
  try {
    const centerRequests = await serviceCenterModel
      .find({ permission: false })
      .lean();
    const count = Object.keys(centerRequests).length;
    if (!centerRequests) {
      return res.json({ message: "No New Requests", err: false });
    }
    return res.json({ centerRequests, count, err: false });
  } catch (error) {
    res.json({ error: error, err: true, message: "Something went Wrong" });
  }
}

export async function acceptRequest(req, res) {
  try {
    const { email } = req.body;
    await serviceCenterModel.updateOne({ email }, { permission: true });
    res.json({ err: false, message: "Permission Added Successfully" });
    await sentMail(email, "Your Request For Center Registration Has Accepted");
  } catch (err) {
    res.json({ message: "Something Went Wrong", error: err, err: true });
  }
}
