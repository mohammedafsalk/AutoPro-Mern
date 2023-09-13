import ServiceCenterModel from "../Models/serviceCenterModel.js";
import BookingModel from "../Models/bookingModel.js";
import cloudinary from "../config/cloudinary.js";
import sentOTP from "../helpers/sentOtp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import workerModel from "../Models/workerModel.js";
import ScheduleModel from "../Models/scheduleModel.js";
import WithdrawModel from "../Models/withdrawModel.js";

var salt = bcrypt.genSaltSync(10);

export async function serviceCenterSignup(req, res) {
  try {
    const { name, email, password, location, latitude, longitude, mobile } =
      req.body;
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
      latitude,
      longitude,
      mobile,
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
    const center = await ServiceCenterModel.findOne({ email }).lean();
    if (!center) {
      return res.json({ err: true, message: "No Service Center Found" });
    }
    const centerValid = bcrypt.compareSync(password, center.password);
    centerValid;
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
    console.log(error.message);
    res.json({ err: true, message: "Something went wrong" });
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
    res.json({ err: true, message: "Something went wrong" });
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
    res.json({ error: error, err: true, message: "Something went wrong" });
  }
}

export async function centerPassReset(req, res) {
  try {
    const { email, password } = req.body;
    const center = await ServiceCenterModel.findOne({ email: email });
    if (!center) {
      return res.json({ error: true, message: "No Center Found" });
    }
    let hashedPassword = bcrypt.hashSync(password, salt);
    await ServiceCenterModel.updateOne(
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

export async function proofUpdate(req, res) {
  try {
    const { email, image } = req.body;
    const center = await ServiceCenterModel.findOne({ email: email });
    if (!center) {
      return res.json({ error: true, message: "No Center Found" });
    }
    const data = await cloudinary.uploader.upload(image, {
      folder: "AutoPro",
    });
    await ServiceCenterModel.findOneAndUpdate(
      { email },
      { $set: { proof: data, rejectMessage: "", rejected: false } }
    );
    res.json({ err: false });
  } catch (error) {
    res.json({ err: true, error: error.message });
  }
}

export async function getWorkers(req, res) {
  try {
    const serviceCenterId = req.serviceCenter._id;
    const center = await ServiceCenterModel.findById(serviceCenterId);
    if (!center) {
      return res.json({ error: true, message: "No Center Found" });
    }
    const workers = await workerModel.find(
      { centerId: serviceCenterId },
      { password: 0 }
    );
    res.json({ err: false, workers });
  } catch (error) {
    res.json({ err: true, message: "Something went wrong" });
  }
}

export async function addWorker(req, res) {
  try {
    const { password } = req.body;
    let hashedPassword = bcrypt.hashSync(password, salt);
    const worker = await workerModel.create({
      ...req.body,
      password: hashedPassword,
      centerId: req.serviceCenter._id,
    });
    res.json({ err: false });
  } catch (error) {
    res.json({ err: true, message: "Something went wrong" });
  }
}

export async function workerAccessSetting(req, res) {
  try {
    const { type, id } = req.body;
    const worker = await workerModel.findById(id);
    if (type === "block") {
      worker.active = false;
      await worker.save();
      return res.json({ err: false, blocked: true, message: "Worker Blocked" });
    } else {
      worker.active = true;
      await worker.save();
      return res.json({
        err: false,
        blocked: false,
        message: "Worker Unblocked",
      });
    }
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function setSchedule(req, res) {
  try {
    const schedule = await ScheduleModel.updateOne(
      { serviceCenterId: req.serviceCenter._id },
      {
        $set: {
          ...req.body.schedule,
          serviceCenterId: req.serviceCenter._id,
        },
      },
      { upsert: true }
    );
    res.json({ err: false });
  } catch (err) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function getSchedule(req, res) {
  try {
    const schedule = await ScheduleModel.findOne({
      serviceCenterId: req.serviceCenter._id,
    });
    res.json({ err: false, schedule });
  } catch (err) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function getBookings(req, res) {
  try {
    const bookings = await BookingModel.find({
      centerId: req.serviceCenter._id,
    }).populate("workerId");
    res.json({ err: false, bookings });
  } catch (err) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function assignWork(req, res) {
  try {
    const { bookingId, id } = req.body;
    await BookingModel.findByIdAndUpdate(bookingId, {
      $set: {
        workerId: id,
      },
    });
    res.json({ err: false });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function updateInvoice(req, res) {
  try {
    const { invoice, bookingId } = req.body;
    await BookingModel.findByIdAndUpdate(bookingId, {
      $set: {
        invoice,
      },
    });
    return res.json({ err: false });
  } catch (err) {
    console.log(err);
    res.json({ err: true, message: "server error" });
  }
}

export async function centerDashboard(req, res) {
  try {
    let bookingCount = await BookingModel.find({
      centerId: req.serviceCenter._id,
    }).countDocuments();
    const monthlyDataArray = await BookingModel.aggregate([
      {
        $addFields: {
          parsedDate: {
            $dateFromString: {
              dateString: "$date",
              format: "%d-%m-%Y",
            },
          },
        },
      },
      {
        $match: {
          centerId: req.serviceCenter._id,
        },
      },
      {
        $group: {
          _id: { $month: "$parsedDate" },
          totalRevenue: { $sum: "$amountPaid" },
        },
      },
    ]);
    let monthlyDataObject = {};
    let totalRevenue = 0;
    monthlyDataArray.map((item) => {
      totalRevenue += item.totalRevenue;
      monthlyDataObject[item._id] = item.totalRevenue;
    });
    let monthlyData = [];
    for (let i = 1; i <= 12; i++) {
      monthlyData[i - 1] = monthlyDataObject[i] ?? 0;
    }
    res.json({ err: false, bookingCount, totalRevenue, monthlyData });
  } catch (err) {
    res.json({ err: true, message: "server error" });
  }
}

export async function withdrawWallet(req, res) {
  const { ifsc, accno, branch } = req.body;
  await WithdrawModel.create({
    ifsc: ifsc,
    accountNo: accno,
    branch: branch,
    centerId: req.serviceCenter._id,
  });
  return res.json({ err: false });
}

export async function profileUpdate(req, res) {
  try {
    const { name, mobile, logo } = req.body;
    console.log(req.body);
    if (logo) {
      const logoUpld = await cloudinary.uploader.upload(logo, {
        folder: "AutoPro",
      });
      await ServiceCenterModel.findByIdAndUpdate(req.serviceCenter._id, {
        $set: {
          logo: logoUpld,
          name,
          mobile,
        },
      });
    } else {
      await ServiceCenterModel.findByIdAndUpdate(req.serviceCenter._id, {
        $set: {
          name,
          mobile,
        },
      });
    }
    res.json({ err: false });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function getPriceRange(req, res) {
  try {
    const center = await ServiceCenterModel.findOne({
      _id: req.serviceCenter._id,
    });
    let ranges = center.pickUpPrice;
    res.json({ err: false, ranges });
  } catch (err) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function setPriceRange(req, res) {
  try {
    const { pickUpPrice } = req.body;
    console.log(pickUpPrice);
    await ServiceCenterModel.findByIdAndUpdate(req.serviceCenter._id, {
      $set: {
        pickUpPrice,
      },
    });
    return res.json({
      err: false,
      message: "Price Range Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({ err: true, message: "Server Error" });
  }
}

export async function manageCategories(req, res) {
  try {
    const { values } = req.body;
    await ServiceCenterModel.findByIdAndUpdate(req.serviceCenter._id, {
      $set: {
        categories: values,
      },
    });
    res.json({ err: false, message: "Category Updated!" });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}
export async function manageBrands(req, res) {
  try {
    const { values } = req.body;
    await ServiceCenterModel.findByIdAndUpdate(req.serviceCenter._id, {
      $set: {
        brands: values,
      },
    });
    res.json({ err: false, message: "Brands Updated!" });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}
