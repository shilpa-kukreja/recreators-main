"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from 'next/dynamic';
import {
  FiSave,
  FiUpload,
  FiImage,
  FiCalendar,
  FiLink,
  FiTag,
  FiGlobe,
  FiAward,
  FiZap,
  FiEye,
  FiCode,
  FiX,
 FiFileText,
 FiTrendingUp,
  FiPlus,
  FiExternalLink,
  FiFolderPlus,
  FiEdit3
} from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), {
  ssr: false,
  loading: () => (
    <div className="!h-96 !bg-gradient-to-br from-blue-50 to-indigo-100 !rounded-3xl !flex !items-center !justify-center !border-2 !border-dashed !border-blue-200 !shadow-sm">
      <div className="text-center">
        <div className="!animate-spin !rounded-full !h-12 !w-12 !border-b-2 !border-blue-600 !mx-auto !mb-4"></div>
        <p className="!text-blue-700 !font-semibold !text-lg">Loading Rich Text Editor</p>
        <p className="!text-blue-500 !text-sm !mt-2">Preparing advanced editing capabilities...</p>
      </div>
    </div>
  )
});

let ClassicEditor;
if (typeof window !== 'undefined') {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
}

const PortfolioFormContent = ({onSuccess}) => {
  const [form, setForm] = useState({
    portfolioName: "",
    portfolioDate: new Date().toISOString().split("T")[0],
    portfolioDetail: "",
    portfolioLink: "",
    portfolioTags: "",
    metatitle: "",
    metadescription: "",
    metatag: "",
    featured: false,
    status: "draft"
  });
  const [image, setImage] = useState(null);
  const searchParams = useSearchParams();
    const editId = searchParams.get("id");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [characterCount, setCharacterCount] = useState({ 
    metatitle: 0, 
    metadescription: 0,
    portfolioName: 0
  });

  // Fetch data if editing
  useEffect(() => {
    if (editId) {
      setLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/portfolio/getportfolio/${editId}`)
        .then(({ data }) => {
          const portfolio = data.data;
          setForm({
            portfolioName: portfolio.portfolioName || "",
            portfolioDate: portfolio.portfolioDate ? new Date(portfolio.portfolioDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
            portfolioDetail: portfolio.portfolioDetail || "",
            portfolioLink: portfolio.portfolioLink || "",
            portfolioTags: portfolio.portfolioTags || "",
            metatitle: portfolio.metatitle || "",
            metadescription: portfolio.metadescription || "",
            metatag: portfolio.metatag || "",
            featured: portfolio.featured || false,
            status: portfolio.status || "draft"
          });
          if (portfolio.portfolioImg) {
            setImagePreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}${portfolio.portfolioImg}`);
          }
        })
        .catch((err) => {
          toast.error("❌ Failed to fetch portfolio data");
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [editId]);

  useEffect(() => {
    setCharacterCount({
      metatitle: form.metatitle.length,
      metadescription: form.metadescription.length,
      portfolioName: form.portfolioName.length
    });
  }, [form.metatitle, form.metadescription, form.portfolioName]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("❌ Please select a valid image file (PNG, JPG, JPEG, GIF)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("❌ Image size should be less than 5MB");
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      toast.success("🖼️ Image uploaded successfully");
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    toast.info("🗑️ Image removed");
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setForm(prev => ({
      ...prev,
      portfolioDetail: data
    }));
  };

  const validateForm = () => {
    if (!form.portfolioName.trim()) {
      toast.error("❌ Please enter a portfolio name");
      return false;
    }

    if (!form.portfolioDetail.trim()) {
      toast.error("❌ Please add portfolio details");
      return false;
    }

    if (!image && !imagePreview) {
      toast.error("❌ Please select a portfolio image");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });
      
      if (image) formData.append("portfolioImg", image);

      if (editId) {
        // Update existing portfolio
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/portfolio/updateportfolio/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("🎉 Portfolio updated successfully!");
      } else {
        // Add new portfolio
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/portfolio/addportfolio`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("🚀 Portfolio added successfully!");
        
        // Reset form
        setForm({
          portfolioName: "",
          portfolioDate: new Date().toISOString().split("T")[0],
          portfolioDetail: "",
          portfolioLink: "",
          portfolioTags: "",
          metatitle: "",
          metadescription: "",
          metatag: "",
          featured: false,
          status: "draft"
        });
        setImage(null);
        setImagePreview(null);
      }

      if (onSuccess) onSuccess(); // Callback to refresh list
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save portfolio!");
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
        'highlight', 'specialCharacters', 'horizontalLine'
      ],
      shouldNotGroupWhenFull: false
    },
    placeholder: "Describe your portfolio project in detail...",
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
      <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-blue-50/30 !py-8">
        <div className="!max-w-6xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
          {/* Header Section */}
          <div className="!mb-8">
            <div className="!flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between">
              <div>
                <h1 className="!text-4xl !font-bold  !mb-3 !bg-gradient-to-r from-blue-600 to-purple-600 !bg-clip-text !text-transparent">
                  {editId ? "Edit Portfolio Project" : "Add New Portfolio"}
                </h1>
                <p className="!text-gray-600 text-lg">
                  {editId 
                    ? "Update and refine your portfolio project details"
                    : "Showcase your amazing work with a stunning portfolio entry"
                  }
                </p>
              </div>

              <div className="!flex !items-center !space-x-3 !mt-4 lg:!mt-0">
                <span className={`!px-4 !py-2 !rounded-full !text-sm !font-semibold ${
                  editId
                    ? "!bg-gradient-to-r from-purple-500 to-purple-600 !text-white !shadow-lg"
                    : "!bg-gradient-to-r from-green-500 to-emerald-600 !text-white !shadow-lg"
                }`}>
                  {editId ? "✏️ Edit Mode" : "✨ Create Mode"}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="!bg-white !rounded-3xl !shadow-2xl !overflow-hidden !border !border-gray-100">
            {/* Tab Navigation */}
            <div className="!border-b !border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50/50">
              <nav className="!flex">
                {[
                  { id: "basic", label: "Basic Info", icon: FiFolderPlus, color: "blue" },
                  { id: "content", label: "Content", icon: FiCode, color: "purple" },
                  { id: "seo", label: "SEO Settings", icon: FiGlobe, color: "green" },
                  { id: "preview", label: "Preview", icon: FiEye, color: "indigo" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`!flex !items-center !px-8 !py-5 !text-sm !font-semibold !border-b-2 !transition-all !duration-200 ${
                      activeTab === tab.id
                        ? `!border-${tab.color}-600 text-${tab.color}-700 !bg-white !shadow-sm`
                        : "!border-transparent !text-gray-500 hover:!text-gray-700 hover:!bg-white/50"
                    }`}
                  >
                    <tab.icon className={`!w-5 !h-5 !mr-3 text-${tab.color}-500`} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <form onSubmit={handleSubmit} className="!p-8" encType="multipart/form-data">
              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div className="!space-y-8">
                  {/* Project Name and Date */}
                  <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-8">
                    <div>
                      <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiAward className="!w-5 !h-5 !mr-2 !text-blue-500" />
                        Project Name <span className="!text-red-500 !ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="portfolioName"
                        value={form.portfolioName}
                        onChange={handleChange}
                        required
                        placeholder="Enter an impressive project name..."
                        className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/20 !transition-all !duration-200 !text-lg !font-medium"
                      />
                      <div className="!flex !justify-between !items-center !mt-2">
                        <p className="!text-xs !text-gray-500">
                          Make it memorable and descriptive
                        </p>
                        <span className={`!text-xs !font-medium ${
                          characterCount.portfolioName > 60 ? '!text-red-600' : '!text-green-600'
                        }`}>
                          {characterCount.portfolioName}/60 characters
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiCalendar className="!w-5 !h-5 !mr-2 !text-orange-500" />
                        Project Date <span className="!text-red-500 !ml-1">*</span>
                      </label>
                      <input
                        type="date"
                        name="portfolioDate"
                        value={form.portfolioDate}
                        onChange={handleChange}
                        required
                        className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/20 !transition-all !duration-200"
                      />
                    </div>
                  </div>

                  {/* Project Link and Tags */}
                  <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-8">
                    <div>
                      <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiLink className="!w-5 !h-5 !mr-2 !text-green-500" />
                        Project Link
                      </label>
                      <input
                        type="url"
                        name="portfolioLink"
                        value={form.portfolioLink}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-green-500 focus:!ring-4 focus:!ring-green-500/20 !transition-all !duration-200"
                      />
                      <p className="!text-xs !text-gray-500 !mt-2">
                        Link to live demo or project repository
                      </p>
                    </div>

                    <div>
                      <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiTag className="!w-5 !h-5 !mr-2 !text-purple-500" />
                        Project Tags
                      </label>
                      <input
                        type="text"
                        name="portfolioTags"
                        value={form.portfolioTags}
                        onChange={handleChange}
                        placeholder="web development, react, design, responsive..."
                        className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-purple-500 focus:!ring-4 focus:!ring-purple-500/20 !transition-all !duration-200"
                      />
                      <p className="!text-xs !text-gray-500 !mt-2">
                        Comma-separated tags for better categorization
                      </p>
                    </div>
                  </div>

                  {/* Featured Toggle and Status */}
                  <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-8">
                    <div className="!bg-gradient-to-r from-yellow-50 to-amber-50 !rounded-xl !p-6 !border !border-yellow-200">
                      <label className="flex items-center space-x-4 !cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="featured"
                            checked={form.featured}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`!w-14 !h-7 !rounded-full !transition-colors ${
                            form.featured ? '!bg-yellow-500' : '!bg-gray-300'
                          }`}></div>
                          <div className={`!absolute !top-1 !left-1 !w-5 !h-5 !rounded-full !bg-white !transition-transform ${
                            form.featured ? 'transform translate-x-7' : ''
                          }`}></div>
                        </div>
                        <div className="!flex !items-center !space-x-3">
                          <FiZap className="!w-6 !h-6 !text-yellow-600" />
                          <div>
                            <span className="!font-bold !text-yellow-800 !text-lg">Feature this Project</span>
                            <p className="!text-sm !text-yellow-600 !mt-1">
                              Highlight this project in your portfolio
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div>
                      <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiEdit3 className="!w-5 !h-5 !mr-2 !text-indigo-500" />
                        Project Status
                      </label>
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/20 !transition-all !duration-200 !bg-white"
                      >
                        <option value="draft">📝 Draft</option>
                        <option value="published">🚀 Published</option>
                        <option value="archived">📁 Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Portfolio Image */}
                  <div>
                    <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                      <FiImage className="!w-5 !h-5 !mr-2 !text-pink-500" />
                      Portfolio Image <span className="!text-red-500 !ml-1">*</span>
                    </label>

                    {!imagePreview ? (
                      <div
                        onClick={() => document.getElementById('portfolioImage').click()}
                        className="!border-3 !border-dashed !border-gray-300 !rounded-2xl !p-12 !text-center !cursor-pointer hover:!border-blue-400 !transition-all !duration-200 !bg-gradient-to-br from-gray-50 to-blue-50/50 !group"
                      >
                        <div className="!max-w-md !mx-auto">
                          <div className="!p-6 !bg-white !rounded-3xl !shadow-lg !inline-block group-hover:!scale-110 !transition-transform !duration-200">
                            <FiUpload className="!w-12 !h-12 !text-gray-400 !mx-auto !mb-4" />
                          </div>
                          <p className="!text-gray-700 !font-bold !text-lg !mt-6">Upload Portfolio Image</p>
                          <p className="!text-sm !text-gray-500 !mt-3">PNG, JPG, JPEG up to 5MB • Recommended: 1200x800px</p>
                          <button
                            type="button"
                            className="!mt-6 !bg-gradient-to-r from-blue-600 to-purple-600 !text-white !px-8 !py-3 !rounded-xl hover:!from-blue-700 hover:!to-purple-700 !transition-all !font-semibold !shadow-lg"
                          >
                            Choose Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="!relative !group">
                        <div className="!border-2 !border-gray-200 !rounded-2xl !overflow-hidden !shadow-lg">
                          <img
                            src={imagePreview}
                            alt="Portfolio preview"
                            className="!w-full !h-80 !object-cover"
                          />
                        </div>
                        <div className="!absolute !inset-0 !bg-black !bg-opacity-0 group-hover:!bg-opacity-40 !transition-all !duration-200 !flex !items-center !justify-center !opacity-0 group-hover:!opacity-100">
                          <div className="!flex !space-x-4">
                            <button
                              type="button"
                              onClick={removeImage}
                              className="!bg-white !text-red-600 !rounded-xl p-4 hover:!bg-red-50 !transition-all !duration-200 !shadow-lg !transform hover:!scale-110"
                              title="Remove image"
                            >
                              <FiX className="!w-6 !h-6" />
                            </button>
                            <button
                              type="button"
                              onClick={() => document.getElementById('portfolioImage').click()}
                              className="!bg-white !text-blue-600 !rounded-xl !p-4 hover:!bg-blue-50 !transition-all !duration-200 !shadow-lg !transform hover:!scale-110"
                              title="Change image"
                            >
                              <FiUpload className="!w-6 !h-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <input
                      type="file"
                      id="portfolioImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              {/* Content Tab */}
              {activeTab === "content" && (
                <div className="!space-y-8">
                  <div className="!bg-gradient-to-r from-purple-50 to-indigo-50 !rounded-2xl !p-8 !border !border-purple-200 !shadow-sm">
                    <div className="!flex !items-start !space-x-6">
                      <div className="!p-4 !bg-purple-100 !rounded-2xl !shadow-sm">
                        <FiCode className="!w-8 !h-8 !text-purple-600" />
                      </div>
                      <div>
                        <h3 className="!font-bold !text-purple-800 !text-xl">Project Details</h3>
                        <p className="!text-purple-600 !mt-2 !text-lg">
                          Describe your project in detail. Include technologies used, challenges faced, and solutions implemented.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                      <FiFileText className="!w-5 !h-5 !mr-2 !text-purple-500" />
                      Project Description <span className="!text-red-500 !ml-1">*</span>
                    </label>
                    {typeof window !== 'undefined' && ClassicEditor && (
                      <div className="!border-2 !border-gray-200 !rounded-2xl !overflow-hidden !shadow-sm">
                        <CKEditor
                          editor={ClassicEditor}
                          data={form.portfolioDetail}
                          onChange={handleEditorChange}
                          config={editorConfig}
                        />
                      </div>
                    )}
                    <p className="!text-xs !text-gray-500 !mt-3">
                      Detailed description of your project, technologies used, and your role
                    </p>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === "seo" && (
                <div className="!space-y-8">
                  <div className="!bg-gradient-to-r from-green-50 to-emerald-50 !rounded-2xl !p-8 !border !border-green-200 !shadow-sm">
                    <div className="!flex !items-start !space-x-6">
                      <div className="!p-4 !bg-green-100 !rounded-2xl !shadow-sm">
                        <FiTrendingUp className="!w-8 !h-8 !text-green-600" />
                      </div>
                      <div>
                        <h3 className="!font-bold !text-green-800 !text-xl">SEO Optimization</h3>
                        <p className="!text-green-600 !mt-2 !text-lg">
                          Optimize your portfolio for search engines to attract more clients and opportunities.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="!block !text-sm !font-semibold !text-gray-700 !mb-3">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metatitle"
                      value={form.metatitle}
                      onChange={handleChange}
                      placeholder="Optimized title for search engines (50-60 characters recommended)"
                      className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-green-500 focus:!ring-4 focus:!ring-green-500/20 !transition-all !duration-200"
                    />
                    <div className="!flex !justify-between !items-center !mt-3">
                      <p className="!text-xs !text-gray-500">
                        Appears as the title in search engine results
                      </p>
                      <span className={`!text-sm !font-semibold ${
                        characterCount.metatitle > 60 ? '!text-red-600' :
                        characterCount.metatitle >= 50 ? '!text-green-600' : '!text-yellow-600'
                      }`}>
                        {characterCount.metatitle}/60
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="!block !text-sm !font-semibold !text-gray-700 !mb-3">
                      Meta Description
                    </label>
                    <textarea
                      name="metadescription"
                      value={form.metadescription}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Compelling description that encourages clicks from search results (150-160 characters recommended)"
                      className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-green-500 focus:!ring-4 focus:!ring-green-500/20 !transition-all !duration-200 !resize-none"
                    />
                    <div className="!flex !justify-between !items-center !mt-3">
                      <p className="!text-xs !text-gray-500">
                        Appears as the description in search engine results
                      </p>
                      <span className={`!text-sm !font-semibold ${
                        characterCount.metadescription > 160 ? '!text-red-600' :
                        characterCount.metadescription >= 150 ? '!text-green-600' : '!text-yellow-600'
                      }`}>
                        {characterCount.metadescription}/160
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex items-center">
                      <FiTag className="!w-5 !h-5 !mr-2 !text-purple-500" />
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      name="metatag"
                      value={form.metatag}
                      onChange={handleChange}
                      placeholder="web development, portfolio, react projects, javascript, responsive design..."
                      className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-purple-500 focus:!ring-4 focus:!ring-purple-500/20 !transition-all !duration-200"
                    />
                    <p className="!text-xs !text-gray-500 !mt-3">
                      Comma-separated keywords that help search engines understand your content
                    </p>
                  </div>
                </div>
              )}

              {/* Preview Tab */}
              {activeTab === "preview" && (
                <div className="!space-y-8">
                  <div className="!bg-gradient-to-r from-indigo-50 to-blue-50 !rounded-2xl !p-8 !border !border-indigo-200 !shadow-sm">
                    <div className="!flex !items-start !space-x-6">
                      <div className="!p-4 !bg-indigo-100 !rounded-2xl !shadow-sm">
                        <FiEye className="!w-8 !h-8 !text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="!font-bold !text-indigo-800 !text-xl">Project Preview</h3>
                        <p className="!text-indigo-600 !mt-2 !text-lg">
                          See how your portfolio project will appear to visitors and potential clients.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="!border-2 !border-dashed !border-gray-300 !rounded-2xl !p-8 !bg-white !shadow-lg">
                    <div className="max-w-4xl mx-auto">
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Portfolio preview"
                          className="!w-full !h-96 !object-cover !rounded-2xl !mb-8 !shadow-xl"
                        />
                      )}

                      <h1 className="!text-4xl !font-bold !text-gray-900 !mb-4">
                        {form.portfolioName || "Your Amazing Project Name"}
                      </h1>

                      <div className="!flex !items-center !space-x-6 !text-gray-600 !mb-6 !text-lg">
                        <span className="!flex !items-center !font-medium">
                          <FiCalendar className="!w-5 !h-5 !mr-2" />
                          {form.portfolioDate || new Date().toISOString().split("T")[0]}
                        </span>
                        {form.portfolioLink && (
                          <>
                            <span>•</span>
                            <a 
                              href={form.portfolioLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="!flex !items-center !text-blue-600 hover:!text-blue-700 !font-medium"
                            >
                              <FiExternalLink className="!w-5 !h-5 !mr-2" />
                              View Project
                            </a>
                          </>
                        )}
                        {form.featured && (
                          <>
                            <span>•</span>
                            <span className="!flex !items-center !bg-yellow-100 !text-yellow-800 !px-3 !py-1 !rounded-full !text-sm !font-semibold">
                              <FiZap className="!w-4 !h-4 !mr-1" />
                              Featured
                            </span>
                          </>
                        )}
                      </div>

                      {form.portfolioTags && (
                        <div className="!flex !flex-wrap !gap-3 !mb-8">
                          {form.portfolioTags.split(',').map((tag, index) => (
                            <span key={index} className="!bg-gradient-to-r from-blue-100 to-indigo-100 !text-blue-800 !px-4 !py-2 !rounded-full !text-sm !font-semibold !shadow-sm">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <div
                        className="!prose !prose-lg !max-w-none !text-gray-700 !leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: form.portfolioDetail ||
                            `<p class="!text-gray-500 !italic !text-xl !text-center !py-12">Your project description will appear here. Add detailed information about your work, technologies used, and your contributions.</p>`
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="!flex !flex-col sm:!flex-row !gap-4 !pt-8 !mt-8 !border-t !border-gray-200">
                <div className="!flex-1 !flex !flex-col sm:!flex-row !gap-4">
                  <button
                    type="submit"
                    name="status"
                    value="draft"
                    onClick={(e) => setForm(prev => ({ ...prev, status: "draft" }))}
                    disabled={loading}
                    className="!flex-1 !bg-gradient-to-r from-gray-600 to-gray-700 !text-white !font-bold !py-5 !px-8 !rounded-xl hover:!from-gray-700 hover:!to-gray-800 !transition-all !duration-200 disabled:!opacity-50 !flex !items-center !justify-center !shadow-xl hover:!shadow-2xl !transform hover:-translate-y-0.5"
                  >
                    <FiSave className="!w-6 !h-6 !mr-3" />
                    Save as Draft
                  </button>

                  <button
                    type="submit"
                    name="status"
                    value="published"
                    onClick={(e) => setForm(prev => ({ ...prev, status: "published" }))}
                    disabled={loading}
                    className="!flex-1 !bg-gradient-to-r from-blue-600 to-purple-600 !text-white !font-bold !py-5 !px-8 !rounded-xl hover:!from-blue-700 hover:!to-purple-700 !transition-all !duration-200 disabled:!opacity-50 !flex !items-center !justify-center !shadow-xl hover:!shadow-2xl !transform hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <>
                        <div className="!animate-spin !rounded-full !h-6 !w-6 !border-b-2 !border-white !mr-3"></div>
                        {editId ? "Updating..." : "Publishing..."}
                      </>
                    ) : (
                      <>
                        <FiEdit3 className="!w-6 !h-6 !mr-3" />
                        {editId ? "Update Portfolio" : "Publish Portfolio"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default function PortfolioForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PortfolioFormContent />
    </Suspense>
  );
}