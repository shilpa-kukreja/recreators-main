import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import paymentModel from "../models/paymentModel.js";




// Razorpay instance


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,   // from .env
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// router.post("/order",

// Generate order
export const generateOrder = async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: "rcpt_" + Math.random().toString(36).substr(2, 9),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// router.post("/verify",
// Verify & store payment
export const verifyPayment = async (req, res) => {
  try {
    console.log("Verify body:", req.body); // 🔍 debug

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, form } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, msg: "Payment verification failed" });
    }

    const payment = new paymentModel({
      name: form?.name,
      email: form?.email,
      phone: form?.phone,
      service: form?.service,
      amount: form?.amount,
      coupon: form?.coupon,
      method: form?.paymentMethod,
      razorpay_order_id,
      razorpay_payment_id,
    });

    await payment.save();
    res.json({ success: true, msg: "Payment verified & stored" });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentModel.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



