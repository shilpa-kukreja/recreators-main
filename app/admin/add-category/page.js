"use client";

import React, { useEffect, useState, Suspense } from "react";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FiArrowLeft,
  FiSave,
  FiEdit3,
  FiUpload,
  FiImage,
  FiType,
  FiLink,
  FiFileText,
  FiX,
} from "react-icons/fi";

const AddCategoryPageContent=()=> {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
    description: "",
    metatitle: "",
    metadescription: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [touched, setTouched] = useState({
    name: false,
    slug: false,
    image: false,
    description: false,
  });
  
  const [previewImages, setPreviewImages] = useState({
    image: null,
    banner: null,
  });
  
  const [imageUploading, setImageUploading] = useState({
    image: false,
    banner: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");

  // Fetch category if in edit mode
  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId) {
        try {
          setLoading(true);
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/${categoryId}`);
          
          const cat = res.data.category || res.data;

          if (cat) {
            setEditingCategory(cat);
            setFormData({
              name: cat.name || "",
              slug: cat.slug || "",
              description: cat.description || "",
              metatitle: cat.metatitle || "",
              metadescription: cat.metadescription || "",
              image: cat?.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${cat.image}` : "",
             
            });

            // Set preview images for existing images
            if (cat.image) {
              setPreviewImages(prev => ({
                ...prev,
                image: `${process.env.NEXT_PUBLIC_BACKEND_URL}${cat.image}`
              }));
            }
            
          
          } else {
            toast.error("Category not found");
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch category details");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCategory();
  }, [categoryId]);

  // Handle change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      setFormData((prev) => ({ ...prev, name: value, slug: generatedSlug }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle image upload with preview
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: file }));
    setPreviewImages((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
    setTouched({ ...touched, [field]: true });
  };

  // Remove image
  const removeImage = (field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
    setPreviewImages((prev) => ({ ...prev, [field]: null }));
    setTouched({ ...touched, [field]: true });
  };

  // Handle blur for validation
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  // Validate form
  const validateForm = () => {
    const errors = {
      name: !formData.name,
      slug: !formData.slug,
      image: !formData.image,
      description: !formData.description,
    };
    return !Object.values(errors).some(error => error);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      setLoading(true);
      
      if (editingCategory) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/updateCategory/${editingCategory._id}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Category updated successfully!");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/addcategory`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Category created successfully!");
      }
      
      router.push("/admin/list-categories");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isNameError = touched.name && !formData.name;
  const isSlugError = touched.slug && !formData.slug;
  const isImgError = touched.image && !formData.image;
  const isDescriptionError = touched.description && !formData.description;

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gray-50 !py-8">
        <div className="!max-w-7xl !mx-auto !px-2 sm:!px-4 lg:!px-4">
          {/* Header */}
          <div className="!mb-8">
            <div className="!flex !items-center !justify-between">
              <div className="!flex !items-center !space-x-4">
                <button
                  onClick={() => router.back()}
                  className="!flex !items-center !text-gray-600 hover:!text-gray-800 !transition-colors !p-2 !rounded-lg hover:!bg-white"
                >
                  <FiArrowLeft className="!w-5 !h-5 !mr-2" />
                  Back
                </button>
                <div>
                  <h1 className="!text-3xl !font-bold !text-gray-900">
                    {editingCategory ? "Edit Category" : "Create New Category"}
                  </h1>
                  <p className="!text-gray-600 !mt-1">
                    {editingCategory 
                      ? "Update your category information" 
                      : "Add a new category to your store"
                    }
                  </p>
                </div>
              </div>
              
              <div className="!flex !items-center !space-x-3">
                <span className={`!px-3 !py-1 !rounded-full !text-sm !font-medium ${
                  editingCategory 
                    ? "!bg-purple-100 !text-purple-800" 
                    : "!bg-blue-100 !text-blue-800"
                }`}>
                  {editingCategory ? "Edit Mode" : "Create Mode"}
                </span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="!bg-white !rounded-2xl !shadow-lg !overflow-hidden">
            {/* Form Header */}
            <div className="!px-8 !py-6 !bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="!flex !items-center !justify-between">
                <div className="!flex !items-center !space-x-3">
                  <div className="!p-2 !bg-white !bg-opacity-20 !rounded-lg">
                    {editingCategory ? (
                      <FiEdit3 className="!w-6 !h-6 !text-white" />
                    ) : (
                      <FiSave className="!w-6 !h-6 !text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="!text-xl !font-semibold !text-white">
                      Category Details
                    </h2>
                    <p className="!text-blue-100 !text-sm">
                      {editingCategory 
                        ? "Modify the category information below" 
                        : "Fill in the required information to create a new category"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="!p-8">
              <form onSubmit={handleSubmit} className="!space-y-8">
                {/* Basic Information Section */}
                <section>
                  <div className="!flex !items-center !space-x-2 !mb-6">
                    <div className="!w-1 !h-6 !bg-blue-600 !rounded-full"></div>
                    <h3 className="!text-lg !font-semibold !text-gray-900">Basic Information</h3>
                  </div>
                  
                  <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6">
                    {/* Category Name */}
                    <div>
                      <label className="!text-sm !font-medium !text-gray-700 !mb-2 !flex !items-center">
                        <FiFileText className="!w-4 !h-4 !mr-2 !text-gray-400" />
                        Category Name <span className="!text-red-500 !ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g., Electronics, Fashion"
                        className={`!w-full !px-4 !py-3 !border !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition-all !duration-200 ${
                          isNameError
                            ? "!border-red-500 focus:!ring-red-500"
                            : "!border-gray-300 hover:!border-gray-400"
                        }`}
                        disabled={loading}
                      />
                      {isNameError && (
                        <p className="!mt-2 !text-sm !text-red-600 !flex !items-center">
                          <FiX className="!w-4 !h-4 !mr-1" />
                          Category name is required
                        </p>
                      )}
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="!text-sm !font-medium !text-gray-700 !mb-2 !flex !items-center">
                        <FiLink className="!w-4 !h-4 !mr-2 !text-gray-400" />
                        URL Slug <span className="!text-red-500 !ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g., electronics, fashion"
                        className={`!w-full !px-4 !py-3 !border !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition-all !duration-200 ${
                          isSlugError
                            ? "!border-red-500 focus:!ring-red-500"
                            : "!border-gray-300 hover:!border-gray-400"
                        }`}
                        disabled={loading}
                      />
                      {isSlugError && (
                        <p className="!mt-2 !text-sm !text-red-600 !flex !items-center">
                          <FiX className="!w-4 !h-4 !mr-1" />
                          Slug is required
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Images Section */}
                <section>
                  <div className="!flex !items-center !space-x-2 !mb-6">
                    <div className="!w-1 !h-6 !bg-green-600 !rounded-full"></div>
                    <h3 className="!text-lg !font-semibold !text-gray-900">Category Images</h3>
                  </div>
                  
                  <div className="!grid !grid-cols-1  !gap-8">
                    {/* Category Image */}
                    <div>
                      <label className="!text-sm !font-medium !text-gray-700 !mb-3 !flex !items-center">
                        <FiImage className="!w-4 !h-4 !mr-2 !text-gray-400" />
                        Category Image <span className="!text-red-500 !ml-1">*</span>
                      </label>
                      
                      <div className="!space-y-4">
                        <label className={`!relative !block !border-2 !border-dashed !rounded-2xl !transition-all !duration-200 !cursor-pointer ${
                          isImgError 
                            ? "!border-red-300 !bg-red-50" 
                            : previewImages.image 
                              ? "!border-gray-300" 
                              : "!border-gray-300 hover:!border-blue-400 !bg-gray-50 hover:!bg-blue-50"
                        }`}>
                          <input
                            type="file"
                            className="!absolute !inset-0 !w-full !h-full !opacity-0 !cursor-pointer"
                            onChange={(e) => handleImageUpload(e, "image")}
                            accept="image/*"
                            disabled={loading}
                          />
                          
                          {previewImages.image ? (
                            <div className="!relative !p-4">
                              <img
                                src={previewImages.image}
                                alt="Category preview"
                                className="!w-full !h-48 !object-cover !rounded-xl"
                              />
                              <div className="!absolute !inset-0  !bg-opacity-0 hover:!bg-opacity-20 !rounded-xl !transition-all !duration-200 !flex !items-center !justify-center">
                                <FiUpload className="!w-8 !h-8 !text-white !opacity-0 hover:!opacity-100 !transition-opacity" />
                              </div>
                            </div>
                          ) : (
                            <div className="!p-8 !text-center">
                              <FiImage className="!w-12 !h-12 !text-gray-400 !mx-auto !mb-3" />
                              <p className="!text-gray-600 !font-medium">Upload Category Image</p>
                              <p className="!text-gray-500 !text-sm !mt-1">PNG, JPG, JPEG up to 5MB</p>
                            </div>
                          )}
                        </label>
                        
                        {previewImages.image && (
                          <button
                            type="button"
                            onClick={() => removeImage("image")}
                            className="!w-full !py-2 !text-red-600 !border !border-red-200 !rounded-xl hover:!bg-red-50 !transition-colors !font-medium"
                          >
                            Remove Image
                          </button>
                        )}
                        
                        {isImgError && (
                          <p className="!text-sm !text-red-600 !flex !items-center">
                            <FiX className="!w-4 !h-4 !mr-1" />
                            Category image is required
                          </p>
                        )}
                      </div>
                    </div>

                   
                  </div>
                </section>

                {/* Description Section */}
                <section>
                  <div className="!flex !items-center !space-x-2 !mb-6">
                    <div className="!w-1 !h-6 !bg-purple-600 !rounded-full"></div>
                    <h3 className="!text-lg !font-semibold !text-gray-900">Description</h3>
                  </div>
                  
                  <div>
                    <label className="!text-sm !font-medium !text-gray-700 !mb-2 !flex !items-center">
                      <FiFileText className="!w-4 !h-4 !mr-2 !text-gray-400" />
                      Category Description <span className="!text-red-500 !ml-1">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      placeholder="Describe this category in detail..."
                      className={`!w-full !px-4 !py-3 !border !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition-all !duration-200 !resize-none ${
                        isDescriptionError
                          ? "!border-red-500 focus:!ring-red-500"
                          : "!border-gray-300 hover:!border-gray-400"
                      }`}
                      disabled={loading}
                    />
                    {isDescriptionError && (
                      <p className="!mt-2 !text-sm !text-red-600 !flex !items-center">
                        <FiX className="!w-4 !h-4 !mr-1" />
                        Description is required
                      </p>
                    )}
                  </div>
                </section>

                {/* SEO Section */}
                <section>
                  <div className="!flex !items-center !space-x-2 !mb-6">
                    <div className="!w-1 !h-6 !bg-orange-600 !rounded-full"></div>
                    <h3 className="!text-lg !font-semibold !text-gray-900 !flex !items-center">
                      <FiType className="!w-5 !h-5 !mr-2 !text-orange-500" />
                      SEO Settings
                    </h3>
                  </div>
                  
                  <div className="!space-y-6">
                    <div>
                      <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        name="metatitle"
                        value={formData.metatitle}
                        onChange={handleChange}
                        placeholder="Meta title for search engines..."
                        className="!w-full !px-4 !py-3 !border !border-gray-300 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition-all !duration-200 hover:!border-gray-400"
                        disabled={loading}
                      />
                      <p className="!mt-2 !text-sm !text-gray-500">
                        Recommended: 50-60 characters
                      </p>
                    </div>

                    <div>
                      <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                        Meta Description
                      </label>
                      <textarea
                        name="metadescription"
                        value={formData.metadescription}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Meta description for search engines..."
                        className="!w-full !px-4 !py-3 !border !border-gray-300 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition-all !duration-200 !resize-none hover:!border-gray-400"
                        disabled={loading}
                      />
                      <p className="!mt-2 text-sm text-gray-500">
                        Recommended: 150-160 characters
                      </p>
                    </div>
                  </div>
                </section>

                {/* Action Buttons */}
                <div className="!flex !items-center !justify-between !pt-8 !border-t !border-gray-200">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/list-categories")}
                    className="!px-8 !py-3 !text-gray-700 !border !border-gray-300 !rounded-xl !font-medium hover:!bg-gray-50 !transition-all !duration-200 hover:!shadow-sm"
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="!flex !items-center !px-8 !py-3 !bg-gradient-to-r from-blue-600 to-purple-600 hover:!from-blue-700 hover:!to-purple-700 !text-white !rounded-xl !font-medium !transition-all !duration-200 !shadow-lg hover:!shadow-xl disabled:!opacity-50 disabled:!cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="!w-5 !h-5 !border-2 !border-white !border-t-transparent !rounded-full !animate-spin !mr-2"></div>
                        {editingCategory ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <FiSave className="!w-5 !h-5 !mr-2" />
                        {editingCategory ? "Update Category" : "Create Category"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}


export default function AddCategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddCategoryPageContent />
    </Suspense>
  );
}