import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  amount: { type: Number, required: true },
  coupon: { type: String },
  method: { type: String, required: true },
  razorpay_order_id: String,
  razorpay_payment_id: String,
}, { timestamps: true });

const paymentModel = mongoose.models.payment || mongoose.model("payment", PaymentSchema);
export default paymentModel;
