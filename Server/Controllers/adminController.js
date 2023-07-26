import AdminModel from "../Models/adminModel.js";
import serviceCenterModel from "../Models/serviceCenterModel.js";
import UserModel from "../Models/userModel.js";
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

export async function adminDashboard(req, res) {
  try {
    let usersCount = await UserModel.countDocuments();
    let centerCount = await serviceCenterModel
      .find({ permission: true })
      .countDocuments();
    res.json({ usersCount, centerCount, err: false });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function requests(req, res) {
  try {
    const centerRequests = await serviceCenterModel
      .find({ permission: false })
      .lean();
    if (!centerRequests) {
      return res.json({ message: "No New Requests", err: false });
    }
    return res.json({ centerRequests, err: false });
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

export async function rejectRequest(req, res) {
  try {
    const { email, rejectionMsg } = req.body;
    await serviceCenterModel.findOneAndUpdate(
      { email },
      { $set: { rejected: true, rejectMessage: rejectionMsg } }
    );
    res.json({ err: false, message: "Rejection Message Sent" });
    await sentMail(
      email,
      "Your Request Is Not Accepted,Please Contact Admin For More Info"
    );
  } catch (err) {
    res.json({ message: "Something Went Wrong", error: err, err: true });
  }
}

export async function serviceCenters(req, res) {
  try {
    let centers = await serviceCenterModel.find({ permission: true }).lean();
    res.json({ err: false, centers });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function users(req, res) {
  try {
    let users = await UserModel.find().lean();
    res.json({ err: false, users });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    await UserModel.deleteOne({ _id: id });
    res.json({ err: false, message: "User Deleted" });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function userAccessSetting(req, res) {
  try {
    const { type, id } = req.body;
    const user = await UserModel.findById(id);

    if (type === "block") {
      user.block = true;
      await user.save();
      return res.json({ err: false, blocked: true, message: "User Blocked" });
    } else {
      user.block = false;
      await user.save();
      return res.json({
        err: false,
        blocked: false,
        message: "User Unblocked",
      });
    }
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}
