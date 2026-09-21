"use client";

import { useEffect, useState, useMemo } from "react";
import { 
  Trash2, 
  FileText, 
  Mail, 
  Phone, 
  Briefcase, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  MoreVertical
} from "lucide-react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import * as XLSX from "xlsx";

export default function AdminCareerList() {
  const [careerForms, setCareerForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");

  // Fetch all career forms
  const fetchCareerForms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/carrer-forms`);
      console.log(res.data);
      setCareerForms(res.data);
    } catch (err) {
      console.error("Error fetching career forms:", err);
      // You might want to use a toast notification here instead of alert
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareerForms();
  }, []);

  // Get unique positions for filter
  const uniquePositions = useMemo(() => {
    const positions = [...new Set(careerForms.map(form => form.position))];
    return positions.filter(Boolean);
  }, [careerForms]);

  // Filter forms based on search term and filters
  const filteredForms = useMemo(() => {
    return careerForms.filter(form => {
      const matchesSearch = 
        form.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.position?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPosition = selectedPosition === "all" || form.position === selectedPosition;
      
      return matchesSearch && matchesPosition;
    });
  }, [careerForms, searchTerm, selectedPosition]);

  // Pagination logic
  const totalPages = Math.ceil(filteredForms.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredForms.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredForms, currentPage, itemsPerPage]);

  // Delete career form
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/career/career-forms/${id}`);
      setCareerForms(careerForms.filter((form) => form._id !== id));
      // Consider using a toast notification here
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredForms.map(form => ({
      "Full Name": form.fullname,
      "Email": form.email,
      "Phone": form.phone,
      "Position": form.position,
      "Cover Letter": form.coverLetter,
      "Applied Date": form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "N/A",
      "Status": "New"
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Career Applications");
    XLSX.writeFile(workbook, `career-applications-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Handle page change
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-gray-50 to-blue-50/20 !p-6">
        {/* Header Section */}
        <div className="!mb-8">
          <div className="!flex !flex-col lg:!flex-row !justify-between !items-start lg:!items-center !gap-4 !mb-6">
            <div>
              <h1 className="!text-3xl !font-bold !text-gray-900 !mb-2">Career Applications</h1>
              <p className="text-gray-600">Manage and review job applications efficiently</p>
            </div>
            <button
              onClick={exportToExcel}
              className="!flex !items-center !gap-3 !px-6 !py-3 !bg-gradient-to-r from-blue-600 to-blue-700 !text-white !rounded-xl hover:!from-blue-700 hover:!to-blue-800 !transition-all !duration-200 !shadow-lg hover:!shadow-xl"
            >
              <Download size={20} />
              Export to Excel
            </button>
          </div>

          {/* Stats Cards */}
          <div className="!grid !grid-cols-1 md:!grid-cols-4 !gap-6 !mb-6">
            <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100">
              <div className="!flex !items-center !justify-between">
                <div>
                  <p className="!text-sm !font-medium !text-gray-600">Total Applications</p>
                  <p className="!text-2xl !font-bold !text-gray-900 !mt-1">{careerForms.length}</p>
                </div>
                <div className="!p-3 !bg-blue-50 !rounded-xl">
                  <Briefcase className="!h-6 !w-6 !text-blue-600" />
                </div>
              </div>
            </div>

            <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100">
              <div className="!flex !items-center !justify-between">
                <div>
                  <p className="!text-sm !font-medium !text-gray-600">New Applications</p>
                  <p className="!text-2xl !font-bold !text-gray-900 !mt-1">{filteredForms.length}</p>
                </div>
                <div className="!p-3 !bg-green-50 !rounded-xl">
                  <User className="!h-6 !w-6 !text-green-600" />
                </div>
              </div>
            </div>

            <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100">
              <div className="!flex !items-center !justify-between">
                <div>
                  <p className="!text-sm !font-medium !text-gray-600">Unique Positions</p>
                  <p className="!text-2xl !font-bold !text-gray-900 !mt-1">{uniquePositions.length}</p>
                </div>
                <div className="!p-3 !bg-purple-50 !rounded-xl">
                  <Filter className="!h-6 !w-6 !text-purple-600" />
                </div>
              </div>
            </div>

            <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100">
              <div className="!flex !items-center !justify-between">
                <div>
                  <p className="!text-sm !font-medium !text-gray-600">This Month</p>
                  <p className="!text-2xl !font-bold !text-gray-900 !mt-1">
                    {careerForms.filter(form => {
                      const formDate = new Date(form.createdAt);
                      const currentMonth = new Date().getMonth();
                      return formDate.getMonth() === currentMonth;
                    }).length}
                  </p>
                </div>
                <div className="!p-3 !bg-orange-50 !rounded-xl">
                  <Calendar className="!h-6 !w-6 !text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="!bg-white !rounded-2xl !shadow-sm !border !border-gray-100 !p-6 !mb-6">
          <div className="!flex !flex-col lg:!flex-row !gap-4 !items-start lg:!items-center !justify-between">
            <div className="!flex !flex-col sm:!flex-row !gap-4 !w-full lg:!w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="!absolute !left-4 !top-1/2 !transform -translate-y-1/2 !text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="!w-full lg:!w-80 !pl-12 !pr-4 !py-3 !border !border-gray-200 !rounded-xl focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-all"
                />
              </div>

              <select
                value={selectedPosition}
                onChange={(e) => {
                  setSelectedPosition(e.target.value);
                  setCurrentPage(1);
                }}
                className="!px-4 !py-3 !border !border-gray-200 !rounded-xl focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !bg-white"
              >
                <option value="all">All Positions</option>
                {uniquePositions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>

            <div className="!flex !items-center !gap-4 !w-full lg:!w-auto">
              <label className="!text-sm !text-gray-600 !flex !items-center !gap-3">
                Show:
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="!px-3 !py-2 !border !border-gray-200 !rounded-lg focus:!ring-2 focus:!ring-blue-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="!flex !justify-between !items-center !mb-4">
          <p className="!text-gray-600">
            Showing <span className="!font-semibold">{((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredForms.length)}</span> of{" "}
            <span className="!font-semibold">{filteredForms.length}</span> applications
          </p>
        </div>

        {/* Applications Table */}
        {loading ? (
          <div className="!bg-white !rounded-2xl !shadow-sm !border !border-gray-100 !p-8">
            <div className="!animate-pulse !space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="!flex !items-center !space-x-4">
                  <div className="!h-12 !bg-gray-200 !rounded-full !w-12"></div>
                  <div className="flex-1 space-y-2">
                    <div className="!h-4 !bg-gray-200 !rounded !w-1/4"></div>
                    <div className="!h-3 !bg-gray-200 !rounded !w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredForms.length === 0 ? (
          <div className="!bg-white !rounded-2xl !shadow-sm !border !border-gray-100 !p-12 !text-center">
            <div className="!max-w-md !mx-auto">
              <div className="!w-24 !h-24 !bg-gray-100 !rounded-full !flex !items-center !justify-center !mx-auto !mb-6">
                <Search className="!h-10 !w-10 !text-gray-400" />
              </div>
              <h3 className="!text-lg !font-semibold !text-gray-900 !mb-2">No applications found</h3>
              <p className="!text-gray-600">
                {searchTerm || selectedPosition !== "all" 
                  ? "Try adjusting your search criteria or filters." 
                  : "No career applications have been submitted yet."}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="!bg-white !rounded-2xl !shadow-sm !border !border-gray-100 !overflow-hidden">
              <div className="!overflow-x-auto">
                <table className="!w-full">
                  <thead>
                    <tr className="!border-b !border-gray-200 !bg-gradient-to-r from-gray-50 to-gray-100/50">
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Applicant</th>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Contact Info</th>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Position</th>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Application Date</th>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Documents</th>
                      <th className="!px-6 !py-4 !text-left !text-sm !font-semibold !text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="!divide-y !divide-gray-100">
                    {currentItems.map((form) => (
                      <tr key={form._id} className="hover:!bg-blue-50/30 !transition-colors !group">
                        <td className="!px-6 !py-4">
                          <div className="!flex !items-center">
                            <div className="!flex-shrink-0 !h-12 !w-12 !bg-gradient-to-br from-blue-100 to-blue-200 !rounded-2xl !flex !items-center !justify-center">
                              <User className="!h-6! w-6 !text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="!text-sm !font-semibold !text-gray-900">{form.fullname}</div>
                              <div className="!text-xs !text-gray-500 !mt-1">
                                Applied {formatDate(form.createdAt)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!space-y-1">
                            <div className="!flex !items-center !gap-2 !text-sm !text-gray-900">
                              <Mail className="!h-4 !w-4 !text-gray-400" />
                              {form.email}
                            </div>
                            <div className="!flex !items-center !gap-2 !text-sm !text-gray-600">
                              <Phone className="!h-4 !w-4 !text-gray-400" />
                              {form.phone}
                            </div>
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <span className="!inline-flex !items-center !px-3 !py-1 !rounded-full !text-xs !font-medium !bg-blue-100 !text-blue-800">
                            {form.position}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="!flex !items-center !gap-2 !text-sm !text-gray-600">
                            <Calendar className="!h-4 !w-4" />
                            {formatDate(form.createdAt)}
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!flex !flex-col !gap-2">
                            <a
                              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}${form.resume}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="!inline-flex !items-center !gap-2 !text-sm !text-blue-600 hover:!text-blue-800 !transition-colors"
                            >
                              <FileText size={16} />
                              View Resume
                            </a>
                            {form.coverLetter && (
                              <div className="!text-xs !text-gray-600 !max-w-xs !truncate" title={form.coverLetter}>
                                {form.coverLetter.length > 60
                                  ? form.coverLetter.substring(0, 60) + "..."
                                  : form.coverLetter}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(form._id)}
                              className="!inline-flex !items-center! !gap-2 !px-3 !py-2 !text-sm !text-red-600 hover:!bg-red-50 !rounded-lg !transition-colors group-hover:!bg-white"
                              title="Delete application"
                            >
                              <Trash2 size={16} />
                              <span className="!hidden sm:inline">Delete</span>
                            </button>
                            <button className="!p-2 !text-gray-400 hover:!text-gray-600 !rounded-lg !transition-colors">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="!mt-8 !flex !flex-col sm:!flex-row !items-center !justify-between !gap-4">
                <div className="!text-sm !text-gray-600">
                  Page {currentPage} of {totalPages} • {filteredForms.length} total applications
                </div>
                <div className="!flex !items-center !gap-2">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="!p-2 !rounded-lg !border !border-gray-200 disabled:!opacity-30 disabled:!cursor-not-allowed hover:!bg-gray-50 !transition-colors"
                  >
                    <ChevronLeft className="!h-4 !w-4" />
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
                        onClick={() => goToPage(pageNum)}
                        className={`!px-3 !py-2 !rounded-lg !text-sm !font-medium !transition-all ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-sm"
                            : "!border !border-gray-200 hover:!bg-gray-50 !text-gray-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="!p-2 !rounded-lg !border !border-gray-200 disabled:!opacity-30 disabled:!cursor-not-allowed hover:!bg-gray-50 !transition-colors"
                  >
                    <ChevronRight className="!h-4 !w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}