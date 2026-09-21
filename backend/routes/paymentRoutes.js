import express from "express";
import { generateOrder, getAllPayments, verifyPayment } from "../controllers/paymentController.js";




const paymentRoutes = express.Router();

paymentRoutes.post("/order", generateOrder );
paymentRoutes.post("/verify", verifyPayment);
paymentRoutes.get("/get", getAllPayments)

export default paymentRoutes;
