import express from "express";
import { createCareer, getCarrerById, getCarrers, removeCarrer, updateCarrer } from "../controllers/carrerController.js";



const careerRoutes = express.Router();

careerRoutes.post("/careers", createCareer);
careerRoutes.get("/careers", getCarrers);
careerRoutes.get("/careers/:id", getCarrerById);
careerRoutes.delete("/careers/:id", removeCarrer);
careerRoutes.put("/careers/:id", updateCarrer);

export default careerRoutes;