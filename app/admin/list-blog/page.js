"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiPlus,
  FiDownload,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiCalendar,
  FiTag,
  FiBarChart,
  FiFilter,
  FiChevronUp,
  FiChevronDown,
  FiX,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiFileText
} from "react-icons/fi";

export default function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'descending' });
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/getblog`);
        
        if (response.data && Array.isArray(response.data)) {
          setBlogs(response.data);
          extractCategories(response.data);
        } else {
          setBlogs([]);
          setError("Invalid data format received from server");
        }
      } catch (error) {
        console.error("Error fetching blogs", error);
        setError("Failed to load blogs. Please try again later.");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const extractCategories = (blogsData) => {
    const categories = new Set();
    blogsData.forEach(blog => {
      if (blog.blogCategory) {
        if (Array.isArray(blog.blogCategory)) {
          blog.blogCategory.forEach(cat => categories.add(cat));
        } else if (typeof blog.blogCategory === 'string') {
          blog.blogCategory.split(',').forEach(cat => categories.add(cat.trim()));
        }
      }
    });
    setAvailableCategories(Array.from(categories));
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const sortedAndFilteredBlogs = () => {
    let filteredBlogs = blogs;
    
    // Apply search filter
    if (searchTerm) {
      filteredBlogs = blogs.filter(blog => 
        blog.blogName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.blogDetail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.blogTags?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filteredBlogs = filteredBlogs.filter(blog => blog.status === statusFilter);
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filteredBlogs = filteredBlogs.filter(blog => {
        if (!blog.blogCategory) return false;
        const blogCategories = Array.isArray(blog.blogCategory) 
          ? blog.blogCategory 
          : blog.blogCategory.split(',').map(cat => cat.trim());
        return selectedCategories.some(cat => blogCategories.includes(cat));
      });
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filteredBlogs = [...filteredBlogs].sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'createdAt' || sortConfig.key === 'blogDate') {
          aValue = new Date(aValue || 0);
          bValue = new Date(bValue || 0);
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredBlogs;
  };

  const handleEdit = (blog) => {
    router.push(`/admin/add-blog?id=${blog._id}`); 
  };

//   const handleView = (blog) => {
//     window.open(`/blog/${blog.blogSlug}`, '_blank');
//   };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    try {
      const dataToExport = blogs.map(blog => ({
        'Blog Title': blog.blogName,
        'Description': blog.blogDetail?.replace(/<[^>]*>/g, '').substring(0, 100) + '...' || "No description",
        'Publish Date': new Date(blog.blogDate || blog.createdAt).toLocaleDateString(),
        'Status': blog.status || 'draft',
        'Categories': Array.isArray(blog.blogCategory) ? blog.blogCategory.join(', ') : blog.blogCategory,
        'Tags': blog.blogTags,
        'URL': `http://localhost:3000/blog/${blog.blogSlug}`
      }));
      
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Blogs");
      XLSX.writeFile(workbook, `blogs_export_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSelectedCategories([]);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: "bg-green-100 text-green-800", icon: FiCheckCircle },
      draft: { color: "bg-yellow-100 text-yellow-800", icon: FiClock },
      archived: { color: "bg-gray-100 text-gray-800", icon: FiFileText }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const displayedBlogs = sortedAndFilteredBlogs();
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter(blog => blog.status === 'published').length;
  const draftBlogs = blogs.filter(blog => blog.status === 'draft').length;

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-gray-50 to-blue-50/30 !py-8">
        <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
          {/* Header Section */}
          <div className="!mb-8">
            <div className="!flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between">
              <div>
                <h1 className="!text-3xl !font-bold !text-gray-900">Blog Management</h1>
                <p className="!text-gray-600 !mt-2">Manage and organize your blog content efficiently</p>
              </div>
              <div className="!flex !items-center !space-x-3 !mt-4 lg:!mt-0">
                <div className="!flex !items-center !space-x-2 !text-sm !text-gray-600">
                  <FiTrendingUp className="!w-4 !h-4 !text-green-500" />
                  <span>{totalBlogs} Total Blogs</span>
                  <span className="!mx-2">•</span>
                  <FiCheckCircle className="!w-4 !h-4 !text-blue-500" />
                  <span>{publishedBlogs} Published</span>
                  <span className="!mx-2">•</span>
                  <FiClock className="!w-4 !h-4 !text-orange-500" />
                  <span>{draftBlogs} Drafts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-6 !mb-8">
            <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-blue-100 !rounded-xl">
                  <FiFileText className="!w-6 !h-6 !text-blue-600" />
                </div>
                <div className="!ml-4">
                  <p className="!text-sm !font-medium !text-gray-600">Total Blogs</p>
                  <p className="!text-2xl !font-bold !text-gray-900">{totalBlogs}</p>
                </div>
              </div>
            </div>
            <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-green-100 !rounded-xl">
                  <FiCheckCircle className="!w-6 !h-6 !text-green-600" />
                </div>
                <div className="!ml-4">
                  <p className="!text-sm !font-medium !text-gray-600">Published</p>
                  <p className="!text-2xl !font-bold !text-gray-900">{publishedBlogs}</p>
                </div>
              </div>
            </div>
            <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100">
              <div className="flex items-center">
                <div className="!p-3 !bg-orange-100 !rounded-xl">
                  <FiClock className="!w-6 !h-6 !text-orange-600" />
                </div>
                <div className="!ml-4">
                  <p className="!text-sm !font-medium !text-gray-600">Drafts</p>
                  <p className="!text-2xl !font-bold !text-gray-900">{draftBlogs}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="!bg-white !rounded-3xl !shadow-2xl !overflow-hidden !border !border-gray-100">
            {/* Card Header */}
            <div className="!bg-gradient-to-r from-gray-50 to-blue-50/50 !px-8 !py-6 !border-b !border-gray-200">
              <div className="!flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between">
                <div className="!flex !items-center !space-x-4">
                  <div className="!p-2 !bg-white !rounded-xl !shadow-sm !border !border-gray-200">
                    <FiFileText className="!w-6 !h-6 !text-blue-600" />
                  </div>
                  <div>
                    <h2 className="!text-xl !font-semibold !text-gray-900">All Blog Posts</h2>
                    <p className="!text-gray-600 !text-sm">Manage your blog content and publications</p>
                  </div>
                </div>
                <div className="!flex !flex-col sm:!flex-row !gap-3 !mt-4 lg:!mt-0">
                  <Link href="/admin/add-blog">
                    <button className="!bg-gradient-to-r from-blue-600 to-indigo-700 !text-white !font-semibold !py-3 !px-6 !rounded-xl hover:!from-blue-700 hover:!to-indigo-800 !transition-all !duration-200 !flex !items-center !shadow-lg hover:!shadow-xl">
                      <FiPlus className="!w-5 !h-5 !mr-2" />
                      New Blog Post
                    </button>
                  </Link>
                  <button
                    onClick={handleExport}
                    disabled={isExporting || blogs.length === 0}
                    className={`!font-semibold !py-3 !px-6 !rounded-xl !transition-all !duration-200 !flex !items-center !shadow-lg hover:!shadow-xl ${
                      isExporting || blogs.length === 0 
                        ? '!bg-gray-200 !text-gray-500 !cursor-not-allowed' 
                        : '!bg-gradient-to-r from-green-600 to-emerald-700 !text-white hover:!from-green-700 hover:!to-emerald-800'
                    }`}
                  >
                    <FiDownload className="!w-5 !h-5 !mr-2" />
                    {isExporting ? "Exporting..." : "Export Excel"}
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="!p-8 !border-b !border-gray-200 !bg-white">
              <div className="!grid !grid-cols-1 lg:!grid-cols-4 !gap-6">
                {/* Search */}
                <div className="lg:!col-span-2">
                  <label className="!block !text-sm !font-semibold !text-gray-700 mb-2">Search Blogs</label>
                  <div className="relative">
                    <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                      <FiSearch className="!h-5 !w-5 !text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by title, content, or tags..."
                      className="!pl-10 !pr-4 !py-3 !w-full !border-2 !border-gray-200 !rounded-xl focus:!outline-none focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/20 !transition-all !duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="!block !text-sm !font-semibold !text-gray-700 !mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-3 focus:!outline-none focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/20 !transition-all !duration-200"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="!flex !items-end">
                  <button
                    onClick={clearFilters}
                    className="!w-full !bg-gray-100 !text-gray-700 !font-medium !py-3 !px-4 !rounded-xl hover:!bg-gray-200 !transition-all !duration-200 !flex !items-center !justify-center"
                  >
                    <FiX className="!w-4 !h-4 !mr-2" />
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Category Filters */}
              {availableCategories.length > 0 && (
                <div className="!mt-6">
                  <label className="!block !text-sm !font-semibold !text-gray-700 !mb-3">Categories</label>
                  <div className="!flex !flex-wrap !gap-2">
                    {availableCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => toggleCategory(category)}
                        className={`!inline-flex !items-center !px-3 !py-2 !rounded-lg !text-sm !font-medium !transition-all !duration-200 ${
                          selectedCategories.includes(category)
                            ? '!bg-blue-100 !text-blue-700 !border-2 !border-blue-200'
                            : '!bg-gray-100 !text-gray-700 !border-2 !border-gray-200 hover:!bg-gray-200'
                        }`}
                      >
                        <FiTag className="!w-3 !h-3 !mr-2" />
                        {category}
                        {selectedCategories.includes(category) && (
                          <FiX className="!w-3 !h-3 !ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="!p-8">
              {loading ? (
                <div className="!flex !flex-col !items-center !justify-center !py-12">
                  <div className="!animate-spin !rounded-full !h-12 !w-12 !border-b-2 !border-blue-600 !mb-4"></div>
                  <p className="!text-gray-600 !font-medium">Loading your blog posts...</p>
                  <p className="!text-gray-500 !text-sm !mt-1">Please wait while we fetch your content</p>
                </div>
              ) : error ? (
                <div className="!bg-red-50 !border-l-4 !border-red-500 !rounded-2xl !p-6 !mb-6">
                  <div className="!flex !items-center">
                    <div className="!flex-shrink-0">
                      <div className="!p-2 !bg-red-100 !rounded-lg">
                        <FiX className="!w-6 !h-6 !text-red-600" />
                      </div>
                    </div>
                    <div className="!ml-4">
                      <h3 className="!text-lg !font-medium !text-red-800">Error Loading Blogs</h3>
                      <p className="!text-red-700 !mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Results Summary */}
                  <div className="!flex !justify-between !items-center !mb-6">
                    <p className="!text-gray-600">
                      Showing <span className="!font-semibold !text-gray-900">{displayedBlogs.length}</span> of <span className="font-semibold text-gray-900">{totalBlogs}</span> blog posts
                    </p>
                    {(searchTerm || statusFilter !== "all" || selectedCategories.length > 0) && (
                      <button
                        onClick={clearFilters}
                        className="!text-sm !text-blue-600 hover:!text-blue-800 !font-medium !flex !items-center"
                      >
                        <FiX className="!w-4 !h-4 !mr-1" />
                        Clear all filters
                      </button>
                    )}
                  </div>

                  {displayedBlogs.length > 0 ? (
                    <div className="!space-y-4">
                      {displayedBlogs.map((blog) => (
                        <div
                          key={blog._id}
                          className="!bg-gradient-to-r from-gray-50 to-white !rounded-2xl !border-2 !border-gray-100 hover:!border-blue-200 !transition-all 1duration-300 !p-6 !group hover:!shadow-lg"
                        >
                          <div className="!flex !flex-col lg:!flex-row lg:!items-center !gap-6">
                            {/* Blog Image */}
                            <div className="!flex-shrink-0">
                              <div className="!relative">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.blogImg}`}
                                  alt={blog.blogName}
                                  className="!w-24 !h-24 !rounded-xl !object-cover !shadow-md"
                                  onError={(e) => {
                                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIGZpbGw9IiNGM0YzRjMiIHJ4PSIxMiIvPjxwYXRoIGQ9Ik00OCAzNkw1NCA0Mkw0MiA0Mkw0OCAzNloiIGZpbGw9IiNCREJEQkQiLz48cGF0aCBkPSJNMzYgMzJUNDIgMzZMMzAgMzZMMzYgMzJaIiBmaWxsPSIjQkRCREJEIi8+PHBhdGggZD0iTTYwIDMyTDY2IDM2TDU0IDM2TDYwIDMyWiIgZmlsbD0iI0JEQkRCRCIvPjxwYXRoIGQ9Ik01NCAyOEw2MCAzMkw0OCAzMkw1NCAyOFoiIGZpbGw9IiNCREJEQkQiLz48cGF0aCBkPSJNNDIgMjhMNDggMzJMMzYgMzJMNDIgMjhaIiBmaWxsPSIjQkRCREJEIi8+PHBhdGggZD0iTTQ4IDI0TDU0IDI4TDQyIDI4TDQ4IDI0WiIgZmlsbD0iI0JEQkRCRCIvPjwvc3ZnPg==";
                                  }}
                                />
                                <div className="!absolute -!top-1 -!right-1">
                                  {getStatusBadge(blog.status)}
                                </div>
                              </div>
                            </div>

                            {/* Blog Content */}
                            <div className="!flex-grow !min-w-0">
                              <div className="!flex !flex-col sm:!flex-row sm:!items-start sm:!justify-between !mb-3">
                                <h3 className="!text-lg !font-semibold !text-gray-900 !truncate !mb-2 sm:!mb-0">
                                  {blog.blogName}
                                </h3>
                                <div className="!flex !items-center !space-x-2 !text-sm !text-gray-500">
                                  <FiCalendar className="w-4 h-4" />
                                  <span>
                                    {new Date(blog.blogDate || blog.createdAt).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                              </div>

                              <p className="!text-gray-600 !text-sm !mb-3 !line-clamp-2">
                                {blog.blogDetail?.replace(/<[^>]*>/g, '').substring(0, 150)}...
                              </p>

                              {/* Categories and Tags */}
                              <div className="!flex !flex-wrap !items-center !gap-2">
                                {blog.blogCategory && (
                                  <div className="!flex !flex-wrap !gap-1">
                                    {(Array.isArray(blog.blogCategory) ? blog.blogCategory : blog.blogCategory.split(',')).map((category, index) => (
                                      <span key={index} className="!inline-flex !items-center !px-2 !py-1 !rounded-full !text-xs !font-medium !bg-blue-100 !text-blue-700">
                                        <FiTag className="!w-3 !h-3 !mr-1" />
                                        {category.trim()}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="!flex-shrink-0">
                              <div className="!flex !space-x-2">
                                {/* <button
                                  onClick={() => handleView(blog)}
                                  className="!p-2 !text-gray-500 hover:!text-blue-600 hover:!bg-blue-50 !rounded-xl !transition-all !duration-200"
                                  title="View Blog"
                                >
                                  <FiEye className="w-5 h-5" />
                                </button> */}
                                <button
                                  onClick={() => handleEdit(blog)}
                                  className="!p-2 !text-gray-500 hover:!text-green-600 hover:!bg-green-50 !rounded-xl !transition-all !duration-200"
                                  title="Edit Blog"
                                >
                                  <FiEdit className="!w-5 !h-5" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm({ id: blog._id, name: blog.blogName })}
                                  className="!p-2 !text-gray-500 hover:!text-red-600 hover:!bg-red-50 !rounded-xl !transition-all !duration-200"
                                  title="Delete Blog"
                                >
                                  <FiTrash2 className="!w-5 !h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="!text-center !py-12">
                      <div className="!max-w-md !mx-auto">
                        <div className="!p-4 !bg-gradient-to-br from-gray-50 to-blue-50 !rounded-2xl !inline-block !mb-4">
                          <FiFileText className="!w-12 !h-12 !text-gray-400" />
                        </div>
                        <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">No blog posts found</h3>
                        <p className="!text-gray-600 !mb-6">
                          {searchTerm || statusFilter !== "all" || selectedCategories.length > 0
                            ? "Try adjusting your search criteria or filters"
                            : "Get started by creating your first blog post"
                          }
                        </p>
                        <Link href="/admin/add-blogs">
                          <button className="!bg-gradient-to-r from-blue-600 to-indigo-700 !text-white !font-semibold !py-3 !px-6 !rounded-xl hover:!from-blue-700 hover:!to-indigo-800 !transition-all !duration-200 !flex !items-center !mx-auto !shadow-lg hover:!shadow-xl">
                            <FiPlus className="!w-5 !h-5 !mr-2" />
                            Create New Blog
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="!fixed !inset-0  !bg-opacity-50 !flex !items-center !justify-center !p-4 !z-50">
            <div className="!bg-white !rounded-3xl !shadow-2xl !max-w-md !w-full !mx-4">
              <div className="!p-8">
                <div className="!flex !items-center !mb-6">
                  <div className="!flex-shrink-0 !flex !items-center !justify-center !h-16 !w-16 !rounded-2xl !bg-red-100">
                    <FiTrash2 className="!h-8 !w-8 !text-red-600" />
                  </div>
                  <div className="!ml-6">
                    <h3 className="!text-xl !font-bold !text-gray-900">Delete Blog Post</h3>
                    <p className="!text-gray-600 !mt-1">
                      Are you sure you want to delete <strong>"{deleteConfirm.name}"</strong>? This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="!flex !justify-end !space-x-4">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="!px-6 !py-3 !text-gray-700 !bg-gray-100 !font-medium !rounded-xl hover:!bg-gray-200 !transition-all !duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm.id)}
                    className="!px-6 !py-3 !text-white !bg-red-600 !font-medium !rounded-xl hover:!bg-red-700 !transition-all !duration-200 !shadow-lg hover:!shadow-xl"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}