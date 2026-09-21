"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiSearch,
  FiTrash2,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiUser,
  FiCalendar,
  FiX,
  FiMessageSquare,
  FiFilter,
  FiDownload,
  FiPlus,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiArrowUp,
  FiArrowDown
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../components/AdminLayout";
import * as XLSX from "xlsx";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/contacts`);
      setContacts(data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to fetch contacts");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/contacts/${id}`);
        toast.success("Contact deleted successfully");
        fetchContacts();
      } catch (error) {
        toast.error("Failed to delete contact");
      }
    }
  };

  const openMessageModal = (contact) => {
    setSelectedMessage(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const exportToExcel = () => {
    setIsExporting(true);
    try {
      const dataToExport = contacts.map(contact => ({
        'Name': contact.name,
        'Email': contact.email,
        'Phone': contact.number || 'N/A',
        'Message': contact.message,
        'Date': new Date(contact.createdAt).toLocaleDateString(),
        'Time': new Date(contact.createdAt).toLocaleTimeString()
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
      XLSX.writeFile(workbook, `contacts_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success("Contacts exported successfully");
    } catch (error) {
      toast.error("Failed to export contacts");
    } finally {
      setIsExporting(false);
    }
  };

  // Safe filtering and sorting
  const filteredContacts = (contacts || [])
    .filter((contact) => {
      if (!contact) return false;
      
      const searchLower = searchTerm.toLowerCase();
      const name = contact.name?.toLowerCase() || '';
      const email = contact.email?.toLowerCase() || '';
      const number = contact.number?.toLowerCase() || '';
      const message = contact.message?.toLowerCase() || '';

      return (
        name.includes(searchLower) ||
        email.includes(searchLower) ||
        number.includes(searchLower) ||
        message.includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Statistics
  const totalMessages = contacts.length;
  const thisMonthMessages = contacts.filter(contact => {
    const contactDate = new Date(contact.createdAt);
    const now = new Date();
    return contactDate.getMonth() === now.getMonth() && 
           contactDate.getFullYear() === now.getFullYear();
  }).length;
  
  const todayMessages = contacts.filter(contact => {
    const contactDate = new Date(contact.createdAt);
    const today = new Date();
    return contactDate.toDateString() === today.toDateString();
  }).length;

  const unreadMessages = contacts.filter(contact => !contact.read).length;

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - new Date(date);
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="!min-h-screen !bg-gradient-to-br from-gray-50 to-blue-50/30 !flex !items-center !justify-center">
          <div className="!text-center">
            <div className="!animate-spin !rounded-full !h-16 !w-16 !border-b-2 !border-blue-600 !mx-auto !mb-4"></div>
            <p className="!text-gray-600 !font-medium">Loading contacts...</p>
            <p className="!text-gray-500 !text-sm !mt-1">Please wait while we fetch your messages</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-gray-50 to-blue-50/30 !py-8">
        <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
          {/* Header Section */}
          <div className="!mb-8">
            <div className="!flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between">
              <div>
                <h1 className="!text-3xl !font-bold !text-gray-900">Contact Management</h1>
                <p className="!text-gray-600 !mt-2">Manage and track all customer inquiries and messages</p>
              </div>
              <div className="!flex !items-center !space-x-3 !mt-4 lg:!mt-0">
                <div className="!flex !items-center !space-x-2 !text-sm !text-gray-600">
                  <FiTrendingUp className="!w-4 !h-4 !text-green-500" />
                  <span>{totalMessages} Total Messages</span>
                  <span className="!mx-2">•</span>
                  <FiCheckCircle className="!w-4 !h-4 !text-blue-500" />
                  <span>{thisMonthMessages} This Month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 !gap-6 !mb-8">
            <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-blue-100 !rounded-xl">
                  <FiMessageSquare className="!w-6 !h-4 !text-blue-600" />
                </div>
                <div className="!ml-4">
                  <p className="!text-sm !font-medium !text-gray-600">Total Messages</p>
                  <p className="!text-2xl !font-bold !text-gray-900">{totalMessages}</p>
                </div>
              </div>
            </div>
            
            <div className="!bg-white !rounded-2xl !p-4 !shadow-sm !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-green-100 !rounded-xl">
                  <FiCalendar className="!w-6 !h-6 !text-green-600" />
                </div>
                <div className="!ml-4">
                  <p className="!text-sm !font-medium !text-gray-600">This Month</p>
                  <p className="!text-2xl !font-bold !text-gray-900">{thisMonthMessages}</p>
                </div>
              </div>
            </div>
            
            <div className="!bg-white !rounded-2xl !p-4 !shadow-sm !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-purple-100 !rounded-xl">
                  <FiClock className="!w-6 !h-6 !text-purple-600" />
                </div>
                <div className="!ml-4">
                  <p className="!text-sm !font-medium !text-gray-600">Unread</p>
                  <p className="!text-2xl !font-bold !text-gray-900">{unreadMessages}</p>
                </div>
              </div>
            </div>
            
            <div className="!bg-white !rounded-2xl !p-4 !shadow-sm !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-orange-100 !rounded-xl">
                  <FiUser className="!w-6 !h-6 !text-orange-600" />
                </div>
                <div className="!ml-4">
                  <p className="!text-sm !font-medium !text-gray-600">Today</p>
                  <p className="!text-2xl !font-bold !text-gray-900">{todayMessages}</p>
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
                    <FiMessageSquare className="!w-6 !h-6 !text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Contact Inquiries</h2>
                    <p className="text-gray-600 text-sm">Manage all customer messages and inquiries</p>
                  </div>
                </div>
                <div className="!flex !flex-col sm:!flex-row !gap-3 !mt-4 lg:!mt-0">
                  <button
                    onClick={exportToExcel}
                    disabled={isExporting || contacts.length === 0}
                    className={`!font-semibold !py-3 !px-6 !rounded-xl !transition-all !duration-200 !flex !items-center !shadow-lg hover:!shadow-xl ${
                      isExporting || contacts.length === 0 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
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
              <div className="!grid !grid-cols-1 lg:!grid-cols-3 !gap-6">
                {/* Search */}
                <div className="lg:!col-span-2">
                  <label className="!block !text-sm !font-semibold !text-gray-700 !mb-2">Search Contacts</label>
                  <div className="!relative">
                    <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                      <FiSearch className="!h-5 !w-5 !text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name, email, phone, or message..."
                      className="!pl-10 !pr-4 !py-3 !w-full !border-2 !border-gray-200 !rounded-xl focus:!outline-none focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/20 !transition-all !duration-200"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="!block !text-sm !font-semibold !text-gray-700 !mb-2">Sort By</label>
                  <div className="!relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-3 focus:!outline-none focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/20 !transition-all !duration-200 !appearance-none"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                    <div className="!pointer-events-none !absolute !inset-y-0 !right-0 !flex !items-center !px-3">
                      <FiFilter className="!h-4 !w-4 !text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts List */}
            <div className="!p-8">
              {/* Results Summary */}
              <div className="!flex !justify-between !items-center !mb-6">
                <p className="!text-gray-600">
                  Showing <span className="!font-semibold !text-gray-900">{Math.min(filteredContacts.length, 1)}</span> of{' '}
                  <span className="!font-semibold !text-gray-900">{filteredContacts.length}</span> messages
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="!text-sm !text-blue-600 hover:!text-blue-800 !font-medium !flex !items-center"
                  >
                    <FiX className="!w-4 !h-4 !mr-1" />
                    Clear search
                  </button>
                )}
              </div>

              {filteredContacts.length > 0 ? (
                <div className="!space-y-2">
                  {currentContacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="!bg-gradient-to-r from-gray-50 to-white !rounded-2xl !border-2 !border-gray-100 hover:!border-blue-200 !transition-all !duration-300 !p-4 !group hover:!shadow-lg"
                    >
                      <div className="!flex !flex-col lg:!flex-row lg:!items-start !gap-6">
                        {/* Contact Avatar */}
                        <div className="!flex-shrink-0">
                          <div className="!relative">
                            <div className="!w-16 !h-16 !bg-gradient-to-br from-blue-500 to-purple-600 !rounded-2xl !flex !items-center !justify-center !text-white !font-semibold !text-lg !shadow-lg">
                              {contact.name.charAt(0).toUpperCase()}
                            </div>
                            {!contact.read && (
                              <div className="!absolute -!top-1 -!right-1 !w-3 !h-3 !bg-red-500 !rounded-full !border-2 !border-white"></div>
                            )}
                          </div>
                        </div>

                        {/* Contact Details */}
                        <div className="!flex-grow !min-w-0">
                          <div className="!flex !flex-col sm:!flex-row sm:!items-start sm:!justify-between !mb-2">
                            <div>
                              <h3 className="!text-lg !font-semibold !!text-gray-900">
                                {contact.name} 
                              </h3>
                              <div className="!flex !items-center !space-x-4 !mt-1">
                                <div className="!flex !items-center !text-gray-600 !text-sm">
                                  <FiMail className="!w-4 !h-4 !mr-1" />
                                  {contact.email}
                                </div>
                                {contact.number && (
                                  <div className="!flex !items-center !text-gray-600 !text-sm">
                                    <FiPhone className="!w-4 !h-4 !mr-1" />
                                    {contact.number}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="!flex !items-center !space-x-2 !mt-2 sm:!mt-0">
                              <span className="!text-sm !text-gray-500">
                                {getTimeAgo(contact.createdAt)}
                              </span>
                              {sortBy === "newest" ? (
                                <FiArrowUp className="!w-4 !h-4 !text-green-500" />
                              ) : (
                                <FiArrowDown className="!w-4 !h-4 !text-blue-500" />
                              )}
                            </div>
                          </div>

                          <p className="!text-gray-600 !text-sm !mb-2 !line-clamp-2">
                            {contact.message}
                          </p>

                          <div className="!flex !items-center !justify-between">
                            <span className="!text-xs !text-gray-500">
                              {new Date(contact.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="!flex-shrink-0">
                          <div className="!flex !space-x-2">
                            <button
                              onClick={() => openMessageModal(contact)}
                              className="!px-4 !py-2 !bg-blue-600 !text-white !rounded-xl hover:!bg-blue-700 !transition-all !duration-200 !flex !items-center !shadow-sm hover:!shadow-md"
                            >
                              <FiEye className="!w-4 !h-4 !mr-2" />
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(contact._id)}
                              className="!px-4 !py-2 !bg-red-100 !text-red-600 !rounded-xl hover:!bg-red-200 !transition-all !duration-200 !flex !items-center !shadow-sm hover:!shadow-md"
                            >
                              <FiTrash2 className="!w-4 !h-4 !mr-2" />
                              Delete
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
                      <FiMessageSquare className="!w-12 !h-12 !text-gray-400" />
                    </div>
                    <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">
                      {searchTerm ? "No matching contacts found" : "No contact messages yet"}
                    </h3>
                    <p className="!text-gray-600">
                      {searchTerm ? "Try adjusting your search criteria" : "All contact form submissions will appear here"}
                    </p>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {filteredContacts.length > contactsPerPage && (
                <div className="!flex !flex-col sm:!flex-row !items-center !justify-between !mt-8 !pt-6 !border-t !border-gray-200">
                  <div className="!text-sm !text-gray-600 !mb-4 sm:!mb-0">
                    Showing <span className="!font-semibold">{indexOfFirstContact + 1}</span> to{' '}
                    <span className="!font-semibold">{Math.min(indexOfLastContact, filteredContacts.length)}</span> of{' '}
                    <span className="!font-semibold">{filteredContacts.length}</span> messages
                  </div>
                  
                  <div className="!flex !items-center !space-x-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`!p-2 !rounded-xl !transition-all !duration-200 ${
                        currentPage === 1
                          ? '!text-gray-300 !cursor-not-allowed'
                          : '!text-gray-600 hover:!bg-gray-100 hover:!text-gray-900'
                      }`}
                    >
                      <FiChevronLeft className="!w-5 !h-5" />
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`!px-3 !py-1.5 !rounded-lg !text-sm !font-medium !transition-all !duration-200 ${
                            currentPage === pageNumber
                              ? '!bg-blue-500 !text-white !shadow-lg'
                              : '!text-gray-600 hover:!bg-gray-100 hover:!text-gray-900'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`!p-2 !rounded-xl !transition-all !duration-200 ${
                        currentPage === totalPages
                          ? '!text-gray-300 !cursor-not-allowed'
                          : '!text-gray-600 hover:!bg-gray-100 hover:!text-gray-900'
                      }`}
                    >
                      <FiChevronRight className="!w-5 !h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Modal */}
        {isModalOpen && selectedMessage && (
          <div className="!fixed !inset-0  !bg-opacity-50 !flex !items-center !justify-center !z-50 !p-4">
            <div className="!bg-white !rounded-3xl !shadow-2xl !max-w-2xl !w-full 1max-h-[90vh] !overflow-hidden !flex !flex-col">
              <div className="!flex !justify-between !items-center !px-8 !py-6 !border-b !border-gray-200">
                <div>
                  <h2 className="!text-xl !font-bold !text-gray-900">Message Details</h2>
                  <p className="!text-gray-600 !text-sm !mt-1">
                    From {selectedMessage.name} 
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="!p-2 !text-gray-400 hover:!text-gray-600 !rounded-xl hover:!bg-gray-100 !transition-all !duration-200"
                >
                  <FiX className="!w-5 !h-5" />
                </button>
              </div>
              
              <div className="!p-8 !overflow-y-auto !flex-1">
                <div className="!space-y-6">
                  <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
                    <div>
                      <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">Contact Information</label>
                      <div className="!bg-gray-50 !rounded-xl p-4 !space-y-2">
                        <div className="!flex !items-center !text-gray-700">
                          <FiUser className="w-4 h-4 mr-2" />
                          <span>{selectedMessage.name} </span>
                        </div>
                        <div className="flex items-center !text-gray-700">
                          <FiMail className="!w-4 !h-4 !mr-2" />
                          <span>{selectedMessage.email}</span>
                        </div>
                        {selectedMessage.number && (
                          <div className="!flex !items-center !text-gray-700">
                            <FiPhone className="!w-4 !h-4 !mr-2" />
                            <span>{selectedMessage.number}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="!block !text-sm !font-medium !text-gray-700 mb-2">Message Details</label>
                      <div className="!bg-gray-50 !rounded-xl !p-4 !space-y-2">
                        <div className="!flex !items-center !text-gray-700">
                          <FiCalendar className="!w-4 !h-4 !mr-2" />
                          <span>
                            {new Date(selectedMessage.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="!flex !items-center !text-gray-700">
                          <FiClock className="!w-4 !h-4 !mr-2" />
                          <span>
                            {new Date(selectedMessage.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="!block 1text-sm !font-medium !text-gray-700 !mb-2">Message Content</label>
                    <div className="!bg-gray-50 !rounded-xl !p-6">
                      <p className="!text-gray-700 !leading-relaxed !whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="!px-8 !py-6 !border-t !border-gray-200 !bg-gray-50 !flex !justify-end">
                <button
                  onClick={closeModal}
                  className="!px-6 !py-3 !bg-blue-600 !text-white !font-medium !rounded-xl hover:!bg-blue-700 !transition-all 1duration-200 !shadow-lg hover:!shadow-xl"
                >
                  Close Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}