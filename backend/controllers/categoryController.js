import categoryModel from "../models/categoryModel.js";





export const addcategory = async (req, res) => {
    try {
        const { name, description, slug, metatitle, metadescription } = req.body;
        const categoryname = await categoryModel.findOne({ name })
        if (categoryname) {
            return res.status(400).json({ message: "Category already exists" })
        }
        if (!name) {
            return res.status(400).json({ message: "Name is required" })
        }
        console.log(req.body);
        console.log(req.file);
        
        const image = req.file?.filename;

        if (!image) {
            return res.status(400).json({ message: "Image is required" })
        }
        const category = await categoryModel.create({
            name,
            slug,
            description,
            image: `/uploads/categories/${image}`,
            metatitle,
            metadescription
        });
        console.log(category);
        res.status(201).json({ message: "Category added successfully" , category})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }
}




export const getcategories = async (req, res) => {
    try {
        const categories = await categoryModel.find().sort({ createdAt: -1 });
        console.log(categories);
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }
}


export const getCategoryByid = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    console.log(category);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json(category); // direct category bhej do
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching category", error: error.message });
  }
};


export const removeCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }
}



export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.files?.image) {
            updateData.image = `/uploads/categories/${req.files.image[0].filename}`;
        }


        const updatedCategory = await categoryModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating category", error: error.message });
    }
};
