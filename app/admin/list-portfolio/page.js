"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import {
  FiEdit3,
  FiTrash2,
  FiEye,
  FiPlus,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiExternalLink,
  FiCalendar,
  FiTag,
  FiAward,
  FiZap,
  FiMoreVertical,
  FiDownload,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight
} from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";

export default function PortfolioList() {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isExporting, setIsExporting] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedPortfolios, setSelectedPortfolios] = useState(new Set());

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch all portfolios
  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/portfolio/getportfolio`);
      setPortfolios(res.data.data || []);
    } catch (err) {
      toast.error("❌ Failed to fetch portfolios");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Calculate pagination
  useEffect(() => {
    const filtered = portfolios.filter(portfolio =>
      portfolio.portfolioName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.portfolioTags?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPagesCount = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(totalPagesCount);

    // Reset to first page if current page exceeds total pages
    if (currentPage > totalPagesCount && totalPagesCount > 0) {
      setCurrentPage(1);
    }
  }, [portfolios, searchTerm, itemsPerPage, currentPage]);

  // Get current items for display
  const getCurrentItems = () => {
    const filtered = portfolios.filter(portfolio =>
      portfolio.portfolioName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.portfolioTags?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const handleEdit = (id) => {
    router.push(`/admin/add-portfolio?id=${id}`);
  };

  const exportToExcel = async () => {
    try {
      setIsExporting(true);
      const dataToExport = selectedPortfolios.size > 0
        ? portfolios.filter(portfolio => selectedPortfolios.has(portfolio._id))
        : portfolios;

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Portfolios");
      XLSX.writeFile(workbook, "portfolios.xlsx");
      toast.success("✅ Portfolios exported to Excel successfully");
    } catch (error) {
      toast.error("❌ Failed to export portfolios to Excel");
    } finally {
      setIsExporting(false);
    }
  };

  // Delete portfolio
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this portfolio? This action cannot be undone.")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/portfolio/${id}`);
      toast.success("✅ Portfolio deleted successfully");
      fetchPortfolios();
    } catch (err) {
      toast.error("❌ Failed to delete portfolio");
    }
  };

  // Toggle portfolio selection
  const toggleSelectPortfolio = (id) => {
    const newSelected = new Set(selectedPortfolios);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPortfolios(newSelected);
  };

  // Select all portfolios on current page
  const selectAllOnPage = () => {
    const currentItems = getCurrentItems();
    const currentPageIds = new Set(currentItems.map(item => item._id));

    if (selectedPortfolios.size === currentPageIds.size &&
      Array.from(currentPageIds).every(id => selectedPortfolios.has(id))) {
      // Deselect all on current page
      const newSelected = new Set(selectedPortfolios);
      currentPageIds.forEach(id => newSelected.delete(id));
      setSelectedPortfolios(newSelected);
    } else {
      // Select all on current page
      const newSelected = new Set(selectedPortfolios);
      currentPageIds.forEach(id => newSelected.add(id));
      setSelectedPortfolios(newSelected);
    }
  };

  // Select all portfolios across all pages
  const selectAllPortfolios = () => {
    const filtered = portfolios.filter(portfolio =>
      portfolio.portfolioName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.portfolioTags?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedPortfolios.size === filtered.length) {
      setSelectedPortfolios(new Set());
    } else {
      setSelectedPortfolios(new Set(filtered.map(portfolio => portfolio._id)));
    }
  };

  // Filter portfolios based on search term
  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.portfolioName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    portfolio.portfolioTags?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Pagination functions
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-blue-50/30 !py-8">
          <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
            <div className="!bg-white !rounded-3xl !shadow-xl !border !border-gray-100 !p-8">
              <div className="!animate-pulse">
                <div className="!h-8 !bg-gray-200 !rounded !w-1/4 !mb-8"></div>
                <div className="!grid !grid-cols-1 md:!grid-cols-2 xl:!grid-cols-3 !gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="!bg-gray-50 !rounded-2xl !p-6">
                      <div className="!h-48 !bg-gray-200 !rounded-xl !mb-4"></div>
                      <div className="!space-y-2">
                        <div className="!h-4 !bg-gray-200 !rounded !w-3/4"></div>
                        <div className="!h-3 !bg-gray-200 !rounded !w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const currentItems = getCurrentItems();
  const pageNumbers = getPageNumbers();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredPortfolios.length);

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-blue-50/30 !py-8">
        <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
          {/* Header Section */}
          <div className="!mb-8">
            <div className="!flex !flex-col lg:!flex-row !justify-between !items-start lg:!items-center !gap-6 !mb-6">
              <div>
                <h1 className="!text-4xl !font-bold  !mb-3 !bg-gradient-to-r from-blue-600 to-purple-600 !bg-clip-text !text-transparent">
                  Portfolio Management
                </h1>
                <p className="!text-gray-600 !text-lg">Manage and showcase your amazing projects</p>
              </div>
              <div className="!flex !flex-col sm:!flex-row !gap-4">
                <button onClick={exportToExcel} className="!flex !items-center !gap-3 !px-5 !py-3 !bg-white !text-gray-700 !rounded-xl !border !border-gray-200 hover:!bg-gray-50 !transition-all !shadow-sm">
                  <FiDownload size={18} />
                  Export
                </button>
                
               
                <button
                  onClick={fetchPortfolios}
                  className="!flex !items-center !gap-3 !px-5 !py-3 !bg-white !text-gray-700 !rounded-xl !border !border-gray-200 hover:!bg-gray-50 !transition-all !shadow-sm"
                >
                  <FiRefreshCw size={18} />
                  Refresh
                </button>
                <button className="!flex !items-center !gap-3 !px-5 !py-3 !bg-gradient-to-r from-blue-600 to-purple-600 !text-white !rounded-xl hover:!from-blue-700 hover:!to-purple-700 !transition-all !shadow-lg">
                  <FiPlus size={18} />
                  Add New Portfolio
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="!grid !grid-cols-1 md:!grid-cols-4 !gap-6 !mb-8">
              <div className="!bg-gradient-to-br from-blue-50 to-indigo-100 !rounded-2xl !p-6 !border !border-blue-100 !shadow-sm">
                <div className="!flex !items-center !justify-between">
                  <div>
                    <p className="!text-sm !font-semibold !text-blue-700">Total Projects</p>
                    <p className="!text-3xl !font-bold !text-gray-900 !mt-2">{portfolios.length}</p>
                  </div>
                  <div className="!p-3 !bg-white !rounded-2xl !shadow-sm">
                    <FiGrid className="!w-7 !h-7 !text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="!bg-gradient-to-br from-green-50 to-emerald-100 !rounded-2xl !p-6 !border !border-green-100 !shadow-sm">
                <div className="!flex !items-center !justify-between">
                  <div>
                    <p className="!text-sm !font-semibold !text-green-700">Featured</p>
                    <p className="!text-3xl !font-bold !text-gray-900 !mt-2">
                      {portfolios.filter(p => p.featured).length}
                    </p>
                  </div>
                  <div className="!p-3 !bg-white !rounded-2xl !shadow-sm">
                    <FiAward className="!w-7 !h-7 !text-green-600" />
                  </div>
                </div>
              </div>
              <div className="!bg-gradient-to-br from-purple-50 to-violet-100 !rounded-2xl !p-6 !border !border-purple-100 !shadow-sm">
                <div className="!flex !items-center !justify-between">
                  <div>
                    <p className="!text-sm !font-semibold !text-purple-700">This Month</p>
                    <p className="!text-3xl !font-bold !text-gray-900 !mt-2">
                      {portfolios.filter(p => {
                        const projectDate = new Date(p.portfolioDate);
                        const currentMonth = new Date().getMonth();
                        return projectDate.getMonth() === currentMonth;
                      }).length}
                    </p>
                  </div>
                  <div className="!p-3 !bg-white !rounded-2xl !shadow-sm">
                    <FiZap className="!w-7 !h-7 !text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="!bg-gradient-to-br from-orange-50 to-amber-100 !rounded-2xl !p-6 !border !border-orange-100 !shadow-sm">
                <div className="!flex !items-center !justify-between">
                  <div>
                    <p className="!text-sm !font-semibold !text-orange-700">Active</p>
                    <p className="!text-3xl !font-bold !text-gray-900 !mt-2">{portfolios.length}</p>
                  </div>
                  <div className="!p-3 !bg-white !rounded-2xl !shadow-sm">
                    <FiEye className="!w-7 !h-7 !text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Controls Section */}
          <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !p-6 !mb-6">
            <div className="!flex !flex-col lg:!flex-row !gap-6 !items-start lg:!items-center !justify-between">
              <div className="!flex !flex-col sm:!flex-row !gap-4 !w-full lg:!w-auto">
                <div className="!relative !flex-1 sm:!flex-none sm:!w-80">
                  <FiSearch className="!absolute !left-4 !top-1/2 !transform -translate-y-1/2 !text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search projects by name or tags..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page when searching
                    }}
                    className="!w-full !pl-12 !pr-4 !py-3.5 !border-2 !border-gray-200 !rounded-xl focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-all"
                  />
                </div>

                <div className="!flex !items-center !gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="!px-4 !py-3.5 !border-2 !border-gray-200 !rounded-xl focus:!ring-2 focus:!ring-blue-500 !bg-white"
                  >
                    <option value="all">All Projects</option>
                    <option value="featured">Featured</option>
                    <option value="recent">Recent</option>
                  </select>
                  <button className="!flex !items-center !gap-2 !px-4 !py-3.5 !border-2 !border-gray-200 !rounded-xl hover:!bg-gray-50 !transition-colors">
                    <FiFilter size={18} />
                    Filters
                  </button>
                </div>
              </div>

              <div className="!flex !items-center !gap-3">
                {/* View Mode Toggle */}
                <div className="!flex !bg-gray-100 !rounded-xl !p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`!p-2 !rounded-lg !transition-all ${viewMode === "!grid" ? "!bg-white !shadow-sm !text-blue-600" : "!text-gray-500"
                      }`}
                  >
                    <FiGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`!p-2 !rounded-lg !transition-all ${viewMode === "list" ? "!bg-white !shadow-sm !text-blue-600" : "!text-gray-500"
                      }`}
                  >
                    <FiList size={18} />
                  </button>
                </div>

                {/* Items Per Page Selector */}
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="!px-3 !py-2.5 !border-2 !border-gray-200 !rounded-xl focus:!ring-2 focus:!ring-blue-500 bg-white !text-sm"
                >
                  <option value={6}>6 per page</option>
                  <option value={9}>9 per page</option>
                  <option value={12}>12 per page</option>
                  <option value={24}>24 per page</option>
                </select>

                {selectedPortfolios.size > 0 && (
                  <div className="!flex !items-center !gap-3">
                    <span className="!text-sm !font-medium !text-blue-600">
                      {selectedPortfolios.size} selected
                    </span>
                    <button className="!flex !items-center !gap-2 !px-4 !py-2.5 !bg-blue-50 !text-blue-600 !rounded-lg hover:!bg-blue-100 !transition-colors">
                      <FiDownload size={16} />
                      Export Selected
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedPortfolios.size > 0 && (
            <div className="!bg-blue-50 !border !border-blue-200 !rounded-2xl !p-4 !mb-6">
              <div className="!flex !items-center !justify-between">
                <div className="!flex !items-center !gap-3">
                  <div className="!w-8 !h-8 !bg-blue-100 !rounded-lg !flex !items-center !justify-center">
                    <FiGrid className="!h-4 !w-4 !text-blue-600" />
                  </div>
                  <div>
                    <p className="!font-medium !text-blue-900">
                      {selectedPortfolios.size} project{selectedPortfolios.size > 1 ? 's' : ''} selected
                    </p>
                    <p className="!text-sm !text-blue-700">Perform bulk actions on selected projects</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="!px-4 py-2 !text-blue-600 hover:!bg-blue-100 !rounded-lg !transition-colors">
                    Edit Selected
                  </button>
                  <button className="!px-4 !py-2 !text-red-600 hover:!bg-red-100 !rounded-lg !transition-colors">
                    Delete Selected
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="!flex !justify-between !items-center !mb-6">
            <p className="!text-gray-600 !text-sm">
              Showing <span className="!font-semibold">{startIndex + 1}-{endIndex}</span> of{" "}
              <span className="!font-semibold">{filteredPortfolios.length}</span> projects
            </p>
            <div className="!flex !items-center !gap-2 !text-sm !text-gray-500">
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>

          {/* Portfolio Content */}
          {currentItems.length === 0 ? (
            <div className="!bg-white !rounded-3xl !shadow-xl !border !border-gray-100 !p-16 !text-center">
              <div className="!max-w-md !mx-auto">
                <div className="!w-32 !h-32 !bg-gradient-to-br from-gray-100 to-gray-200 !rounded-full !flex !items-center !justify-center !mx-auto !mb-8">
                  <FiGrid className="!h-16 !w-16 !text-gray-400" />
                </div>
                <h3 className="!text-2xl !font-bold !text-gray-900 !mb-3">No projects found</h3>
                <p className="!text-gray-600 !text-lg !mb-8">
                  {searchTerm ? "No projects match your search criteria. Try different keywords." : "Start building your portfolio by creating your first project."}
                </p>
                <div className="!flex flex-col sm:!flex-row !gap-4 !justify-center">
                  <button className="!bg-gradient-to-r from-blue-600 to-purple-600 !text-white !px-8 !py-4 !rounded-xl hover:!from-blue-700 hover:!to-purple-700 !transition-all !shadow-lg !font-semibold">
                    Create Your First Project
                  </button>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="!px-8 !py-4 !border-2 !border-gray-300 !text-gray-700 !rounded-xl hover:!border-gray-400 !transition-all !font-semibold"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div className="!grid !grid-cols-1 md:!grid-cols-2 xl:!grid-cols-3 !gap-6 !mb-8">
              {currentItems.map((portfolio, index) => {
                const isSelected = selectedPortfolios.has(portfolio._id);

                return (
                  <div
                    key={portfolio._id}
                    className={`!bg-white !rounded-2xl !shadow-lg !border-2 ${isSelected ? '!border-blue-500 !ring-2 !ring-blue-100' : '!border-gray-100'
                      } !overflow-hidden hover:!shadow-xl !transition-all !duration-300 !transform hover:-translate-y-1`}
                  >
                    {/* Portfolio Image */}
                    <div className="!relative !group">
                      <img
                        src={portfolio.portfolioImg
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${portfolio.portfolioImg}`
                          : "/api/placeholder/80/80"}
                        alt={portfolio.portfolioName}
                        className="!w-full !h-48 !object-cover"
                      />
                      <div className="!absolute !inset-0 !bg-black !bg-opacity-0 group-hover:!bg-opacity-40 !transition-all !duration-200 !flex !items-center !justify-center !opacity-0 group-hover:!opacity-100">
                        <div className="!flex !space-x-2">
                          <button className="!p-2 !bg-white !text-blue-600 !rounded-lg hover:!bg-blue-50 !transition-colors">
                            <FiEye size={18} />
                          </button>
                          <button className="!p-2 !bg-white !text-green-600 !rounded-lg hover:!bg-green-50 !transition-colors">
                            <FiExternalLink size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Selection Checkbox */}
                      <div className="!absolute !top-3 !left-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectPortfolio(portfolio._id)}
                          className="!w-5 !h-5 !text-blue-600 !bg-white !border-gray-300 !rounded focus:!ring-blue-500"
                        />
                      </div>

                      {/* Featured Badge */}
                      {portfolio.featured && (
                        <div className="!absolute !top-3 !right-3">
                          <span className="!bg-yellow-500 !text-white !text-xs !font-bold !px-2 !py-1 !rounded-full !shadow-sm">
                            FEATURED
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Portfolio Details */}
                    <div className="!p-6">
                      <h3 className="!text-xl !font-bold !text-gray-900 !mb-2 !line-clamp-1">
                        {portfolio.portfolioName}
                      </h3>

                      <div className="!flex !items-center !text-gray-600 !text-sm !mb-3">
                        <FiCalendar className="!w-4 !h-4 !mr-2" />
                        {formatDate(portfolio.portfolioDate)}
                      </div>

                      {portfolio.portfolioTags && (
                        <div className="!flex !flex-wrap !gap-1 !mb-4">
                          {portfolio.portfolioTags.split(',').slice(0, 3).map((tag, index) => (
                            <span key={index} className="!bg-gray-100 !text-gray-700 !px-2 !py-1 !rounded-full !text-xs !font-medium">
                              {tag.trim()}
                            </span>
                          ))}
                          {portfolio.portfolioTags.split(',').length > 3 && (
                            <span className="!bg-gray-100 !text-gray-500 !px-2 !py-1 !rounded-full !text-xs !font-medium">
                              +{portfolio.portfolioTags.split(',').length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="!flex !items-center !justify-between !pt-4 !border-t !border-gray-100">
                        <div className="!flex !items-center !space-x-2">
                          <button
                            onClick={() => handleEdit(portfolio._id)}
                            className="!flex !items-center !gap-2 !px-3 !py-2 !bg-blue-50 !text-blue-600 !rounded-lg hover:!bg-blue-100 !transition-colors !text-sm !font-medium"
                          >
                            <FiEdit3 size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(portfolio._id)}
                            className="!flex !items-center !gap-2 !px-3 !py-2 !bg-red-50 !text-red-600 !rounded-lg hover:!!bg-red-100 !transition-colors !text-sm !font-medium"
                          >
                            <FiTrash2 size={14} />
                            Delete
                          </button>
                        </div>
                        <button className="!p-2 !text-gray-400 hover:!text-gray-600 !rounded-lg hover:!bg-gray-100 !transition-colors">
                          <FiMoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !overflow-hidden !mb-8">
              <div className="!overflow-x-auto">
                <table className="!w-full">
                  <thead className="!bg-gradient-to-r from-gray-50 to-blue-50/50">
                    <tr>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">
                        <input
                          type="checkbox"
                          checked={selectedPortfolios.size === currentItems.length && currentItems.length > 0}
                          onChange={selectAllOnPage}
                          className="!w-4 !h-4 !text-blue-600 !bg-white !border-gray-300 !rounded focus:!ring-blue-500"
                        />
                      </th>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Project</th>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Date</th>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Tags</th>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Status</th>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="!divide-y !divide-gray-100">
                    {currentItems.map((portfolio) => {
                      const isSelected = selectedPortfolios.has(portfolio._id);

                      return (
                        <tr key={portfolio._id} className="hover:!bg-gray-50 !transition-colors !group">
                          <td className="!px-6 !py-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectPortfolio(portfolio._id)}
                              className="!w-4 !h-4 !text-blue-600 !bg-white !border-gray-300 !rounded focus:!ring-blue-500"
                            />
                          </td>
                          <td className="!px-6 !py-4">
                            <div className="!flex !items-center !space-x-4">
                              <img
                                src={portfolio.portfolioImg
                                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${portfolio.portfolioImg}`
                                  : "/api/placeholder/80/80"}
                                alt={portfolio.portfolioName}
                                className="!w-12 !h-12 !object-cover !rounded-lg !shadow-sm"
                              />
                              <div>
                                <div className="!flex !items-center !space-x-2">
                                  <h4 className="!font-semibold !text-gray-900">{portfolio.portfolioName}</h4>
                                  {portfolio.featured && (
                                    <FiAward className="!w-4 !h-4 !text-yellow-500" />
                                  )}
                                </div>
                                {portfolio.portfolioLink && (
                                  <a
                                    href={portfolio.portfolioLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="!text-sm !text-blue-600 hover:!text-blue-700 !flex !items-center !gap-1"
                                  >
                                    <FiExternalLink size={12} />
                                    View Project
                                  </a>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="!px-6 !py-4">
                            <div className="!flex !items-center !text-sm !text-gray-600">
                              <FiCalendar className="!w-4 !h-4 !mr-2" />
                              {formatDate(portfolio.portfolioDate)}
                            </div>
                          </td>
                          <td className="!px-6 !py-4">
                            <div className="!flex !flex-wrap !gap-1 !max-w-xs">
                              {portfolio.portfolioTags?.split(',').slice(0, 2).map((tag, index) => (
                                <span key={index} className="!bg-gray-100 !text-gray-700 !px-2 !py-1 !rounded !text-xs">
                                  {tag.trim()}
                                </span>
                              ))}
                              {portfolio.portfolioTags?.split(',').length > 2 && (
                                <span className="!text-xs !text-gray-500">
                                  +{portfolio.portfolioTags.split(',').length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="!px-6 !py-4">
                            <span className={`!px-3 !py-1 !rounded-full !text-xs !font-medium ${portfolio.featured
                              ? '!bg-yellow-100 !text-yellow-800'
                              : '!bg-green-100 !text-green-800'
                              }`}>
                              {portfolio.featured ? 'Featured' : 'Active'}
                            </span>
                          </td>
                          <td className="!px-6 !py-4">
                            <div className="!flex !items-center !space-x-2">
                              <button
                                onClick={() => handleEdit(portfolio._id)}
                                className="!p-2 !text-blue-600 hover:!bg-blue-50 !rounded-lg !transition-colors"
                                title="Edit"
                              >
                                <FiEdit3 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(portfolio._id)}
                                className="!p-2 !text-red-600 hover:!bg-red-50 !rounded-lg !transition-colors"
                                title="Delete"
                              >
                                <FiTrash2 size={16} />
                              </button>
                              <button className="!p-2 !text-gray-400 hover:!text-gray-600 hover:!bg-gray-100 !rounded-lg !transition-colors">
                                <FiMoreVertical size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !p-6 !mb-8">
              <div className="!flex !flex-col sm:!flex-row !items-center !justify-between !gap-4">
                <div className="!text-sm !text-gray-600">
                  Showing <span className="!font-semibold !text-gray-900">{startIndex + 1}-{endIndex}</span> of{" "}
                  <span className="!font-semibold !text-gray-900">{filteredPortfolios.length}</span> projects
                </div>

                <div className="!flex !items-center !space-x-2">
                  {/* First Page Button */}
                  <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="!p-2 !rounded-lg !border !border-gray-300 disabled:!opacity-50 disabled:!cursor-not-allowed hover:!bg-gray-50 !transition-colors"
                    title="First page"
                  >
                    <FiChevronsLeft size={16} />
                  </button>

                  {/* Previous Page Button */}
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="!p-2 !rounded-lg !border !border-gray-300 disabled:!opacity-50 disabled:!cursor-not-allowed hover:!bg-gray-50 !transition-colors"
                    title="Previous page"
                  >
                    <FiChevronLeft size={16} />
                  </button>

                  {/* Page Numbers */}
                  <div className="!flex !items-center !space-x-1">
                    {pageNumbers.map((pageNumber, index) => (
                      <button
                        key={index}
                        onClick={() => typeof pageNumber === 'number' ? goToPage(pageNumber) : null}
                        className={`min-w-[40px] !h-10 !rounded-lg !border !text-sm !font-medium !transition-all ${pageNumber === currentPage
                          ? '!bg-blue-600 !text-white !border-blue-600 !shadow-sm'
                          : pageNumber === '...'
                            ? '!border-transparent !text-gray-500 !cursor-default'
                            : '!border-gray-300 !text-gray-700 hover:!bg-gray-50'
                          }`}
                        disabled={pageNumber === '...'}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>

                  {/* Next Page Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="!p-2 !rounded-lg !border !border-gray-300 disabled:!opacity-50 disabled:!cursor-not-allowed hover:!bg-gray-50 !transition-colors"
                    title="Next page"
                  >
                    <FiChevronRight size={16} />
                  </button>

                  {/* Last Page Button */}
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="!p-2 !rounded-lg !border !border-gray-300 disabled:!opacity-50 disabled:!cursor-not-allowed hover:!bg-gray-50 !transition-colors"
                    title="Last page"
                  >
                    <FiChevronsRight size={16} />
                  </button>
                </div>

                <div className="!flex !items-center !gap-2 !text-sm !text-gray-500">
                  <span>Page {currentPage} of {totalPages}</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Stats */}
          <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !p-6">
            <div className="!flex !flex-col sm:!flex-row !items-center !justify-between !text-sm !text-gray-600">
              <div>
                Total <span className="!font-semibold !text-gray-900">{portfolios.length}</span> projects in portfolio
              </div>
              <div className="!flex !items-center !gap-6 !mt-2 sm:!mt-0">
                <button className="!flex !items-center !gap-2 !text-gray-600 hover:!text-gray-800 !transition-colors">
                  <FiDownload size={16} />
                  Export All
                </button>
                <div className="!flex !items-center !gap-2 !text-green-600">
                  <div className="!w-2 !h-2 !bg-green-500 !rounded-full"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}