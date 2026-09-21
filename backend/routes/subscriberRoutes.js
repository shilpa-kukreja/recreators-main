import express from "express";
import { addsubscriber, getsubscribers, removeSubscribers } from "../controllers/subscribeController.js";



const subscriberRoutes = express.Router();


subscriberRoutes.post("/addsubscriber", addsubscriber);
subscriberRoutes.get("/getsubscriber",  getsubscribers);
subscriberRoutes.delete("/removeSubscriber/:id", removeSubscribers);


export default subscriberRoutes ;