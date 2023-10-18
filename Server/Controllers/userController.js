import UserModel from "../Models/userModel.js";
import ServiceCenterModel from "../Models/serviceCenterModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sentOTP from "../helpers/sentOtp.js";
import crypto from "crypto";
import axios from "axios";
import twilio from "twilio";
import ScheduleModel from "../Models/scheduleModel.js";
import BookingModel from "../Models/bookingModel.js";
import reviewModel from "../Models/reviewModel.js";
import cloudinary from "../config/cloudinary.js";

var salt = bcrypt.genSaltSync(10);
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const serviceId = process.env.TWILIO_SERVICE_SID;
const client = twilio(accountSid, authToken);

export async function userSignup(req, res) {
  try {
    const { phone, email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user)
      return res.json({ err: true, message: "User already registered!" });
    const otpResponse = await client.verify.v2
      .services(serviceId)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      });
    res.json({ err: false, message: "Success" });
  } catch (error) {
    res.json({ error: error, err: true, message: "Something bad happend!" });
  }
}

export async function signUpVerify(req, res) {
  try {
    const { name, email, password, phone, otp } = req.body;
    const isVerified = await client.verify.v2
      .services(serviceId)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      })
      .then(async (verificationResponse) => {
        if (verificationResponse.status === "approved") {
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
            process.env.JWT_SECRET
          );
          return res
            .cookie("userToken", token, {
              httpOnly: true,
              secure: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
              sameSite: "none",
            })
            .json({ err: false });
        } else {
          res.json({ err: true, message: "Invalid OTP" });
        }
      });
  } catch (error) {
    res.json({ error: error, err: true, message: "Something bad happend!" });
  }
}

export async function resendOtp(req, res) {
  try {
    const { phone } = req.body;
    const otpResponse = await client.verify.v2
      .services(serviceId)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      });
    res.json({ err: true, message: "Success" });
  } catch (error) {
    res.json({ error: error, err: true, message: "Something bad happend!" });
  }
}

export async function googleAuth(req, res) {
  try {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = process.env.SERVER_URL + "/user/auth/google/callback";
    const { code } = req.query;
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );
    const { access_token } = tokenResponse.data;
    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    const user = {
      email: userInfo.data.email,
      name: userInfo.data.name,
    };
    await UserModel.findOneAndUpdate(
      { email: user.email },
      { $set: { picture: user.picture, name: user.name } },
      { upsert: true }
    );
    let newUser = await UserModel.findOne({ email: user.email });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.redirect(`${process.env.CLIENT_URL}/callback?token=${token}`);
  } catch (error) {
    console.error("Google authentication error:", error.message);
    res.json({ err: true, error, message: "Google Authentication failed" });
  }
}

export async function verifyGAuth(req, res) {
  try {
    const token = req.query.token;
    if (!token) {
      return res.json({ loggedIn: false, err: true, message: "no token" });
    }
    const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedJWT) {
      return res.json({ loggedIn: false, err: true, message: "no token" });
    }
    const user = await UserModel.findById(verifiedJWT.id, { password: 0 });
    if (!user) {
      return res.json({ loggedIn: false, err: true, message: "no user found" });
    }
    if (user.block) {
      return res.json({ loggedIn: false, err: true, message: "user blocked" });
    }

    return res
      .cookie("userToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
        sameSite: "none",
      })
      .json({ error: false, user: user._id, token });
  } catch (error) {
    console.log("Google authentication failed:", error);
    res.json({ err: true, error, message: "Google Authentication failed" });
  }
}

export async function demoLogin(req, res) {
  try {
    const email = process.env.DEMOEMAIL;
    const user = await UserModel.findOne({ email });
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
      return res.json({ error: true, message: "No User Found" });
    }
    let otp = Math.ceil(Math.random() * 1000000);
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

export async function getMapList(req, res) {
  try {
    const centers = await ServiceCenterModel.find().lean();
    if (!centers) {
      return res.json({ err: true, message: "No Center Found" });
    }
    res.json({ err: false, centers });
  } catch (error) {
    res.json({ error: error, err: true, message: "Something went wrong" });
  }
}

export async function chooseServiceCenter(req, res) {
  try {
    const reviews = await reviewModel.find().lean();
    const page = parseInt(req.query.page) || 1;
    const name = req.query.name || "";
    let categories = req.query.category || [];
    let brand = req.query.brand || [];

    // Convert "All" to an empty array to handle filtering
    if (categories.includes("All")) {
      categories = [];
    }
    if (brand.includes("All")) {
      brand = [];
    }

    // Build the query object for filtering
    const centerQuery = {
      permission: true,
      $or: [
        {
          name: new RegExp(name, "i"),
        },
        {
          district: new RegExp(name, "i"),
        },
        {
          location: new RegExp(name, "i"),
        },
      ],
    };

    if (categories.length > 0) {
      centerQuery["categories"] = { $in: categories };
    }
    if (brand.length > 0) {
      centerQuery["brands"] = { $in: brand };
    }

    // Calculate skip and limit for pagination
    const itemsPerPage = 6;
    const skip = (page - 1) * itemsPerPage;

    // Query the database with filtering and pagination
    const [centers, count] = await Promise.all([
      ServiceCenterModel.find(centerQuery)
        .populate("reviews")
        .skip(skip)
        .limit(itemsPerPage)
        .lean(),
      ServiceCenterModel.find(centerQuery).countDocuments(),
    ]);

    const totalPage = Math.ceil(count / itemsPerPage);
    res.json({ center: centers, err: false, totalPage });
  } catch (error) {
    res.json({ err: true, message: "Server Error" });
  }
}

export async function getServiceCenter(req, res) {
  try {
    const { id } = req.body;
    const center = await ServiceCenterModel.findById(id);
    const reviews = await reviewModel.find({ centerId: id }).populate("userId");
    res.json({ err: false, center, reviews });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}
export async function getServiceCenterSchedule(req, res) {
  try {
    const { id } = req.params;
    const schedule = await ScheduleModel.findOne({ serviceCenterId: id });
    res.json({ err: false, schedule });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function getUserBookings(req, res) {
  try {
    const bookings = await BookingModel.find({ userId: req.user._id });
    res.json({ err: false, bookings });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function addReview(req, res) {
  try {
    const { description, rating, centerId } = req.body;
    const review = await reviewModel.create({
      description: description,
      rating: rating,
      centerId: centerId,
      userId: req.user._id,
    });
    await review.save();
    res.json({ err: false, message: "Review Added Successfully!" });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}

export async function profileUpdate(req, res) {
  try {
    const { name, phone, logo } = req.body;
    if (logo) {
      const logoUpld = await cloudinary.uploader.upload(logo, {
        folder: "AutoPro",
      });
      await UserModel.findByIdAndUpdate(req.user._id, {
        $set: {
          profile: logoUpld.url,
          name,
          phone,
        },
      });
    } else {
      await UserModel.findByIdAndUpdate(req.user._id, {
        $set: {
          name,
          phone,
        },
      });
    }
    res.json({ err: false });
  } catch (error) {
    res.json({ err: true, message: "Something Went Wrong" });
  }
}
