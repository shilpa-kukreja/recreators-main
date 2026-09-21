import express from "express";
import { contactMessage, getContactMessages, removeContactMessage } from "../controllers/contactController.js";


const contactRoutes = express.Router();

contactRoutes.post("/contact", contactMessage);
contactRoutes.get("/contacts", getContactMessages);
contactRoutes.delete("/contacts/:id", removeContactMessage);

export default contactRoutes;