import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientRole: { type: String, default: "" },
  reviewText: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  clientImg: { type: String, default: "" },
});

const portfolioSchema = new mongoose.Schema(
  {
    portfolioImgs: { type: [String], default: [] },
    portfolioImg: { type: String, default: "" },

    portfolioName: { type: String, required: true },
    portfolioDate: { type: String, required: true },
    portfolioDetail: { type: String, required: true },
    portfolioLink: { type: String, required: true },
    portfolioTags: { type: String, required: true },
    metatitle: { type: String, default: "" },
    metadescription: { type: String, default: "" },
    metatag: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    status: { type: String, default: "draft" },

    // 🔥 THE MISSING FIELD
    reviews: { type: [reviewSchema], default: [] },
  },
  { timestamps: true }
);

// ✅ force fresh model on dev so schema changes take effect
if (mongoose.models.portfolio) {
  delete mongoose.models.portfolio;
}
const portfolioModel = mongoose.model("portfolio", portfolioSchema);

export default portfolioModel;