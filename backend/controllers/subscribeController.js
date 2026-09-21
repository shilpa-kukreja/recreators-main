import express from "express";
import subscribeModel from "../models/subscribeModel.js";




export const addsubscriber = async (req , res)=>{
    try {
    const {email} = req.body ;
   if(!email){
    return res.status(400).json({message : "Email is required"})
   }
   const subscriber = await subscribeModel.findOne({email});
   if(subscriber){
    return res.status(400).json({message : "Email already exists"})
   }
   const newSubscriber = new subscribeModel({email});
   await newSubscriber.save();
   res.status(201).json({message : "Subscribed successfully"})
}catch (error) {
       console.error(error);
       res.status(500).json({message : "Server error"})
}
}





export const getsubscribers = async (req , res)=>{
    try {
         const subscribers = await subscribeModel.find().sort({createdAt : -1});
         res.status(200).json(subscribers);
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        res.status(500).json({message : "Subscriber not found"})
    }
}




export const removeSubscribers  = async (req , res)=>{
    try {
        const {id} = req.params;
        await subscribeModel.findByIdAndDelete(id);
        res.status(200).json({message : "Subscriber deleted successfully"})
    } catch (error) {
        console.error("Error deleting subscriber:", error);
        res.status(500).json({message : "Subscriber not found"})
    }
}


