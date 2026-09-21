import pricingModel from "../models/pricingModel.js";


// Create new pricing plan
export const createPricing = async (req, res) => {
  try {
    const pricing = await pricingModel.create(req.body);
    res.status(201).json({ success: true, data: pricing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all pricing plans
export const getPricing = async (req, res) => {
  try {
    const pricings = await pricingModel.find();
    res.json({ success: true, data: pricings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single pricing plan
export const getPricingById = async (req, res) => {
  try {
    const pricing = await pricingModel.findById(req.params.id);
    console.log(pricing);
    if (!pricing) return res.status(404).json({ success: false, message: "Pricing not found" });
    res.json({ success: true, data: pricing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update pricing plan
export const updatePricing = async (req, res) => {
  try {
    const pricing = await pricingModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pricing) return res.status(404).json({ success: false, message: "Pricing not found" });
    res.json({ success: true, data: pricing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete pricing plan
export const deletePricing = async (req, res) => {
  try {
    const pricing = await pricingModel.findByIdAndDelete(req.params.id);
    if (!pricing) return res.status(404).json({ success: false, message: "Pricing not found" });
    res.json({ success: true, message: "Pricing deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
