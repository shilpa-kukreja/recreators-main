import express from "express";
import {
  addPortfolio,
  deletePortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
} from "../controllers/portfolioController.js";
import upload from "../middleware/portfolioMulter.js";

const portfolioRoutes = express.Router();

// ✅ use .any() so we can accept portfolioImgs + dynamic review images
portfolioRoutes.post("/addportfolio", upload.any(), addPortfolio);
portfolioRoutes.get("/getportfolio", getAllPortfolios);
portfolioRoutes.get("/getportfolio/:id", getPortfolioById);
portfolioRoutes.put("/updateportfolio/:id", upload.any(), updatePortfolio);
portfolioRoutes.delete("/removeportfolio/:id", deletePortfolio);

export default portfolioRoutes;