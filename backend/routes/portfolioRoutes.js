import express from "express";
import { addPortfolio, deletePortfolio, getAllPortfolios, getPortfolioById, updatePortfolio } from "../controllers/portfolioController.js";
import upload from "../middleware/portfolioMulter.js";


const portfolioRoutes = express.Router();

// Routes
portfolioRoutes.post("/addportfolio", upload.single("portfolioImg"), addPortfolio);
portfolioRoutes.get("/getportfolio", getAllPortfolios);
portfolioRoutes.get("/getportfolio/:id", getPortfolioById);
portfolioRoutes.put("/updateportfolio/:id", upload.single("portfolioImg"), updatePortfolio);
portfolioRoutes.delete("/removeportfolio/:id", deletePortfolio);

export default portfolioRoutes;
