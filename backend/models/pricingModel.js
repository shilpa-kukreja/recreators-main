import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true }, 
    afterText: { type: String, default: "" },
    text: { type: String, required: true },
    list: { type: [String], required: true }, 
  },
  { timestamps: true }
);

const pricingModel = mongoose.models.Pricing || mongoose.model("Pricing", pricingSchema);

export default pricingModel;
