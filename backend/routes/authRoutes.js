import express from "express";
import { adminLogin } from "../controllers/authController.js";


const authRoutes = express.Router();

authRoutes.post("/admin-login", adminLogin);

export default authRoutes;