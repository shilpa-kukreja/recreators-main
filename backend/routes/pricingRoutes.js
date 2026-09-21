import express from "express";
import { createPricing, deletePricing, getPricing, getPricingById, updatePricing } from "../controllers/pricingController.js";


const  pricingRoutes = express.Router();


pricingRoutes.post("/addprice", createPricing);       
pricingRoutes.get("/getprice", getPricing);           
pricingRoutes.get("/getpriceid/:id", getPricingById);   
pricingRoutes.put("/updateprice/:id", updatePricing);    
pricingRoutes.delete("/remove/:id", deletePricing);  

export default pricingRoutes;
