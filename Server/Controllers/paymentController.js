import Razorpay from "razorpay";
import crypto from "crypto";
import BookingModel from "../Models/bookingModel.js";
import dayjs from "dayjs";

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function paymentOrder(req, res) {
  try {
    const { amount } = req.body;
    var options = {
      amount: amount * 100,
      currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        console.log(err);
        res.json({ err: true, message: "server error" });
      } else {
        res.json({ err: false, order });
      }
    });
  } catch (error) {
    res.json({ err: true, message: "server error", error });
  }
}

export async function verifyPayment(req, res) {
  try {
    const {
      response,
      name,
      email,
      mobile,
      vehicleNumber,
      vehicleName,
      brand,
      date,
      place,
      address,
      centerId,
      userId,
    } = req.body;
    let item = await BookingModel.findOne({
      vehicleNumber: vehicleNumber,
      status: { $ne: "Delivered" },
    });
    if (item) {
      return res.json({ err: true, message: "This Vehicle Is Already Booked" });
    }
    let formattedDate = dayjs(date).format("DD-MM-YYYY");
    let body = response.razorpay_order_id + "|" + response.razorpay_payment_id;

    var expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === response.razorpay_signature) {
      const booking = await BookingModel.create({
        name,
        email,
        mobile,
        vehicleNumber,
        vehicleName,
        brand,
        date: formattedDate,
        place,
        address,
        centerId,
        userId,
      });
      return res.json({
        err: false,
        booking,
      });
    } else {
      return res.json({
        err: true,
        message: "payment verification failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error, err: true, message: "Something went wrong" });
  }
}

export async function verifyBillPayment(req, res) {
  try {
    const { response, bookingId } = req.body;
    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      return res.json({ err: true, message: "Booking Not Found" });
    }
    let body = response.razorpay_order_id + "|" + response.razorpay_payment_id;
    var expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === response.razorpay_signature) {
      await BookingModel.findByIdAndUpdate(bookingId, {
        $set: {
          billPayment: response,
          status: "Paid",
        },
      });
      return res.json({
        err: false,
      });
    } else {
      return res.json({
        err: true,
        message: "payment verification failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error, err: true, message: "Something went wrong" });
  }
}
