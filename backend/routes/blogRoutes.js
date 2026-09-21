import express from "express";

import { createBlog, deleteBlog, getBlogById,    getBlogs, getBlogss, updateBlog } from "../controllers/blogController.js";
import upload from "../middleware/blogMulter.js";



const blogRouter = express.Router();

blogRouter.get("/getblog", getBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.get("/getblog", getBlogss);

blogRouter.post("/createblog", upload.single("blogImg"), createBlog); 
blogRouter.put("/:id", upload.single("blogImg"), updateBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
