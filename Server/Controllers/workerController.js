import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import workerModel from "../Models/workerModel.js";

var salt = bcrypt.genSaltSync(10);

export async function workerLogin(req, res) {
  try {
    const { email, password } = req.body;
    const worker = await workerModel.findOne({ email });
    if (!worker) return res.json({ err: true, message: "Account Not Found" });
    if (!worker.active)
      res.json({
        err: true,
        message: "You Are Blocked From Using This Account",
      });
    const validPassword = bcrypt.compareSync(password, worker.password);
    if (!validPassword)
      return res.json({ err: true, message: "Wrong Password" });
    const token = jwt.sign(
      {
        id: worker._id,
      },
      process.env.JWT_SECRET
    );
    return res
      .cookie("workerToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      })
      .json({ err: false });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function checkLogin(req, res) {
  try {
    const token = req.cookies.workerToken;
    if (!token)
      return res.json({
        loggedIn: false,
        err: true,
        message: "Token Not Found",
      });

    const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET);
    const worker = await workerModel.findOne(
      { _id: verifiedJWT.id, active: true },
      { password: 0 }
    );
    if (!worker) {
      return res.json({ loggedIn: false });
    }
    if (!worker.active) {
      return res.json({ loggedIn: false });
    }
    return res.json({ worker, loggedIn: true });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function workerLogut(req, res) {
  try {
    res
      .cookie("workerToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .json({ err: true, message: "Logged Out Succesfully" });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}
