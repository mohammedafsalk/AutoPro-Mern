import Razorpay from "razorpay";
import crypto from "crypto";
import BookingModel from "../Models/bookingModel.js";
import dayjs from "dayjs";
import { json } from "express";

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
    res.json({ err: true, message: "Server error", error });
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
      deliveryCharge,
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
        amountPaid: deliveryCharge,
        deliverchargePaymentId: response,
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
    console.log(booking);
    if (!booking) {
      return res.json({ err: true, message: "Booking Not Found" });
    }
    const price = booking.invoice.reduce((sum, item) => sum + item.price, 0);
    const updatedAmountPaid = parseInt(booking.amountPaid) + parseInt(price);
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
          amountPaid: updatedAmountPaid,
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

export async function cancelPayment(req, res) {
  try {
    const { id } = req.body;
    const booking = await BookingModel.findById(id);
    const paymentId = booking.deliverchargePaymentId.razorpay_payment_id;
    const amount = booking.deliveryCharge;
    const receiptNumber = Math.random().toString(36).substring(7);

    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    let status = await instance.payments.refund(paymentId, {
      amount: amount,
      speed: "optimum",
      receipt: receiptNumber,
    });
    if (status.status === "processed") {
      await BookingModel.findByIdAndUpdate(id, {
        $set: { status: "Cancelled", amountPaid: 0 },
      });
      return res.json({
        err: false,
        message: "Your booking has cancelled.Your Amount will be refunded!",
      });
    } else {
      return res.json({ err: false, message: "Server error,try again later" });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ error, err: true, message: "Something went wrong" });
  }
}
