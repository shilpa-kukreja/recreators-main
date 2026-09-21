"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../components/AdminLayout";
import * as XLSX from "xlsx";
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronDown,
  FiImage,
  FiSliders,
  FiFilter,
  FiRefreshCw,
  FiFileText,
  FiLink,
  FiCalendar
} from "react-icons/fi";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [sortConfig, setSortConfig] = useState({ 
    key: 'createdAt', 
    direction: 'descending' 
  });
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/getcategory`);
      setCategories(res.data);
    
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error(error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) return;
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/removeCategory/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCategories.size === 0) {
      toast.warning("Please select categories to delete");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedCategories.size} categories? This action cannot be undone.`)) return;

    try {
      const deletePromises = Array.from(selectedCategories).map(id =>
        axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}`)
      );
      
      await Promise.all(deletePromises);
      toast.success(`${selectedCategories.size} categories deleted successfully`);
      setSelectedCategories(new Set());
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete categories");
      console.error(error);
    }
  };

  const handleEditRedirect = (category) => {
    router.push(`/admin/add-category?id=${category._id}`);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategories(new Set(filteredCategories.map(cat => cat._id)));
    } else {
      setSelectedCategories(new Set());
    }
  };

  const handleSelectCategory = (id) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCategories(newSelected);
  };

  const exportToExcel = () => {
    setIsExporting(true);
    try {
      const dataToExport = filteredCategories.map(cat => ({
        'Category Name': cat.name,
        'URL Slug': cat.slug,
        'Image URL': cat.img ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${cat.img}` : 'Not available',
        'Banner URL': cat.banner ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${cat.banner}` : 'Not available',
        'Description': cat.description || 'Not provided',
        'Created Date': cat.createdAt ? new Date(cat.createdAt).toLocaleDateString() : 'Unknown',
        'Last Updated': cat.updatedAt ? new Date(cat.updatedAt).toLocaleDateString() : 'Unknown'
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");
      
      XLSX.writeFile(workbook, `Categories_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast.success("Data exported to Excel successfully");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export data to Excel");
    } finally {
      setIsExporting(false);
    }
  };

  const sortedCategories = React.useMemo(() => {
    let sortableItems = [...categories];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
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
    return sortableItems;
  }, [categories, sortConfig]);

  const filteredCategories = sortedCategories.filter(cat =>
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const getDisplayedPages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const SortIcon = ({ sortKey }) => {
    if (sortConfig.key !== sortKey) {
      return <FiSliders className="!w-3 !h-3 !ml-1 !text-gray-400" />;
    }
    return sortConfig.direction === 'ascending' ? 
      <FiChevronUp className="!w-3 !h-3 !ml-1 !text-blue-600" /> : 
      <FiChevronDown className="!w-3 !h-3 !ml-1 !text-blue-600" />;
  };

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gray-50/30 !py-6">
        <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
          {/* Header Section */}
          <div className="!mb-8">
            <div className="!flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between">
              <div className="!mb-4 lg:!mb-0">
                <h1 className="!text-3xl !font-bold !text-gray-900">Category Management</h1>
                <p className="!text-gray-600 !mt-2">Manage and organize your product categories efficiently</p>
              </div>
              
              <div className="!flex !flex-col sm:!flex-row !gap-3">
                <button
                  onClick={exportToExcel}
                  disabled={isExporting || filteredCategories.length === 0}
                  className="!flex !items-center !justify-center !px-6 !py-3 !bg-gradient-to-r from-green-600 to-emerald-600 !text-white !rounded-xl !font-medium hover:!from-green-700 hover:!to-emerald-700 !transition-all !duration-200 !shadow-lg hover:!shadow-xl disabled:!opacity-50 disabled:!cursor-not-allowed"
                >
                  {isExporting ? (
                    <FiRefreshCw className="!w-4 !h-4 !mr-2 !animate-spin" />
                  ) : (
                    <FiDownload className="!w-4 !h-4 !mr-2" />
                  )}
                  {isExporting ? 'Exporting...' : 'Export Excel'}
                </button>
                
                <button
                  onClick={() => router.push("/admin/add-categories")}
                  className="!flex !items-center !justify-center !px-6 !py-3 !bg-gradient-to-r from-blue-600 to-indigo-600 !text-white !rounded-xl !font-medium hover:!from-blue-700 hover:!to-indigo-700 !transition-all !duration-200 !shadow-lg hover:!shadow-xl"
                >
                  <FiPlus className="!w-4 !h-4 !mr-2" />
                  Add Category
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6 !mb-8">
            <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-blue-100 !rounded-xl !mr-4">
                  <FiFileText className="!w-6 !h-6 !text-blue-600" />
                </div>
                <div>
                  <p className="!text-sm !font-medium !text-gray-600">Total Categories</p>
                  <p className="!text-2xl !font-bold !text-gray-900">{categories.length}</p>
                </div>
              </div>
            </div>
            
            {/* <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-xl mr-4">
                  <FiImage className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">With Images</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {categories.filter(cat => cat.image).length}
                  </p>
                </div>
              </div>
            </div> */}
            
            {/* <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-xl mr-4">
                  <FiLink className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Slugs</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
              </div>
            </div> */}
            
            <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-orange-100 !rounded-xl !mr-4">
                  <FiCalendar className="!w-6 !h-6 !text-orange-600" />
                </div>
                <div>
                  <p className="!text-sm !font-medium !text-gray-600">This Month</p>
                  <p className="!text-2xl !font-bold !text-gray-900">
                    {categories.filter(cat => {
                      const created = new Date(cat.createdAt);
                      const now = new Date();
                      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !mb-6">
            <div className="!p-6">
              <div className="!flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between !gap-4">
                {/* Search Box */}
                <div className="!relative !flex-1 !max-w-md">
                  <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                    <FiSearch className="!h-5 !w-5 !text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search categories by name, slug, or description..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="!block !w-full !pl-10 !pr-4 !py-3 !border !border-gray-300 !rounded-xl focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-all !duration-200"
                  />
                </div>

                {/* Bulk Actions */}
                {selectedCategories.size > 0 && (
                  <div className="!flex !items-center !space-x-3">
                    <span className="!text-sm !text-gray-600">
                      {selectedCategories.size} selected
                    </span>
                    <button
                      onClick={handleBulkDelete}
                      className="!px-4 !py-2 !bg-red-100 !text-red-700 !rounded-lg hover:!bg-red-200 !transition-colors !font-medium !text-sm"
                    >
                      Delete Selected
                    </button>
                  </div>
                )}

                {/* Items Per Page */}
                <div className="!flex !items-center !space-x-3">
                  <FiFilter className="!w-4 !h-4 !text-gray-400" />
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="!border !border-gray-300 !rounded-lg !px-3 !py-2 !text-sm focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !overflow-hidden">
            {/* Table */}
            <div className="!overflow-x-auto">
              <table className="!w-full">
                <thead className="!bg-gray-50 !border-b !border-gray-200">
                  <tr>
                    <th className="!w-12 !px-6 !py-4 !text-left">
                      <input
                        type="checkbox"
                        checked={selectedCategories.size === filteredCategories.length && filteredCategories.length > 0}
                        onChange={handleSelectAll}
                        className="!rounded !border-gray-300 !text-blue-600 focus:!ring-blue-500"
                      />
                    </th>
                    <th 
                      className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-600 !uppercase !tracking-wider !cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="!flex !items-center">
                        Category Name
                        <SortIcon sortKey="name" />
                      </div>
                    </th>
                    <th className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-600 !uppercase !tracking-wider">
                      Media
                    </th>
                   
                    <th 
                      className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-600 !uppercase !tracking-wider !cursor-pointer"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="!flex !items-center">
                        Created
                        <SortIcon sortKey="createdAt" />
                      </div>
                    </th>
                    <th className="!px-6 !py-4 !text-right !text-xs !font-semibold !text-gray-600 !uppercase !tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="!divide-y !divide-gray-200">
                  {isLoading ? (
                    // Loading Skeleton
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="!animate-pulse">
                        <td className="!px-6 !py-4">
                          <div className="!h-4 !bg-gray-200 !rounded !w-4"></div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!h-4 !bg-gray-200 !rounded !w-32"></div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!h-4 !bg-gray-200 !rounded !w-10"></div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!h-4 !bg-gray-200 !rounded !w-24"></div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!h-4 !bg-gray-200 !rounded !w-20"></div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!h-8 !bg-gray-200 !rounded !w-16 !ml-auto"></div>
                        </td>
                      </tr>
                    ))
                  ) : currentItems.length > 0 ? (
                    currentItems.map((cat) => (
                      <tr key={cat._id} className="hover:!bg-gray-50/50 !transition-colors !duration-150">
                        <td className="!px-6 !py-4">
                          <input
                            type="checkbox"
                            checked={selectedCategories.has(cat._id)}
                            onChange={() => handleSelectCategory(cat._id)}
                            className="!rounded !border-gray-300 !text-blue-600 focus:!ring-blue-500"
                          />
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!flex !items-center">
                            <div className="!h-10 !w-10 !flex-shrink-0 !mr-3 !bg-gradient-to-br from-blue-100 to-indigo-100 !rounded-lg !flex !items-center !justify-center">
                              <FiFileText className="!w-5 !h-5 !text-blue-600" />
                            </div>
                            <div>
                              <div className="!text-sm !font-semibold !text-gray-900">{cat.name}</div>
                              <div className="!text-xs !text-gray-500 !line-clamp-1">
                                {cat.description || 'No description'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!flex !space-x-2">
                            <div className="!h-10 !w-10 !flex-shrink-0 !overflow-hidden !rounded-lg !border !border-gray-200 !bg-gray-50">
                              {cat.image ? (
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${cat.image}`}
                                  alt={cat.name}
                                  className="!h-full !w-full !object-cover"
                                />
                              ) : (
                                <div className="!h-full !w-full !flex !items-center !justify-center">
                                  <FiImage className="!w-4 !h-4 !text-gray-400" />
                                </div>
                              )}
                            </div>
                            
                          </div>
                        </td>
                       
                        <td className="!px-6 !py-4">
                          <div className="!text-sm !text-gray-600">
                            {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!flex !justify-end !space-x-2">
                            <button
                              onClick={() => handleEditRedirect(cat)}
                              className="!flex !items-center !px-3 !py-2 !text-sm !bg-blue-50 !text-blue-700 !rounded-lg hover:!bg-blue-100 !transition-colors !duration-200"
                            >
                              <FiEdit className="w-4 h-4 mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(cat._id)}
                              className="!flex !items-center !px-3 !py-2 !text-sm !bg-red-50 !text-red-700 !rounded-lg hover:!bg-red-100 !transition-colors !duration-200"
                            >
                              <FiTrash2 className="!w-4 !h-4 !mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="!px-6 !py-12 !text-center">
                        <div className="!text-center">
                          <FiFileText className="!mx-auto !h-12 !w-12 !text-gray-400" />
                          <h3 className="!mt-4 !text-sm !font-medium !text-gray-900">No categories found</h3>
                          <p className="!mt-2 !text-sm !text-gray-500">
                            {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first category'}
                          </p>
                          {!searchTerm && (
                            <button
                              onClick={() => router.push("/admin/add-category")}
                              className="!mt-4 !inline-flex !items-center !px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <FiPlus className="w-4 h-4 mr-2" />
                              Add New Category
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredCategories.length > 0 && (
              <div className="!px-6 !py-4 !border-t !border-gray-200 !bg-gray-50">
                <div className="!flex !flex-col sm:!flex-row !items-center !justify-between !gap-4">
                  <div className="!text-sm !text-gray-700">
                    Showing <span className="!font-semibold">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="!font-semibold">
                      {Math.min(indexOfLastItem, filteredCategories.length)}
                    </span>{' '}
                    of <span className="!font-semibold">{filteredCategories.length}</span> results
                  </div>
                  
                  <div className="!flex !items-center !space-x-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="!p-2 !rounded-lg !border !border-gray-300 hover:!bg-gray-100 disabled:!opacity-50 disabled:!cursor-not-allowed !transition-colors"
                    >
                      <FiChevronLeft className="!w-4 !h-4" />
                    </button>
                    
                    {getDisplayedPages().map((pageNumber, index) => (
                      pageNumber === '...' ? (
                        <span key={index} className="!px-3 !py-1 !text-gray-500">...</span>
                      ) : (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`!px-3 !py-1 !rounded-lg !transition-colors ${
                            currentPage === pageNumber
                              ? '!bg-blue-600 !text-white !shadow-lg'
                              : '!text-gray-700 hover:!bg-gray-100'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="!p-2 !rounded-lg !border !border-gray-300 hover:!bg-gray-100 disabled:!opacity-50 disabled:!cursor-not-allowed !transition-colors"
                    >
                      <FiChevronRight className="!w-4 !h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AdminLayout>
  );
};

export default ListCategory;