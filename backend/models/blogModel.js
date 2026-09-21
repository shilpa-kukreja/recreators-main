import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
     blogImg: { type: String, required: true },
     blogName: { type: String, required: true },
     blogSlug: { type: String, required: true, unique: true },
     blogDate: { type: String, required: true },
     blogDetail: { type: String, required: true },
     blogCategory: { type: String, required: true },
     blogTags: { type: String, required: true },
     metatitle: { type: String, default: '' },
     metadescription: { type: String, default: '' },
     metatag:  { type: String, default: '' },
     status: { type: String, default: 'draft' },
     createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now }
}, { timestamps: true })
const blogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);
export default blogModel;



