import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique : true,
       match : [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ]
    },
    
},{timestamps : true})

const subscribeModel = mongoose.models.subscribe || mongoose.model("subscribe",  subscribeSchema) ;
export default subscribeModel ;