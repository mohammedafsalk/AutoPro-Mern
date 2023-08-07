import jwt from "jsonwebtoken";
import workerModel from "../Models/workerModel.js";

const verifyWorker = async (req, res, next) => {
  try {
    const token = req.cookies.workerToken;
    if (!token) {
      return res.json({
        err: true,
        loggedIn: false,
        message: "Token Not Found",
      });
    }
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
    req.worker = worker;
    next();
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
};

export default verifyWorker;
