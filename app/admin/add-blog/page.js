"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import AdminLayout from "../components/AdminLayout";
import dynamic from 'next/dynamic';
import axios from "axios";
import {
  FiArrowLeft,
  FiSave,
  FiEdit,
  FiUpload,
  FiImage,
  FiCalendar,
  FiFileText,
  FiLink,
  FiTag,
  FiEye,
  FiCode,
  FiX,
  FiPlus,
  FiSearch,
  FiGlobe,
  FiBarChart,
  FiCheckCircle
} from "react-icons/fi";

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading Advanced Editor...</p>
        <p className="text-gray-500 text-sm mt-1">Preparing rich text capabilities</p>
      </div>
    </div>
  )
});

let ClassicEditor;
if (typeof window !== 'undefined') {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
}

const AdminAddBlogContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isEditMode = searchParams.get("id");
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    blogName: "",
    blogDetail: "",
    blogSlug: "",
    blogDate: new Date().toISOString().split("T")[0],
    blogImg: null,
    blogCategory: [], // Changed to array for multiple categories
    blogTags: "",
    metatitle: "",
    metadescription: "",
    metatag: "",
    status: "draft"
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [characterCount, setCharacterCount] = useState({ metatitle: 0, metadescription: 0 });
  const [slugAvailable, setSlugAvailable] = useState(true);
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [newCategory, setNewCategory] = useState(""); // For adding new categories

  const fetchCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/getcategory`);
      setCategories(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error(error);
      setCategories([]);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
    if (isEditMode) fetchBlogDetails();
    fetchCategories();
  }, [isEditMode]);

  useEffect(() => {
    setCharacterCount({
      metatitle: formData.metatitle.length,
      metadescription: formData.metadescription.length
    });
  }, [formData.metatitle, formData.metadescription]);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`);
      const blog = res.data;

      // Handle category data - convert string to array if needed
      let blogCategories = [];
      if (blog.blogCategory) {
        if (Array.isArray(blog.blogCategory)) {
          blogCategories = blog.blogCategory;
        } else if (typeof blog.blogCategory === 'string') {
          blogCategories = blog.blogCategory.split(',').map(cat => cat.trim());
        }
      }

      const formattedDate = blog.blogDate
        ? new Date(blog.blogDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      setFormData({
        blogName: blog.blogName || "",
        blogDetail: blog.blogDetail || "",
        blogSlug: blog.blogSlug || "",
        blogDate: formattedDate,
        blogImg: null,
        blogCategory: blogCategories, // Set as array
        blogTags: blog.blogTags || "",
        metatitle: blog.metatitle || "",
        metadescription: blog.metadescription || "",
        metatag: blog.metatag || "",
        status: blog.status || "draft"
      });

      if (blog.blogImg) {
        setImagePreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.blogImg}`);
      }
    } catch (error) {
      toast.error("Failed to fetch blog details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const checkSlugAvailability = async (slug) => {
  //   if (!slug) return true;
  //   try {
  //     const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/check-slug/${slug}${isEditMode ? `?exclude=${id}` : ''}`);
  //     return res.data.available;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  // Handle category selection
  const handleCategoryChange = (categoryName) => {
    setFormData(prev => {
      const isSelected = prev.blogCategory.includes(categoryName);
      
      if (isSelected) {
        // Remove category if already selected
        return {
          ...prev,
          blogCategory: prev.blogCategory.filter(cat => cat !== categoryName)
        };
      } else {
        // Add category if not selected
        return {
          ...prev,
          blogCategory: [...prev.blogCategory, categoryName]
        };
      }
    });
  };

  // Add new category
  const handleAddNewCategory = () => {
    if (newCategory.trim() && !formData.blogCategory.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        blogCategory: [...prev.blogCategory, newCategory.trim()]
      }));
      setNewCategory("");
    }
  };

  // Remove category
  const removeCategory = (categoryToRemove) => {
    setFormData(prev => ({
      ...prev,
      blogCategory: prev.blogCategory.filter(cat => cat !== categoryToRemove)
    }));
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "blogImg") {
      const file = files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          toast.error("Please select a valid image file (PNG, JPG, JPEG, GIF)");
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          toast.error("Image size should be less than 5MB");
          return;
        }

        setFormData((prev) => ({ ...prev, blogImg: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    }else if (name === "blogName") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setFormData((prev) => ({
        ...prev,
        blogName: value,
        blogSlug: generatedSlug,
      }));
    
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (event, editor, field) => {
    const data = editor.getData();
    setFormData(prev => ({
      ...prev,
      [field]: data
    }));
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, blogImg: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    if (!formData.blogName.trim()) {
      toast.error("Please enter a blog title");
      return false;
    }

    if (!formData.blogDetail.trim() || formData.blogDetail.trim().length < 50) {
      toast.error("Please add meaningful blog content (minimum 50 characters)");
      return false;
    }

    if (!formData.blogImg && !imagePreview) {
      toast.error("Please select a featured image");
      return false;
    }

    if (formData.blogCategory.length === 0) {
      toast.error("Please select at least one blog category");
      return false;
    }

    if (!formData.blogTags.trim()) {
      toast.error("Please add blog tags");
      return false;
    }

    if (!slugAvailable) {
      toast.error("This slug is already taken. Please choose a different one.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = new FormData();
    payload.append("blogName", formData.blogName.trim());
    payload.append("blogDetail", formData.blogDetail);
    payload.append("blogSlug", formData.blogSlug);
    payload.append("blogDate", formData.blogDate);
    payload.append("blogCategory", formData.blogCategory.join(',')); // Convert array to string
    payload.append("blogTags", formData.blogTags);
    payload.append("metatitle", formData.metatitle);
    payload.append("metadescription", formData.metadescription);
    payload.append("metatag", formData.metatag);
    payload.append("status", formData.status);

    if (formData.blogImg) {
      payload.append("blogImg", formData.blogImg);
    }

    try {
      setLoading(true);

      const url = isEditMode
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/createblog`;

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, { method, body: payload });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save blog");
      }

      const data = await res.json();
      const successMessage = isEditMode ? "Blog updated successfully!" : "Blog published successfully!";

      toast.success(data.message || successMessage);

      if (!isEditMode) {
        // Reset form for new blog
        setFormData({
          blogName: "",
          blogDetail: "",
          blogSlug: "",
          blogDate: new Date().toISOString().split("T")[0],
          blogImg: null,
          blogCategory: [],
          blogTags: "",
          metatitle: "",
          metadescription: "",
          metatag: "",
          status: "draft"
        });
        setImagePreview(null);
        setSlugAvailable(true);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        router.push("/admin/list-blog");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while saving the blog");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const editorConfig = {
    toolbar: {
      items: [
        'heading', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
        'link', 'bulletedList', 'numberedList', '|', 'blockQuote', 'insertTable',
        'mediaEmbed', 'codeBlock', '|', 'outdent', 'indent', '|', 'undo', 'redo',
        'fontColor', 'fontBackgroundColor', 'fontSize', 'fontFamily', 'alignment',
        'highlight', 'specialCharacters', 'horizontalLine', 'pageBreak'
      ],
      shouldNotGroupWhenFull: false
    },
    placeholder: "Start writing your amazing blog content here...",
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
      ]
    }
  };

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-gray-50 to-blue-50/30 !py-8">
        <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
          {/* Header Section */}
          <div className="!mb-8">
            <div className="!flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between">
              <div className="!flex !items-center !space-x-4 !mb-4 lg:!mb-0">
                <button
                  onClick={() => router.push("/admin/list-blogs")}
                  className="!flex !items-center !text-gray-600 hover:!text-gray-800 !transition-colors !p-3 !rounded-2xl hover:!bg-white !shadow-sm !border !border-gray-200"
                >
                  <FiArrowLeft className="!w-5 !h-5 !mr-2" />
                  Back to Blogs
                </button>
                <div>
                  <h1 className="!text-3xl !font-bold !text-gray-900">
                    {isEditMode ? "Edit Blog Post" : "Create New Blog"}
                  </h1>
                  <p className="!text-gray-600 !mt-2">
                    {isEditMode
                      ? "Update and refine your blog content"
                      : "Craft an engaging blog post for your audience"
                    }
                  </p>
                </div>
              </div>

              <div className="!flex !items-center !space-x-3">
                <span className={`!px-3 !py-1 !rounded-full !text-sm !font-medium ${isEditMode
                    ? "!bg-purple-100 !text-purple-800"
                    : "!bg-green-100 !text-green-800"
                  }`}>
                  {isEditMode ? "Edit Mode" : "Create Mode"}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="!bg-white !rounded-3xl !shadow-2xl !overflow-hidden !border !border-gray-100">
            {/* Tab Navigation */}
            <div className="!border-b !border-gray-200 !bg-gradient-to-r from-gray-50 to-blue-50/50">
              <nav className="!flex">
                <button
                  onClick={() => setActiveTab("content")}
                  className={`!flex !items-center !px-8 !py-5 !text-sm !font-medium !border-b-2 !transition-all !duration-200 ${activeTab === "content"
                      ? "!border-blue-600 !text-blue-700 !bg-white !shadow-sm"
                      : "!border-transparent !text-gray-500 hover:!text-gray-700 hover:!bg-white/50"
                    }`}
                >
                  <FiFileText className="!w-4 !h-4 !mr-3" />
                  Content
                </button>
                <button
                  onClick={() => setActiveTab("seo")}
                  className={`!flex !items-center !px-8 !py-5 !text-sm !font-medium !border-b-2 !transition-all !duration-200 ${activeTab === "seo"
                      ? "!border-green-600 !text-green-700 !bg-white !shadow-sm"
                      : "!border-transparent !text-gray-500 hover:!text-gray-700 hover:!bg-white/50"
                    }`}
                >
                  <FiGlobe className="!w-4 !h-4 !mr-3" />
                  SEO Settings
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`!flex !items-center !px-8 !py-5 !text-sm !font-medium !border-b-2 !transition-all !duration-200 ${activeTab === "preview"
                      ? "!border-purple-600 !text-purple-700 !bg-white !shadow-sm"
                      : "!border-transparent !text-gray-500 hover:!text-gray-700 hover:!bg-white/50"
                    }`}
                >
                  <FiEye className="!w-4 !h-4 !mr-3" />
                  Preview
                </button>
              </nav>
            </div>

            <form onSubmit={handleSubmit} className="!p-8" encType="multipart/form-data">
              {/* Content Tab */}
              {activeTab === "content" && (
                <div className="!space-y-8">
                  {/* Blog Title and Slug */}
                  <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-8">
                    <div>
                      <label className=" !text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiFileText className="!w-4 !h-4 !mr-2 !text-blue-500" />
                        Blog Title <span className="!text-red-500 !ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="blogName"
                        value={formData.blogName}
                        onChange={handleChange}
                        required
                        placeholder="Catchy and descriptive blog title..."
                        className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/20 !transition-all !duration-200 !text-lg !font-medium"
                      />
                    </div>

                    <div>
                    <label className="!block !mb-2 !font-medium !text-gray-700">
                      URL Slug
                    </label>
                    <div className="!flex !items-center">
                      <span className="!bg-gray-100 !border !border-r-0 !border-gray-300 !rounded-l-lg !px-3 !py-3 !text-gray-500">/blog/</span>
                      <input
                        type="text"
                        name="blogSlug"
                        value={formData.blogSlug}
                        onChange={handleChange}
                        placeholder="auto-generated-slug"
                        className="!w-full !border !border-gray-300 !rounded-r-lg !px-4 !py-3 focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition !bg-white"
                      />
                    </div>
                    <p className="!text-xs !text-gray-500 !mt-1">
                      This will be used in the blog URL
                    </p>
                  </div>
                  </div>

                  {/* Blog Content Editor */}
                  <div>
                    <label className=" !text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                      <FiCode className="!w-4 !h-4 !mr-2 !text-purple-500" />
                      Blog Content <span className="!text-red-500 !ml-1">*</span>
                    </label>
                    {typeof window !== 'undefined' && ClassicEditor && (
                      <div className="!border-2 !border-gray-200 !rounded-2xl !overflow-hidden !shadow-sm">
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.blogDetail}
                          onChange={(event, editor) => handleEditorChange(event, editor, "blogDetail")}
                          config={editorConfig}
                        />
                      </div>
                    )}
                    <p className="!text-xs !text-gray-500 !mt-2">
                      Minimum 50 characters required. Current: {formData.blogDetail.replace(/<[^>]*>/g, '').length} characters
                    </p>
                  </div>

                  {/* Category and Tags Section */}
                  <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-8">
                    {/* Blog Category - Updated for multiple selection */}
                    <div>
                      <label className=" !text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiTag className="!w-4 !h-4 !mr-2 !text-indigo-500" />
                        Blog Categories <span className="!text-red-500 !ml-1">*</span>
                      </label>
                      
                      {/* Selected Categories Display */}
                      {formData.blogCategory.length > 0 && (
                        <div className="!mb-4">
                          <label className="!block !text-xs !font-medium !text-gray-600 mb-2">Selected Categories:</label>
                          <div className="!flex !flex-wrap !gap-2">
                            {formData.blogCategory.map((category, index) => (
                              <span
                                key={index}
                                className="!inline-flex !items-center !bg-indigo-100 !text-indigo-800 !px-3 !py-1 !rounded-full !text-sm !font-medium"
                              >
                                {category}
                                <button
                                  type="button"
                                  onClick={() => removeCategory(category)}
                                  className="!ml-2 !text-indigo-600 hover:!text-indigo-900 focus:!outline-none"
                                >
                                  <FiX className="!w-3 !h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Available Categories */}
                      <div className="!mb-4">
                        <label className="!block !text-xs !font-medium !text-gray-600 !mb-2">Available Categories:</label>
                        <div className="!max-h-32 !overflow-y-auto !border !border-gray-200 !rounded-lg !p-2">
                          {categories.length > 0 ? (
                            categories.map((category, index) => {
                              const categoryName = category.name || category;
                              const isSelected = formData.blogCategory.includes(categoryName);
                              
                              return (
                                <label key={index} className="!flex !items-center !space-x-2 p-2 hover:!bg-gray-50 !rounded !cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleCategoryChange(categoryName)}
                                    className="!rounded !border-gray-300 !text-indigo-600 focus:!ring-indigo-500"
                                  />
                                  <span className={`!text-sm ${isSelected ? '!text-indigo-700 !font-medium' : '!text-gray-700'}`}>
                                    {categoryName}
                                  </span>
                                </label>
                              );
                            })
                          ) : (
                            <p className="!text-sm !text-gray-500 !text-center !py-2">No categories available</p>
                          )}
                        </div>
                      </div>

                      {/* Add New Category */}
                      <div className="!flex !space-x-2">
                        <input
                          type="text"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="Add new category..."
                          className="!flex-1 !border !border-gray-300 !rounded-lg !px-3 !py-2 !text-sm focus:!outline-none focus:!ring-2 focus:!ring-indigo-500 focus:!border-indigo-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddNewCategory();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleAddNewCategory}
                          className="!bg-indigo-600 !text-white !px-3 !py-2 !rounded-lg hover:!bg-indigo-700 !transition-colors !text-sm !font-medium !flex !items-center"
                        >
                          <FiPlus className="!w-4 !h-4 !mr-1" />
                          Add
                        </button>
                      </div>
                      <p className="!text-xs !text-gray-500 !mt-2">
                        Select multiple categories or add new ones
                      </p>
                    </div>

                    {/* Blog Tags */}
                    <div>
                      <label className=" !text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiTag className="!w-4 !h-4 !mr-2 !text-pink-500" />
                        Blog Tags <span className="!text-red-500 !ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="blogTags"
                        value={formData.blogTags}
                        onChange={handleChange}
                        required
                        placeholder="Comma-separated tags (e.g., technology, web development, programming)"
                        className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-pink-500 focus:!ring-4 focus:!ring-pink-500/20 !transition-all !duration-200"
                      />
                      <p className="!text-xs !text-gray-500 !mt-2">
                        Separate tags with commas for better categorization
                      </p>
                    </div>
                  </div>

                  {/* Date and Status Section */}
                  <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-8">
                    {/* Publish Date */}
                    <div>
                      <label className=" !text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiCalendar className="!w-4 !h-4 !mr-2 !text-orange-500" />
                        Publish Date <span className="!text-red-500 !ml-1">*</span>
                      </label>
                      <div className="!relative">
                        <input
                          type="date"
                          name="blogDate"
                          value={formData.blogDate}
                          onChange={handleChange}
                          required
                          className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/20 !transition-all !duration-200"
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className=" !text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiBarChart className="!w-4 !h-4 !mr-2 !text-indigo-500" />
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/20 !transition-all !duration-200"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div>
                    <label className=" !text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                      <FiImage className="!w-4 !h-4 !mr-2 !text-pink-500" />
                      Featured Image <span className="!text-red-500 !ml-1">*</span>
                    </label>

                    {!imagePreview ? (
                      <div
                        onClick={triggerFileInput}
                        className="!border-3 !border-dashed !border-gray-300 !rounded-2xl !p-8 !text-center !cursor-pointer hover:!border-blue-400 !transition-all !duration-200 !bg-gradient-to-br from-gray-50 to-blue-50/50 !group"
                      >
                        <div className="max-w-xs mx-auto">
                          <div className="!p-4 !bg-white !rounded-2xl !shadow-lg !inline-block group-hover:!scale-110 !transition-transform !duration-200">
                            <FiUpload className="!w-8 !h-8 !text-gray-400 !mx-auto !mb-3" />
                          </div>
                          <p className="!text-gray-700 !font-semibold !mt-4">Upload Featured Image</p>
                          <p className="!text-sm !text-gray-500 !mt-2">PNG, JPG, JPEG up to 5MB</p>
                          <button
                            type="button"
                            className="!mt-4 !bg-blue-600 !text-white !px-6 !py-2 !rounded-lg hover:!bg-blue-700 !transition-colors !font-medium"
                          >
                            Choose File
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="!relative !group">
                        <div className="!border-2 !border-gray-200 !rounded-2xl !overflow-hidden !shadow-lg">
                          <img
                            src={imagePreview}
                            alt="Featured preview"
                            className="!w-full !h-64 !object-cover"
                          />
                        </div>
                        <div className="!absolute !inset-0 !bg-black !bg-opacity-0 group-hover:!bg-opacity-40 !transition-all !duration-200 !flex !items-center !justify-center !opacity-0 group-hover:!opacity-100">
                          <div className="flex space-x-3">
                            <button
                              type="button"
                              onClick={removeImage}
                              className="!bg-white !text-red-600 !rounded-xl !p-3 hover:!bg-red-50 !transition-all !duration-200 !shadow-lg !transform hover:!scale-110"
                              title="Remove image"
                            >
                              <FiX className="!w-5 !h-5" />
                            </button>
                            <button
                              type="button"
                              onClick={triggerFileInput}
                              className="!bg-white !text-blue-600 !rounded-xl !p-3 hover:!bg-blue-50 !transition-all !duration-200 !shadow-lg !transform hover:!scale-110"
                              title="Change image"
                            >
                              <FiUpload className="!w-5 !h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <input
                      type="file"
                      name="blogImg"
                      accept="image/*"
                      onChange={handleChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === "seo" && (
                <div className="!space-y-8">
                  {/* SEO Info Card */}
                  <div className="!bg-gradient-to-r from-green-50 to-emerald-50 !rounded-2xl !p-6 !border !border-green-200">
                    <div className="flex items-start space-x-4">
                      <div className="!p-3 !bg-green-100 !rounded-xl">
                        <FiGlobe className="!w-6 !h-6 !text-green-600" />
                      </div>
                      <div>
                        <h3 className="!font-semibold !text-green-800 !text-lg">SEO Optimization</h3>
                        <p className="!text-green-600 !mt-1">Improve your blog's visibility in search engines with these settings</p>
                      </div>
                    </div>
                  </div>

                  {/* Meta Title */}
                  <div>
                    <label className="!block !text-sm !font-semibold !text-gray-700 !mb-3">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metatitle"
                      value={formData.metatitle}
                      onChange={handleChange}
                      placeholder="Optimized title for search engines (50-60 characters recommended)"
                      className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-green-500 focus:!ring-4 focus:!ring-green-500/20 !transition-all !duration-200"
                    />
                    <div className="!flex !justify-between !items-center !mt-2">
                      <p className="!text-xs !text-gray-500">
                        This appears as the title in search engine results
                      </p>
                      <span className={`!text-xs !font-medium ${characterCount.metatitle > 60 ? '!text-red-600' :
                          characterCount.metatitle >= 50 ? '!text-green-600' : '!text-yellow-600'
                        }`}>
                        {characterCount.metatitle}/60 characters
                      </span>
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="!block text-sm !font-semibold !text-gray-700 !mb-3">
                      Meta Description
                    </label>
                    <textarea
                      name="metadescription"
                      value={formData.metadescription}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Compelling description that encourages clicks (150-160 characters recommended)"
                      className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-green-500 focus:!ring-4 focus:!ring-green-500/20 !transition-all !duration-200 !resize-none"
                    />
                    <div className="!flex !justify-between !items-center !mt-2">
                      <p className="!text-xs !text-gray-500">
                        This appears as the description in search engine results
                      </p>
                      <span className={`!text-xs !font-medium ${characterCount.metadescription > 160 ? '!text-red-600' :
                          characterCount.metadescription >= 150 ? '!text-green-600' : '!text-yellow-600'
                        }`}>
                        {characterCount.metadescription}/160 characters
                      </span>
                    </div>
                  </div>

                  {/* Meta Tags */}
                  <div>
                    <label className=" !text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                      <FiTag className="!w-4 !h-4 !mr-2 !text-purple-500" />
                      Meta Tags
                    </label>
                    <input
                      type="text"
                      name="metatag"
                      value={formData.metatag}
                      onChange={handleChange}
                      placeholder="Comma-separated keywords (e.g., digital marketing, seo, content strategy)"
                      className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-purple-500 focus:!ring-4 focus:!ring-purple-500/20 !transition-all !duration-200"
                    />
                    <p className="!text-xs !text-gray-500 !mt-2">
                      These tags help categorize your content for better discovery
                    </p>
                  </div>
                </div>
              )}

              {/* Preview Tab */}
              {activeTab === "preview" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                    <div className="flex items-start space-x-4">
                      <div className="!p-3 !bg-purple-100 !rounded-xl">
                        <FiEye className="!w-6 !h-6 !text-purple-600" />
                      </div>
                      <div>
                        <h3 className="!font-semibold !text-purple-800 !text-lg">Content Preview</h3>
                        <p className="!text-purple-600 !mt-1">Preview how your blog will appear to readers</p>
                      </div>
                    </div>
                  </div>

                  <div className="!border-2 !border-dashed !border-gray-300 !rounded-2xl !p-8 !bg-white">
                    <div className="!max-w-4xl !mx-auto">
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Blog preview"
                          className="!w-full !h-64 !object-cover !rounded-xl !mb-6 !shadow-lg"
                        />
                      )}

                      <h1 className="!text-4xl !font-bold !text-gray-900 !mb-4">
                        {formData.blogName || "Your Blog Title Will Appear Here"}
                      </h1>

                      <div className="!flex !items-center !space-x-4 !text-gray-600 !mb-6">
                        <span className="!flex !items-center">
                          <FiCalendar className="!w-4 !h-4 !mr-2" />
                          {formData.blogDate || "Publish Date"}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{formData.status || "draft"}</span>
                        {formData.blogCategory.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="!flex !flex-wrap !gap-1">
                              {formData.blogCategory.map((category, index) => (
                                <span key={index} className="!bg-blue-100 !text-blue-800 !px-2 !py-1 !rounded-full !text-sm">
                                  {category}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      <div
                        className="!prose !prose-lg !max-w-none !text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: formData.blogDetail ||
                            "<p class='!text-gray-500 italic'>Your blog content will appear here. Start writing to see the preview.</p>"
                        }}
                      />

                      {formData.blogTags && (
                        <div className="!mt-8 !pt-6 !border-t !border-gray-200">
                          <h3 className="!font-semibold !text-gray-900 !mb-3">Tags:</h3>
                          <div className="!flex !flex-wrap !gap-2">
                            {formData.blogTags.split(',').map((tag, index) => (
                              <span key={index} className="!bg-gray-100 !text-gray-700 !px-3 !py-1 !rounded-full !text-sm">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="!flex !flex-col sm:!flex-row !gap-4 !pt-8 !mt-8 !border-t !border-gray-200">
                <div className="flex-1 flex gap-4">
                  <button
                    type="submit"
                    name="status"
                    value="draft"
                    onClick={(e) => setFormData(prev => ({ ...prev, status: "draft" }))}
                    disabled={loading}
                    className="!flex-1 !bg-gradient-to-r from-gray-600 to-gray-700 !text-white !font-semibold !py-4 !px-8 !rounded-xl hover:!from-gray-700 hover:!to-gray-800 !transition-all !duration-200 disabled:!opacity-50 !flex !items-center !justify-center !shadow-lg hover:!shadow-xl"
                  >
                    <FiSave className="!w-5 !h-5 !mr-2" />
                    Save as Draft
                  </button>

                  <button
                    type="submit"
                    name="status"
                    value="published"
                    onClick={(e) => setFormData(prev => ({ ...prev, status: "published" }))}
                    disabled={loading}
                    className="!flex-1 !bg-gradient-to-r from-blue-600 to-indigo-700 !text-white !font-semibold !py-4 !px-8 !rounded-xl hover:!from-blue-700 hover:!to-indigo-800 !transition-all !duration-200 disabled:!opacity-50 !flex !items-center !justify-center 1shadow-lg hover:!shadow-xl"
                  >
                    {loading ? (
                      <>
                        <div className="!animate-spin !rounded-full !h-5 !w-5 !border-b-2 !border-white !mr-2"></div>
                        {isEditMode ? "Updating..." : "Publishing..."}
                      </>
                    ) : (
                      <>
                        <FiEdit className="!w-5 !h-5 !mr-2" />
                        {isEditMode ? "Update Blog" : "Publish Blog"}
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="!px-8 !py-4 !border-2 !border-gray-300 !text-gray-700 !font-semibold !rounded-xl hover:!bg-gray-50 !transition-all !duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default function AdminAddBlog() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminAddBlogContent />
    </Suspense>
  );
}