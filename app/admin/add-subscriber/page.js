'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiMail,
  FiTrash2,
  FiUsers,
  FiDownload,
  FiSearch,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiCalendar,
  FiRefreshCw,
  FiUserPlus,
  FiEye
} from "react-icons/fi";

const Subscription = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bulkAction, setBulkAction] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const subscribersPerPage = 10;

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriber/getsubscriber`);
      setSubscribers(response.data);
      // toast.success("Subscribers loaded successfully");
    } catch (error) {
      console.error("Failed to fetch subscribers", error);
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async (email) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriber/removeSubscriber/${email}`);
      toast.success("Subscriber removed successfully");
      setSubscribers((prev) => prev.filter((sub) => sub.email !== email));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Unsubscribe failed", error);
      toast.error(error.response?.data?.message || "Failed to remove subscriber");
    }
  };

  const handleSelectSubscriber = (email) => {
    setSelectedSubscribers(prev =>
      prev.includes(email)
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const handleSelectAll = () => {
    setSelectedSubscribers(
      selectedSubscribers.length === filteredSubscribers.length
        ? []
        : filteredSubscribers.map(sub => sub.email)
    );
  };

  const handleBulkAction = () => {
    if (selectedSubscribers.length === 0) {
      toast.warning("Please select subscribers first");
      return;
    }

    if (bulkAction === "delete") {
      if (window.confirm(`Are you sure you want to remove ${selectedSubscribers.length} subscribers?`)) {
        selectedSubscribers.forEach(email => {
          handleUnsubscribe(email);
        });
        setSelectedSubscribers([]);
        setBulkAction("");
      }
    }
  };

  const exportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Subscription Date\n" 
      + subscribers.map(sub => `${sub.email},${sub.subscribedAt || new Date().toISOString().split('T')[0]}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subscribers-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Subscribers exported successfully");
  };

  // Sort and filter subscribers
  const filteredSubscribers = subscribers
    .filter(sub => 
      sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.subscribedAt || 0) - new Date(a.subscribedAt || 0);
      } else {
        return new Date(a.subscribedAt || 0) - new Date(b.subscribedAt || 0);
      }
    });

  // Pagination logic
  const indexOfLastSubscriber = currentPage * subscribersPerPage;
  const indexOfFirstSubscriber = indexOfLastSubscriber - subscribersPerPage;
  const currentSubscribers = filteredSubscribers.slice(indexOfFirstSubscriber, indexOfLastSubscriber);
  const totalPages = Math.ceil(filteredSubscribers.length / subscribersPerPage);

  const getInitials = (email) => {
    return email.charAt(0).toUpperCase();
  };

  const getRandomColor = (email) => {
    const colors = [
      "bg-gradient-to-r from-blue-500 to-blue-600",
      "bg-gradient-to-r from-green-500 to-green-600",
      "bg-gradient-to-r from-purple-500 to-purple-600",
      "bg-gradient-to-r from-pink-500 to-pink-600",
      "bg-gradient-to-r from-orange-500 to-orange-600",
      "bg-gradient-to-r from-teal-500 to-teal-600"
    ];
    const index = email.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="!min-h-screen !flex !items-center !justify-center">
          <div className="!text-center">
            <div className="!animate-spin !rounded-full !h-12 !w-12 !border-t-2 !border-b-2 !border-blue-500 !mx-auto !mb-4"></div>
            <p className="!text-gray-600">Loading subscribers...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="!w-full !mx-auto !p-6 !space-y-6">
        {/* Header Section */}
        <div className="!bg-gradient-to-r from-gray-900 to-gray-800 !rounded-2xl !p-6 !shadow-xl">
          <div className="!flex !flex-col lg:!flex-row lg:!items-center !justify-between">
            <div className="!flex !items-center !space-x-4">
              <div className="!p-3 !bg-white/10 !rounded-xl !backdrop-blur-sm">
                <FiUsers className="!h-8 !w-8 !text-white" />
              </div>
              <div>
                <h1 className="!text-2xl !font-bold !text-white !mb-2">Email Subscribers</h1>
                <p className="!text-gray-300">
                  Manage and analyze your newsletter subscriber base
                </p>
              </div>
            </div>
            <div className="!flex !items-center !space-x-4 !mt-6 lg:!mt-0">
              <div className="!text-right">
                <p className="!text-gray-300 !text-sm">Total Subscribers</p>
                <p className="!text-white !text-3xl !font-bold">{subscribers.length.toLocaleString()}</p>
              </div>
              <div className="!h-12 !w-px !bg-gray-600"></div>
              <button
                onClick={fetchSubscribers}
                className="!p-3 !bg-white/10 !rounded-xl hover:!bg-white/20 !transition-all !duration-200"
                title="Refresh"
              >
                <FiRefreshCw className="!h-5 !w-5 !text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-6">
          <div className="!bg-gradient-to-r from-blue-500 to-blue-600 !rounded-2xl !p-4 !text-white !shadow-lg">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-blue-100 !text-sm">Active</p>
                <p className="!text-2xl !font-bold">{subscribers.length}</p>
              </div>
              <FiCheckCircle className="!h-8 !w-8 !text-white/80" />
            </div>
          </div>
          <div className="!bg-gradient-to-r from-green-500 to-green-600 !rounded-2xl !p-6 !text-white !shadow-lg">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-green-100 !text-sm">This Month</p>
                <p className="!text-2xl !font-bold">+{Math.floor(subscribers.length * 0.1)}</p>
              </div>
              <FiUserPlus className="!h-8 !w-8 !text-white/80" />
            </div>
          </div>
          <div className="!bg-gradient-to-r from-purple-500 to-purple-600 !rounded-2xl !p-6 !text-white !shadow-lg">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-purple-100 !text-sm">Growth Rate</p>
                <p className="!text-2xl !font-bold">+10%</p>
              </div>
              <FiTrendingUp className="!h-8 !w-8 !text-white/80" />
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !p-6">
          <div className="!flex !flex-col lg:!flex-row lg:!items-center !justify-between !gap-4">
            <div className="!flex !flex-col sm:!flex-row !gap-4 !flex-1">
              <div className="!relative !flex-1 !max-w-md">
                <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                  <FiSearch className="!h-5 !w-5 !text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search subscribers by email..."
                  className="!pl-10 !pr-4 !py-3 !border !border-gray-200 !rounded-xl focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !w-full !transition-all !duration-200"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="!px-4 !py-3 !border !border-gray-200 !rounded-xl focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-all !duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
            
            <div className="!flex !flex-col sm:!flex-row !gap-3">
              {selectedSubscribers.length > 0 && (
                <div className="!flex !gap-3">
                  <select
                    value={bulkAction}
                    onChange={(e) => setBulkAction(e.target.value)}
                    className="!px-4 !py-2 !border !border-gray-200 !rounded-lg focus:!ring-2 focus:!ring-blue-500"
                  >
                    <option value="">Bulk Actions</option>
                    <option value="delete">Delete Selected</option>
                  </select>
                  <button
                    onClick={handleBulkAction}
                    className="!px-4 !py-2 !bg-red-500 !text-white !rounded-lg hover:!bg-red-600 !transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              
              <button
                onClick={exportSubscribers}
                className="!flex !items-center !px-4 !py-3 !bg-gradient-to-r from-green-500 to-green-600 !text-white !rounded-xl hover:!from-green-600 hover:!to-green-700 !transition-all !duration-200 !shadow-lg"
              >
                <FiDownload className="!h-4 !w-4 !mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !overflow-hidden">
          {filteredSubscribers.length > 0 ? (
            <>
              <div className="!overflow-x-auto">
                <table className="!w-full">
                  <thead className="!bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-600 !uppercase !tracking-wider !w-12">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                          onChange={handleSelectAll}
                          className="!h-4 !w-4 !text-blue-600 !rounded focus:!ring-blue-500 !border-gray-300"
                        />
                      </th>
                      <th className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-600 !uppercase !tracking-wider">
                        Subscriber
                      </th>
                      <th className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-600 !uppercase !tracking-wider">
                        Status
                      </th>
                      <th className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-600 !uppercase !tracking-wider">
                        Date Added
                      </th>
                      <th className="!px-6 !py-4 !text-right !text-xs !font-semibold !text-gray-600 !uppercase !tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="!divide-y !divide-gray-100">
                    {currentSubscribers.map((subscriber) => (
                      <tr key={subscriber.email} className="hover:!bg-gray-50/50 !transition-all !duration-200 !group">
                        <td className="!px-6 !py-4">
                          <input
                            type="checkbox"
                            checked={selectedSubscribers.includes(subscriber.email)}
                            onChange={() => handleSelectSubscriber(subscriber.email)}
                            className="!h-4 !w-4 !text-blue-600 !rounded focus:!ring-blue-500 !border-gray-300"
                          />
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!flex !items-center">
                            <div className={`!flex-shrink-0 !h-10 !w-10 !rounded-full !flex !items-center !justify-center !text-white ${getRandomColor(subscriber.email)}`}>
                              <span className="!font-semibold">{getInitials(subscriber.email)}</span>
                            </div>
                            <div className="!ml-4">
                              <div className="!font-medium !text-gray-900">
                                {subscriber.email}
                              </div>
                              <div className="!text-sm !text-gray-500">
                                Newsletter Subscriber
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <span className="!inline-flex !items-center !px-3 !py-1 !rounded-full !text-xs !font-semibold !bg-green-100 !text-green-800">
                            <FiCheckCircle className="!h-3 !w-3 !mr-1" />
                            Active
                          </span>
                        </td>
                        <td className="!px-6 !py-4 !text-sm !text-gray-600">
                          <div className="!flex !items-center">
                            <FiCalendar className="!h-4 !w-4 !mr-1 !text-gray-400" />
                            {subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>
                        <td className="!px-6 !py-4 !text-right">
                          <div className="!flex !justify-end !space-x-2 !opacity-80 group-hover:!opacity-100 !transition-opacity !duration-200">
                            <button
                              onClick={() => setDeleteConfirm(subscriber.email)}
                              className="!p-2 !text-red-600 hover:!bg-red-50  !rounded-lg !transition-colors !duration-200"
                              title="Remove Subscriber"
                            >
                              <FiTrash2 className="!h-4 !w-4 text" />
                            </button>
                            {/* <button
                              className="!p-2 !text-blue-600 hover:!bg-blue-50 !rounded-lg !transition-colors !duration-200"
                              title="View Details"
                            >
                              <FiEye className="!h-4 !w-4" />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="!px-6 !py-4 !border-t !border-gray-100 !bg-gray-50/50">
                  <div className="!flex !flex-col sm:!flex-row !items-center !justify-between !space-y-4 sm:!space-y-0">
                    <div className="!text-sm !text-gray-600">
                      Showing <span className="!font-semibold">{indexOfFirstSubscriber + 1}</span> to{" "}
                      <span className="!font-semibold">{Math.min(indexOfLastSubscriber, filteredSubscribers.length)}</span> of{" "}
                      <span className="!font-semibold">{filteredSubscribers.length}</span> subscribers
                    </div>
                    <div className="!flex !items-center !space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`!p-2 !rounded-lg !transition-all !duration-200 ${
                          currentPage === 1
                            ? "!text-gray-300 !cursor-not-allowed"
                            : "!text-gray-600 hover:!bg-white hover:!shadow-md"
                        }`}
                      >
                        <FiChevronLeft className="!h-5 !w-5" />
                      </button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`!px-3 !py-1.5 !rounded-lg !text-sm !font-medium !transition-all !duration-200 ${
                              currentPage === pageNum
                                ? "!bg-blue-500 !text-white !shadow-lg"
                                : "!text-gray-600 hover:!bg-white hover:!shadow-md"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`!p-2 !rounded-lg !transition-all !duration-200 ${
                          currentPage === totalPages
                            ? "!text-gray-300 !cursor-not-allowed"
                            : "!text-gray-600 hover:!bg-white hover:!shadow-md"
                        }`}
                      >
                        <FiChevronRight className="!h-5 !w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="!px-6 !py-16 !text-center">
              <div className="!flex !flex-col !items-center !justify-center !text-gray-400">
                <FiMail className="!h-16 !w-16 !mb-4 !opacity-30" />
                <p className="!text-xl !font-semibold !text-gray-500 !mb-2">
                  {searchTerm ? "No matching subscribers found" : "No subscribers yet"}
                </p>
                <p className="!text-sm !text-gray-400 !max-w-md">
                  {searchTerm 
                    ? "Try adjusting your search terms or check for spelling errors" 
                    : "Subscribers will appear here once they sign up for your newsletter"
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="!fixed !inset-0 !bg-opacity-50 !flex !items-center !justify-center !p-4 !z-50 !backdrop-blur-sm">
          <div className="!bg-white !rounded-2xl !shadow-2xl !p-6 !max-w-md !w-full !transform !transition-all !duration-300 !scale-95 hover:!scale-100">
            <div className="!flex !items-center !mb-4">
              <div className="!p-2 !rounded-full !bg-red-100 !mr-3">
                <FiAlertCircle className="!h-6 !w-6 !text-red-600" />
              </div>
              <div>
                <h3 className="!text-lg !font-semibold !text-gray-900">Confirm Removal</h3>
                <p className="!text-sm !text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            <p className="!text-gray-600 !mb-6">
              Are you sure you want to remove <span className="!font-semibold !text-gray-900">{deleteConfirm}</span> from your subscribers list?
            </p>
            <div className="!flex !justify-end !space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="!px-4 !py-2.5 !text-sm !font-medium !text-gray-700 !bg-gray-100 !rounded-xl hover:!bg-gray-200 !transition-all !duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUnsubscribe(deleteConfirm)}
                className="!px-4 !py-2.5 !text-sm !font-medium !text-white !bg-gradient-to-r from-red-500 to-red-600 !rounded-xl hover:!from-red-600 hover:!to-red-700 !transition-all !duration-200 !shadow-lg"
              >
                Remove Subscriber
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

// Add missing icon component
const FiTrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export default Subscription;