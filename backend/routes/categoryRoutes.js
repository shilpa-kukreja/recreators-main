import express from "express";
import { addcategory, getcategories, getCategoryByid, removeCategory, updateCategory } from "../controllers/categoryController.js";
import upload from "../middleware/categoryMiddleware.js";



const categoryRoutes = express.Router();

categoryRoutes.post("/addcategory",
  upload.single("image"), 
  addcategory
)

categoryRoutes.get("/getcategory",  getcategories);
categoryRoutes.get("/:id", getCategoryByid); 
categoryRoutes.delete("/removeCategory/:id",  removeCategory);
categoryRoutes.put("/updateCategory/:id",upload.single("image"),  updateCategory);


export default categoryRoutes ;