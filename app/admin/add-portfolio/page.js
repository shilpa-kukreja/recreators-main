"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
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
  FiExternalLink,
  FiFolderPlus,
  FiEdit3,
  FiStar,
  FiPlusCircle,
} from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";

const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  {
    ssr: false,
    loading: () => (
      <div className="!h-96 !bg-gradient-to-br from-blue-50 to-indigo-100 !rounded-3xl !flex !items-center !justify-center !border-2 !border-dashed !border-blue-200 !shadow-sm">
        <div className="text-center">
          <div className="!animate-spin !rounded-full !h-12 !w-12 !border-b-2 !border-blue-600 !mx-auto !mb-4"></div>
          <p className="!text-blue-700 !font-semibold !text-lg">
            Loading Rich Text Editor
          </p>
        </div>
      </div>
    ),
  }
);

let ClassicEditor;
if (typeof window !== "undefined") {
  ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
}

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;
const MAX_IMAGES = 10;
const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

const PortfolioFormContent = ({ onSuccess }) => {
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
    status: "draft",
  });

  // imageItems: { id, url, file, isExisting, path }
  const [imageItems, setImageItems] = useState([]);
  const [dragging, setDragging] = useState(false);

  // reviews
  const [reviews, setReviews] = useState([]);

  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [characterCount, setCharacterCount] = useState({
    metatitle: 0,
    metadescription: 0,
    portfolioName: 0,
  });

  /* ---------- fetch when editing ---------- */
  useEffect(() => {
    if (!editId) return;
    setLoading(true);
    axios
      .get(`${BACKEND}/api/portfolio/getportfolio/${editId}`)
      .then(({ data }) => {
        const p = data.data;

        setForm({
          portfolioName: p.portfolioName || "",
          portfolioDate: p.portfolioDate
            ? new Date(p.portfolioDate).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          portfolioDetail: p.portfolioDetail || "",
          portfolioLink: p.portfolioLink || "",
          portfolioTags: p.portfolioTags || "",
          metatitle: p.metatitle || "",
          metadescription: p.metadescription || "",
          metatag: p.metatag || "",
          featured: p.featured || false,
          status: p.status || "draft",
        });

        // build image items
        let imgs = [];
        if (Array.isArray(p.portfolioImgs) && p.portfolioImgs.length) {
          imgs = p.portfolioImgs;
        } else if (p.portfolioImg) {
          imgs = [p.portfolioImg];
        }
        setImageItems(
          imgs.map((img) => ({
            id: uid(),
            url: img.startsWith("http") ? img : `${BACKEND}${img}`,
            file: null,
            isExisting: true,
            path: img,
          }))
        );

        // populate reviews
        const rvs = Array.isArray(p.reviews) ? p.reviews : [];
        setReviews(
          rvs.map((r) => ({
            id: uid(),
            clientName: r.clientName || "",
            clientRole: r.clientRole || "",
            reviewText: r.reviewText || "",
            rating: r.rating || 5,
            clientImg: r.clientImg || "",
            file: null,
            previewUrl: r.clientImg
              ? r.clientImg.startsWith("http")
                ? r.clientImg
                : `${BACKEND}${r.clientImg}`
              : "",
            isExisting: !!r.clientImg,
          }))
        );
      })
      .catch((err) => {
        toast.error("❌ Failed to fetch portfolio data");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [editId]);

  useEffect(() => {
    setCharacterCount({
      metatitle: form.metatitle.length,
      metadescription: form.metadescription.length,
      portfolioName: form.portfolioName.length,
    });
  }, [form.metatitle, form.metadescription, form.portfolioName]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------- image handling ---------- */
  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    const invalid = files.find((f) => !f.type.startsWith("image/"));
    if (invalid) {
      toast.error("❌ Please select valid image files only");
      return;
    }
    const tooBig = files.find((f) => f.size > 5 * 1024 * 1024);
    if (tooBig) {
      toast.error("❌ Each image must be under 5MB");
      return;
    }

    setImageItems((prev) => {
      const room = MAX_IMAGES - prev.length;
      if (room <= 0) {
        toast.error(`❌ Maximum ${MAX_IMAGES} images allowed`);
        return prev;
      }
      const accepted = files.slice(0, room);
      if (files.length > room) {
        toast.warn(`Only ${room} more image(s) could be added`);
      }
      const newItems = accepted.map((file) => ({
        id: uid(),
        url: URL.createObjectURL(file),
        file,
        isExisting: false,
        path: null,
      }));
      toast.success(`🖼️ ${accepted.length} image(s) added`);
      return [...prev, ...newItems];
    });
  };

  const handleImageInput = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeImage = (id) => {
    setImageItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item && !item.isExisting) URL.revokeObjectURL(item.url);
      return prev.filter((i) => i.id !== id);
    });
    toast.info("🗑️ Image removed");
  };

  const moveImage = (id, dir) => {
    setImageItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx < 0) return prev;
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  /* ---------- review handlers ---------- */
  const addReview = () => {
    setReviews((prev) => [
      ...prev,
      {
        id: uid(),
        clientName: "",
        clientRole: "",
        reviewText: "",
        rating: 5,
        clientImg: "",
        file: null,
        previewUrl: "",
        isExisting: false,
      },
    ]);
    toast.success("✍️ Review added");
  };

  const removeReview = (id) => {
    setReviews((prev) => {
      const item = prev.find((r) => r.id === id);
      if (item?.file) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((r) => r.id !== id);
    });
    toast.info("🗑️ Review removed");
  };

  const updateReview = (id, key, value) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r))
    );
  };

  const handleReviewImage = (id, file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("❌ Please select a valid image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("❌ Image must be under 5MB");
      return;
    }
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        if (r.file) URL.revokeObjectURL(r.previewUrl);
        return {
          ...r,
          file,
          previewUrl: URL.createObjectURL(file),
          clientImg: "",
          isExisting: false,
        };
      })
    );
    toast.success("🖼️ Client image added");
  };

  const removeReviewImage = (id) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        if (r.file) URL.revokeObjectURL(r.previewUrl);
        return {
          ...r,
          file: null,
          previewUrl: "",
          clientImg: "",
          isExisting: false,
        };
      })
    );
  };

  const handleEditorChange = (event, editor) => {
    setForm((prev) => ({ ...prev, portfolioDetail: editor.getData() }));
  };

  /* ---------- validate ---------- */
  const validateForm = () => {
    if (!form.portfolioName.trim()) {
      toast.error("❌ Please enter a portfolio name");
      return false;
    }
    if (!form.portfolioDetail.trim()) {
      toast.error("❌ Please add portfolio details");
      return false;
    }
    if (imageItems.length === 0) {
      toast.error("❌ Please add at least one portfolio image");
      return false;
    }
    // validate reviews that have content but missing required fields
    for (let i = 0; i < reviews.length; i++) {
      const r = reviews[i];
      if (!r.clientName.trim()) {
        toast.error(`❌ Review #${i + 1}: Client name is required`);
        setActiveTab("reviews");
        return false;
      }
      if (!r.reviewText.trim()) {
        toast.error(`❌ Review #${i + 1}: Review text is required`);
        setActiveTab("reviews");
        return false;
      }
    }
    return true;
  };

  /* ---------- submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });

      // existing portfolio images kept
      const existingPaths = imageItems
        .filter((i) => i.isExisting)
        .map((i) => i.path);
      formData.append("existingImages", JSON.stringify(existingPaths));

      // new portfolio files
      imageItems
        .filter((i) => i.file)
        .forEach((i) => formData.append("portfolioImgs", i.file));

      // reviews JSON + new review images
      const reviewsPayload = reviews.map((r) => ({
        id: r.id,
        clientName: r.clientName,
        clientRole: r.clientRole,
        reviewText: r.reviewText,
        rating: r.rating,
        clientImg: r.isExisting ? r.clientImg : "",
      }));
      formData.append("reviews", JSON.stringify(reviewsPayload));

      reviews.forEach((r) => {
        if (r.file) formData.append(`review_${r.id}`, r.file);
      });

      if (editId) {
        await axios.put(
          `${BACKEND}/api/portfolio/updateportfolio/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("🎉 Portfolio updated successfully!");
      } else {
        await axios.post(`${BACKEND}/api/portfolio/addportfolio`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("🚀 Portfolio added successfully!");

        // reset
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
          status: "draft",
        });
        imageItems.forEach(
          (i) => !i.isExisting && URL.revokeObjectURL(i.url)
        );
        setImageItems([]);
        reviews.forEach(
          (r) => r.file && URL.revokeObjectURL(r.previewUrl)
        );
        setReviews([]);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "❌ Failed to save portfolio!"
      );
    } finally {
      setLoading(false);
    }
  };

  const editorConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "codeBlock",
        "|",
        "outdent",
        "indent",
        "|",
        "undo",
        "redo",
        "fontColor",
        "fontBackgroundColor",
        "fontSize",
        "fontFamily",
        "alignment",
        "highlight",
        "specialCharacters",
        "horizontalLine",
      ],
      shouldNotGroupWhenFull: false,
    },
    placeholder: "Describe your portfolio project in detail...",
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
      ],
    },
  };

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-blue-50/30 !py-8">
        <div className="!max-w-6xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
          {/* Header */}
          <div className="!mb-8">
            <div className="!flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between">
              <div>
                <h1 className="!text-4xl !font-bold !mb-3 !bg-gradient-to-r from-blue-600 to-purple-600 !bg-clip-text !text-transparent">
                  {editId ? "Edit Portfolio Project" : "Add New Portfolio"}
                </h1>
                <p className="!text-gray-600 text-lg">
                  {editId
                    ? "Update and refine your portfolio project details"
                    : "Showcase your amazing work with a stunning portfolio entry"}
                </p>
              </div>
              <div className="!flex !items-center !space-x-3 !mt-4 lg:!mt-0">
                <span
                  className={`!px-4 !py-2 !rounded-full !text-sm !font-semibold ${
                    editId
                      ? "!bg-gradient-to-r from-purple-500 to-purple-600 !text-white !shadow-lg"
                      : "!bg-gradient-to-r from-green-500 to-emerald-600 !text-white !shadow-lg"
                  }`}
                >
                  {editId ? "✏️ Edit Mode" : "✨ Create Mode"}
                </span>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="!bg-white !rounded-3xl !shadow-2xl !overflow-hidden !border !border-gray-100">
            {/* Tabs */}
            <div className="!border-b !border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50/50">
              <nav className="!flex overflow-x-auto">
                {[
                  {
                    id: "basic",
                    label: "Basic Info",
                    icon: FiFolderPlus,
                    color: "blue",
                  },
                  {
                    id: "content",
                    label: "Content",
                    icon: FiCode,
                    color: "purple",
                  },
                  {
                    id: "reviews",
                    label: "Reviews",
                    icon: FiStar,
                    color: "yellow",
                  },
                  {
                    id: "seo",
                    label: "SEO Settings",
                    icon: FiGlobe,
                    color: "green",
                  },
                  {
                    id: "preview",
                    label: "Preview",
                    icon: FiEye,
                    color: "indigo",
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`!flex !items-center !px-6 sm:!px-8 !py-5 !text-sm !font-semibold !border-b-2 !transition-all !duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? `!border-${tab.color}-600 text-${tab.color}-700 !bg-white !shadow-sm`
                        : "!border-transparent !text-gray-500 hover:!text-gray-700 hover:!bg-white/50"
                    }`}
                  >
                    <tab.icon
                      className={`!w-5 !h-5 !mr-3 text-${tab.color}-500`}
                    />
                    {tab.label}
                    {tab.id === "reviews" && reviews.length > 0 && (
                      <span className="!ml-2 !bg-yellow-100 !text-yellow-700 !text-xs !font-bold !rounded-full !px-2 !py-0.5">
                        {reviews.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <form
              onSubmit={handleSubmit}
              className="!p-8"
              encType="multipart/form-data"
            >
              {/* ================= BASIC ================= */}
              {activeTab === "basic" && (
                <div className="!space-y-8">
                  <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-8">
                    <div>
                      <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiAward className="!w-5 !h-5 !mr-2 !text-blue-500" />
                        Project Name{" "}
                        <span className="!text-red-500 !ml-1">*</span>
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
                        <span
                          className={`!text-xs !font-medium ${
                            characterCount.portfolioName > 60
                              ? "!text-red-600"
                              : "!text-green-600"
                          }`}
                        >
                          {characterCount.portfolioName}/60 characters
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                        <FiCalendar className="!w-5 !h-5 !mr-2 !text-orange-500" />
                        Project Date{" "}
                        <span className="!text-red-500 !ml-1">*</span>
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
                        placeholder="web development, react, design..."
                        className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-purple-500 focus:!ring-4 focus:!ring-purple-500/20 !transition-all !duration-200"
                      />
                    </div>
                  </div>

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
                          <div
                            className={`!w-14 !h-7 !rounded-full !transition-colors ${
                              form.featured ? "!bg-yellow-500" : "!bg-gray-300"
                            }`}
                          ></div>
                          <div
                            className={`!absolute !top-1 !left-1 !w-5 !h-5 !rounded-full !bg-white !transition-transform ${
                              form.featured ? "transform translate-x-7" : ""
                            }`}
                          ></div>
                        </div>
                        <div className="!flex !items-center !space-x-3">
                          <FiZap className="!w-6 !h-6 !text-yellow-600" />
                          <div>
                            <span className="!font-bold !text-yellow-800 !text-lg">
                              Feature this Project
                            </span>
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

                  {/* ============ MULTI IMAGE UPLOADER ============ */}
                  <div>
                    <div className="!flex !items-center !justify-between !mb-3">
                      <label className="!text-sm !font-semibold !text-gray-700 !flex !items-center">
                        <FiImage className="!w-5 !h-5 !mr-2 !text-pink-500" />
                        Portfolio Images{" "}
                        <span className="!text-red-500 !ml-1">*</span>
                      </label>
                      <span className="!text-xs !font-medium !text-gray-500">
                        {imageItems.length}/{MAX_IMAGES} images
                      </span>
                    </div>

                    <div
                      onClick={() =>
                        document.getElementById("portfolioImages").click()
                      }
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleDrop}
                      className={`!border-3 !border-dashed !rounded-2xl !p-8 !text-center !cursor-pointer !transition-all !duration-200 !bg-gradient-to-br from-gray-50 to-blue-50/50 ${
                        dragging
                          ? "!border-blue-500 !bg-blue-50"
                          : "!border-gray-300 hover:!border-blue-400"
                      }`}
                    >
                      <div className="!p-4 !bg-white !rounded-2xl !shadow-md !inline-block">
                        <FiUpload className="!w-10 !h-10 !text-gray-400" />
                      </div>
                      <p className="!text-gray-700 !font-bold !text-lg !mt-4">
                        Click or drag & drop images here
                      </p>
                      <p className="!text-sm !text-gray-500 !mt-2">
                        PNG, JPG, JPEG, WEBP up to 5MB each • Max {MAX_IMAGES}{" "}
                        images • Recommended 1200x800px
                      </p>
                      <button
                        type="button"
                        className="!mt-5 !bg-gradient-to-r from-blue-600 to-purple-600 !text-white !px-6 !py-3 !rounded-xl hover:!from-blue-700 hover:!to-purple-700 !transition-all !font-semibold !shadow-lg"
                      >
                        Choose Images
                      </button>
                    </div>

                    <input
                      type="file"
                      id="portfolioImages"
                      accept="image/*"
                      multiple
                      onChange={handleImageInput}
                      className="hidden"
                    />

                    {imageItems.length > 0 && (
                      <div className="!grid !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-4 !gap-4 !mt-6">
                        {imageItems.map((item, idx) => (
                          <div
                            key={item.id}
                            className="!relative !group !rounded-2xl !overflow-hidden !border-2 !border-gray-200 !shadow-sm hover:!shadow-lg !transition-all"
                          >
                            <img
                              src={item.url}
                              alt={`preview ${idx + 1}`}
                              className="!w-full !h-40 !object-cover"
                            />

                            <span className="!absolute !top-2 !left-2 !bg-black/60 !text-white !text-xs !font-bold !px-2 !py-1 !rounded-full">
                              {idx + 1}
                            </span>

                            {idx === 0 && (
                              <span className="!absolute !top-2 !right-2 !bg-blue-600 !text-white !text-[10px] !font-bold !px-2 !py-1 !rounded-full">
                                MAIN
                              </span>
                            )}

                            <div className="!absolute !inset-0 !bg-black/0 group-hover:!bg-black/45 !transition-all !flex !items-center !justify-center !gap-2 !opacity-0 group-hover:!opacity-100">
                              <button
                                type="button"
                                onClick={() => moveImage(item.id, -1)}
                                disabled={idx === 0}
                                title="Move left"
                                className="!bg-white !text-gray-700 !rounded-lg !p-2 hover:!bg-gray-100 disabled:!opacity-40 !shadow"
                              >
                                ←
                              </button>
                              <button
                                type="button"
                                onClick={() => moveImage(item.id, 1)}
                                disabled={idx === imageItems.length - 1}
                                title="Move right"
                                className="!bg-white !text-gray-700 !rounded-lg !p-2 hover:!bg-gray-100 disabled:!opacity-40 !shadow"
                              >
                                →
                              </button>
                              <button
                                type="button"
                                onClick={() => removeImage(item.id)}
                                title="Remove"
                                className="!bg-white !text-red-600 !rounded-lg !p-2 hover:!bg-red-50 !shadow"
                              >
                                <FiX className="!w-4 !h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="!text-xs !text-gray-500 !mt-3">
                      First image is used as the cover. Drag order with ← →
                      buttons.
                    </p>
                  </div>
                </div>
              )}

              {/* ================= CONTENT ================= */}
              {activeTab === "content" && (
                <div className="!space-y-8">
                  <div className="!bg-gradient-to-r from-purple-50 to-indigo-50 !rounded-2xl !p-8 !border !border-purple-200 !shadow-sm">
                    <div className="!flex !items-start !space-x-6">
                      <div className="!p-4 !bg-purple-100 !rounded-2xl !shadow-sm">
                        <FiCode className="!w-8 !h-8 !text-purple-600" />
                      </div>
                      <div>
                        <h3 className="!font-bold !text-purple-800 !text-xl">
                          Project Details
                        </h3>
                        <p className="!text-purple-600 !mt-2 !text-lg">
                          Describe your project in detail. Include technologies
                          used, challenges faced, and solutions implemented.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="!text-sm !font-semibold !text-gray-700 !mb-3 !flex !items-center">
                      <FiFileText className="!w-5 !h-5 !mr-2 !text-purple-500" />
                      Project Description{" "}
                      <span className="!text-red-500 !ml-1">*</span>
                    </label>
                    {typeof window !== "undefined" && ClassicEditor && (
                      <div className="!border-2 !border-gray-200 !rounded-2xl !overflow-hidden !shadow-sm">
                        <CKEditor
                          editor={ClassicEditor}
                          data={form.portfolioDetail}
                          onChange={handleEditorChange}
                          config={editorConfig}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ================= REVIEWS ================= */}
              {activeTab === "reviews" && (
                <div className="!space-y-8">
                  {/* header */}
                  <div className="!bg-gradient-to-r from-yellow-50 to-amber-50 !rounded-2xl !p-8 !border !border-yellow-200 !shadow-sm">
                    <div className="!flex !items-start !space-x-6">
                      <div className="!p-4 !bg-yellow-100 !rounded-2xl !shadow-sm">
                        <FiStar className="!w-8 !h-8 !text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="!font-bold !text-yellow-800 !text-xl">
                          Client Reviews
                        </h3>
                        <p className="!text-yellow-700 !mt-2 !text-lg">
                          Add testimonials from happy clients. These will be
                          shown on the project detail page.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* add button */}
                  <button
                    type="button"
                    onClick={addReview}
                    className="!w-full !flex !items-center !justify-center !gap-3 !py-5 !border-2 !border-dashed !border-yellow-400 !rounded-2xl !text-yellow-700 !font-bold hover:!bg-yellow-50 !transition-all"
                  >
                    <FiPlusCircle size={20} />
                    Add Client Review
                  </button>

                  {/* list */}
                  {reviews.length === 0 ? (
                    <div className="!text-center !py-16 !text-gray-400">
                      <FiStar
                        size={48}
                        className="!mx-auto !mb-4 !opacity-40"
                      />
                      <p className="!font-medium">
                        No reviews yet. Add your first one 👆
                      </p>
                    </div>
                  ) : (
                    <div className="!space-y-6">
                      {reviews.map((r, idx) => (
                        <div
                          key={r.id}
                          className="!bg-white !border-2 !border-gray-200 !rounded-2xl !p-6 !shadow-sm hover:!shadow-md !transition-all"
                        >
                          {/* top row */}
                          <div className="!flex !items-center !justify-between !mb-5">
                            <div className="!flex !items-center !gap-3">
                              <div className="!w-10 !h-10 !rounded-xl !bg-yellow-100 !flex !items-center !justify-center !font-black !text-yellow-700">
                                {idx + 1}
                              </div>
                              <span className="!font-bold !text-gray-700">
                                Review #{idx + 1}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeReview(r.id)}
                              className="!flex !items-center !gap-2 !px-3 !py-2 !bg-red-50 !text-red-600 !rounded-lg hover:!bg-red-100 !transition-colors !text-sm !font-medium"
                            >
                              <FiX size={14} /> Remove
                            </button>
                          </div>

                          <div className="!grid !grid-cols-1 lg:!grid-cols-3 !gap-6">
                            {/* LEFT: client image */}
                            <div>
                              <label className="!text-xs !font-bold !text-gray-500 !uppercase !tracking-wider !mb-3 !block">
                                Client Image
                              </label>
                              {r.previewUrl ? (
                                <div className="!relative !group">
                                  <img
                                    src={r.previewUrl}
                                    alt={r.clientName || "client"}
                                    className="!w-full !aspect-square !object-cover !rounded-2xl !border-2 !border-gray-200"
                                  />
                                  <div className="!absolute !inset-0 !bg-black/0 group-hover:!bg-black/40 !transition-all !rounded-2xl !flex !items-center !justify-center !opacity-0 group-hover:!opacity-100 !gap-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        document
                                          .getElementById(
                                            `reviewImg_${r.id}`
                                          )
                                          .click()
                                      }
                                      className="!bg-white !text-blue-600 !rounded-xl !p-3 hover:!bg-blue-50 !shadow-lg"
                                    >
                                      <FiUpload size={18} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => removeReviewImage(r.id)}
                                      className="!bg-white !text-red-600 !rounded-xl !p-3 hover:!bg-red-50 !shadow-lg"
                                    >
                                      <FiX size={18} />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    document
                                      .getElementById(`reviewImg_${r.id}`)
                                      .click()
                                  }
                                  className="!w-full !aspect-square !border-2 !border-dashed !border-gray-300 !rounded-2xl !flex !flex-col !items-center !justify-center !text-gray-400 hover:!border-yellow-400 hover:!text-yellow-600 hover:!bg-yellow-50/50 !transition-all"
                                >
                                  <FiUpload size={28} className="!mb-2" />
                                  <span className="!text-xs !font-semibold">
                                    Upload Photo
                                  </span>
                                </button>
                              )}

                              <input
                                type="file"
                                id={`reviewImg_${r.id}`}
                                accept="image/*"
                                onChange={(e) =>
                                  handleReviewImage(r.id, e.target.files[0])
                                }
                                className="hidden"
                              />
                            </div>

                            {/* RIGHT: fields */}
                            <div className="lg:!col-span-2 !space-y-5">
                              <div className="!grid !grid-cols-1 sm:!grid-cols-2 !gap-4">
                                <div>
                                  <label className="!text-xs !font-bold !text-gray-500 !uppercase !tracking-wider !mb-2 !block">
                                    Client Name *
                                  </label>
                                  <input
                                    type="text"
                                    value={r.clientName}
                                    onChange={(e) =>
                                      updateReview(
                                        r.id,
                                        "clientName",
                                        e.target.value
                                      )
                                    }
                                    placeholder="e.g. Sarah Johnson"
                                    className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-3 focus:!outline-none focus:!border-yellow-500 focus:!ring-4 focus:!ring-yellow-500/20 !transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="!text-xs !font-bold !text-gray-500 !uppercase !tracking-wider !mb-2 !block">
                                    Role / Company
                                  </label>
                                  <input
                                    type="text"
                                    value={r.clientRole}
                                    onChange={(e) =>
                                      updateReview(
                                        r.id,
                                        "clientRole",
                                        e.target.value
                                      )
                                    }
                                    placeholder="e.g. CEO, Acme Co."
                                    className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-3 focus:!outline-none focus:!border-yellow-500 focus:!ring-4 focus:!ring-yellow-500/20 !transition-all"
                                  />
                                </div>
                              </div>

                              {/* rating */}
                              <div>
                                <label className="!text-xs !font-bold !text-gray-500 !uppercase !tracking-wider !mb-2 !block">
                                  Rating
                                </label>
                                <div className="!flex !items-center !gap-2">
                                  {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                      key={n}
                                      type="button"
                                      onClick={() =>
                                        updateReview(r.id, "rating", n)
                                      }
                                      className="!transition-transform hover:!scale-125"
                                    >
                                      <FiStar
                                        size={26}
                                        className={
                                          n <= r.rating
                                            ? "!text-yellow-500 !fill-yellow-500"
                                            : "!text-gray-300"
                                        }
                                      />
                                    </button>
                                  ))}
                                  <span className="!ml-3 !text-sm !font-bold !text-gray-600">
                                    {r.rating} / 5
                                  </span>
                                </div>
                              </div>

                              {/* review text */}
                              <div>
                                <label className="!text-xs !font-bold !text-gray-500 !uppercase !tracking-wider !mb-2 !block">
                                  Review Text *
                                </label>
                                <textarea
                                  value={r.reviewText}
                                  onChange={(e) =>
                                    updateReview(
                                      r.id,
                                      "reviewText",
                                      e.target.value
                                    )
                                  }
                                  rows="4"
                                  placeholder="What did the client say about the work..."
                                  className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-3 focus:!outline-none focus:!border-yellow-500 focus:!ring-4 focus:!ring-yellow-500/20 !transition-all !resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ================= SEO ================= */}
              {activeTab === "seo" && (
                <div className="!space-y-8">
                  <div className="!bg-gradient-to-r from-green-50 to-emerald-50 !rounded-2xl !p-8 !border !border-green-200 !shadow-sm">
                    <div className="!flex !items-start !space-x-6">
                      <div className="!p-4 !bg-green-100 !rounded-2xl !shadow-sm">
                        <FiTrendingUp className="!w-8 !h-8 !text-green-600" />
                      </div>
                      <div>
                        <h3 className="!font-bold !text-green-800 !text-xl">
                          SEO Optimization
                        </h3>
                        <p className="!text-green-600 !mt-2 !text-lg">
                          Optimize your portfolio for search engines.
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
                      placeholder="Optimized title (50-60 characters recommended)"
                      className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-green-500 focus:!ring-4 focus:!ring-green-500/20 !transition-all !duration-200"
                    />
                    <div className="!flex !justify-between !items-center !mt-3">
                      <p className="!text-xs !text-gray-500">
                        Appears as the title in search engine results
                      </p>
                      <span
                        className={`!text-sm !font-semibold ${
                          characterCount.metatitle > 60
                            ? "!text-red-600"
                            : characterCount.metatitle >= 50
                            ? "!text-green-600"
                            : "!text-yellow-600"
                        }`}
                      >
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
                      placeholder="Compelling description (150-160 characters recommended)"
                      className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-green-500 focus:!ring-4 focus:!ring-green-500/20 !transition-all !duration-200 !resize-none"
                    />
                    <div className="!flex !justify-between !items-center !mt-3">
                      <p className="!text-xs !text-gray-500">
                        Appears as the description in search engine results
                      </p>
                      <span
                        className={`!text-sm !font-semibold ${
                          characterCount.metadescription > 160
                            ? "!text-red-600"
                            : characterCount.metadescription >= 150
                            ? "!text-green-600"
                            : "!text-yellow-600"
                        }`}
                      >
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
                      placeholder="web development, portfolio, react projects..."
                      className="!w-full !border-2 !border-gray-200 !rounded-xl !px-5 !py-4 focus:!outline-none focus:!border-purple-500 focus:!ring-4 focus:!ring-purple-500/20 !transition-all !duration-200"
                    />
                  </div>
                </div>
              )}

              {/* ================= PREVIEW ================= */}
              {activeTab === "preview" && (
                <div className="!space-y-8">
                  <div className="!bg-gradient-to-r from-indigo-50 to-blue-50 !rounded-2xl !p-8 !border !border-indigo-200 !shadow-sm">
                    <div className="!flex !items-start !space-x-6">
                      <div className="!p-4 !bg-indigo-100 !rounded-2xl !shadow-sm">
                        <FiEye className="!w-8 !h-8 !text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="!font-bold !text-indigo-800 !text-xl">
                          Project Preview
                        </h3>
                        <p className="!text-indigo-600 !mt-2 !text-lg">
                          See how your portfolio project will appear to
                          visitors.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="!border-2 !border-dashed !border-gray-300 !rounded-2xl !p-8 !bg-white !shadow-lg">
                    <div className="max-w-4xl mx-auto">
                      {imageItems.length > 0 && (
                        <div className="!relative !w-full !h-96 !rounded-2xl !overflow-hidden !mb-8 !shadow-xl">
                          <img
                            src={imageItems[0].url}
                            alt="Portfolio preview"
                            className="!w-full !h-full !object-cover"
                          />
                          {imageItems.length > 1 && (
                            <span className="!absolute !right-3 !top-3 !bg-black/60 !text-white !text-xs !font-bold !px-3 !py-1 !rounded-full">
                              +{imageItems.length - 1} more images
                            </span>
                          )}
                        </div>
                      )}

                      <h1 className="!text-4xl !font-bold !text-gray-900 !mb-4">
                        {form.portfolioName || "Your Amazing Project Name"}
                      </h1>

                      <div className="!flex !items-center !flex-wrap !gap-4 !text-gray-600 !mb-6 !text-lg">
                        <span className="!flex !items-center !font-medium">
                          <FiCalendar className="!w-5 !h-5 !mr-2" />
                          {form.portfolioDate ||
                            new Date().toISOString().split("T")[0]}
                        </span>
                        {form.portfolioLink && (
                          <a
                            href={form.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="!flex !items-center !text-blue-600 hover:!text-blue-700 !font-medium"
                          >
                            <FiExternalLink className="!w-5 !h-5 !mr-2" />
                            View Project
                          </a>
                        )}
                        {form.featured && (
                          <span className="!flex !items-center !bg-yellow-100 !text-yellow-800 !px-3 !py-1 !rounded-full !text-sm !font-semibold">
                            <FiZap className="!w-4 !h-4 !mr-1" />
                            Featured
                          </span>
                        )}
                      </div>

                      {form.portfolioTags && (
                        <div className="!flex !flex-wrap !gap-3 !mb-8">
                          {form.portfolioTags.split(",").map((tag, index) => (
                            <span
                              key={index}
                              className="!bg-gradient-to-r from-blue-100 to-indigo-100 !text-blue-800 !px-4 !py-2 !rounded-full !text-sm !font-semibold !shadow-sm"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <div
                        className="!prose !prose-lg !max-w-none !text-gray-700 !leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html:
                            form.portfolioDetail ||
                            `<p class="!text-gray-500 !italic !text-xl !text-center !py-12">Your project description will appear here.</p>`,
                        }}
                      />

                      {/* reviews preview */}
                      {reviews.length > 0 && (
                        <div className="!mt-16 !pt-10 !border-t !border-gray-200">
                          <h3 className="!text-2xl !font-bold !text-gray-900 !mb-6 !text-center">
                            Client Reviews ({reviews.length})
                          </h3>
                          <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-5">
                            {reviews.map((r, i) => (
                              <div
                                key={r.id}
                                className="!bg-gray-50 !rounded-2xl !p-5 !border !border-gray-100"
                              >
                                <div className="!flex !gap-0.5 !mb-3">
                                  {[1, 2, 3, 4, 5].map((n) => (
                                    <FiStar
                                      key={n}
                                      size={14}
                                      className={
                                        n <= r.rating
                                          ? "!text-yellow-500 !fill-yellow-500"
                                          : "!text-gray-300"
                                      }
                                    />
                                  ))}
                                </div>
                                <p className="!text-gray-600 !text-sm !mb-4 !leading-relaxed">
                                  "{r.reviewText || "Review text..."}"
                                </p>
                                <div className="!flex !items-center !gap-3">
                                  {r.previewUrl ? (
                                    <img
                                      src={r.previewUrl}
                                      alt={r.clientName}
                                      className="!w-10 !h-10 !rounded-full !object-cover"
                                    />
                                  ) : (
                                    <div className="!w-10 !h-10 !rounded-full !bg-yellow-100 !flex !items-center !justify-center !font-bold !text-yellow-700">
                                      {(r.clientName || "?")
                                        .charAt(0)
                                        .toUpperCase()}
                                    </div>
                                  )}
                                  <div>
                                    <div className="!font-bold !text-gray-900 !text-sm">
                                      {r.clientName || "Client Name"}
                                    </div>
                                    <div className="!text-xs !text-gray-500">
                                      {r.clientRole || "Role"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="!flex !flex-col sm:!flex-row !gap-4 !pt-8 !mt-8 !border-t !border-gray-200">
                <div className="!flex-1 !flex !flex-col sm:!flex-row !gap-4">
                  <button
                    type="submit"
                    value="draft"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, status: "draft" }))
                    }
                    disabled={loading}
                    className="!flex-1 !bg-gradient-to-r from-gray-600 to-gray-700 !text-white !font-bold !py-5 !px-8 !rounded-xl hover:!from-gray-700 hover:!to-gray-800 !transition-all !duration-200 disabled:!opacity-50 !flex !items-center !justify-center !shadow-xl"
                  >
                    <FiSave className="!w-6 !h-6 !mr-3" />
                    Save as Draft
                  </button>

                  <button
                    type="submit"
                    value="published"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, status: "published" }))
                    }
                    disabled={loading}
                    className="!flex-1 !bg-gradient-to-r from-blue-600 to-purple-600 !text-white !font-bold !py-5 !px-8 !rounded-xl hover:!from-blue-700 hover:!to-purple-700 !transition-all !duration-200 disabled:!opacity-50 !flex !items-center !justify-center !shadow-xl"
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