import mongoose from "mongoose";


const portfolioSchema = new mongoose.Schema({
    portfolioImg: { type: String, required: true },
    portfolioName: { type: String, required: true },
    portfolioDate: { type: String, required: true },
    portfolioDetail: { type: String, required: true },
    portfolioLink: { type: String, required: true },
    portfolioTags: { type: String, required: true },
    metatitle: { type: String, default: '' },
    metadescription: { type: String, default: '' },
    metatag:  { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true })
const portfolioModel = mongoose.models.portfolio || mongoose.model("portfolio", portfolioSchema);
export default portfolioModel;