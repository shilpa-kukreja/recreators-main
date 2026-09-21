import mongoose from "mongoose";


const categorySchema =new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, default: ''},
    slug: {type: String, required: true},
    metatitle: {type: String, default: ''},
    metadescription: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
},{timestamps : true})
const categoryModel = mongoose.models.category || mongoose.model("category",  categorySchema) ;
export default categoryModel ;