
import portfolioModel from "../models/portfolioModel.js";
import fs from "fs";
import path from "path";

// Add Portfolio
export const addPortfolio = async (req, res) => {
  try {
    const portfolioData = { ...req.body };

    if (req.file) {
      portfolioData.portfolioImg = `/uploads/portfolio/${req.file.filename}`;
    }

    const portfolio = await portfolioModel.create(portfolioData);
    res.status(201).json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Portfolios
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await portfolioModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: portfolios });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Portfolio By ID
export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }
    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Portfolio
export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    if (req.file) {
      // Delete old image if exists
      if (portfolio.portfolioImg) {
        const oldPath = path.join(process.cwd(), "public", portfolio.portfolioImg);
        fs.unlink(oldPath, (err) => {
          if (err) console.log("Failed to delete old image:", err);
        });
      }
      req.body.portfolioImg = `/uploads/portfolio/${req.file.filename}`;
    }

    const updatedPortfolio = await portfolioModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedPortfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Portfolio
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    // Delete image if exists
    if (portfolio.portfolioImg) {
      const imgPath = path.join(process.cwd(), "public", portfolio.portfolioImg);
      fs.unlink(imgPath, (err) => {
        if (err) console.log("Failed to delete image:", err);
      });
    }

    await portfolioModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
