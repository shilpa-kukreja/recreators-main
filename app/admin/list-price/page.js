"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import {
  Trash2,
  Edit3,
  Eye,
  DollarSign,
  Zap,
  Star,
  Crown,
  Users,
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  Download,
  Plus,
  RefreshCw,
  Shield,
  CheckCircle,
  XCircle,
  FileText,
  BarChart3,
  TrendingUp,
  Calendar,
  Sparkles,
  ArrowUpDown,
  FileSpreadsheet
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";

const ListPrice = () => {
   const router = useRouter();
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [selectedPlans, setSelectedPlans] = useState(new Set());
  const [exportLoading, setExportLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price/getprice`);
      setPricing(res.data.data || []);
    } catch (err) {
      toast.error("❌ Failed to fetch pricing data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

   const handleEdit = (id) => {
    router.push(`/admin/add-price?id=${id}`);
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pricing plan? This action cannot be undone.")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price/remove/${id}`);
      toast.success("✅ Pricing plan deleted successfully");
      fetchData();
    } catch (err) {
      toast.error("❌ Failed to delete pricing plan");
    }
  };

  const toggleExpand = (id) => {
    setExpandedPlan(expandedPlan === id ? null : id);
  };

  const toggleSelectPlan = (id) => {
    const newSelected = new Set(selectedPlans);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPlans(newSelected);
  };

  const selectAllPlans = () => {
    if (selectedPlans.size === filteredPricing.length) {
      setSelectedPlans(new Set());
    } else {
      setSelectedPlans(new Set(filteredPricing.map(plan => plan._id)));
    }
  };

  const getPlanIcon = (index) => {
    const icons = [Zap, Star, Crown, Users, TrendingUp, Sparkles];
    return icons[index % icons.length];
  };

  const getPlanColor = (index) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-green-500 to-green-600",
      "from-orange-500 to-orange-600",
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600"
    ];
    return colors[index % colors.length];
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort pricing plans
  const filteredPricing = useMemo(() => {
    let filtered = pricing.filter(plan =>
      plan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.price?.toString().includes(searchTerm)
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [pricing, searchTerm, sortConfig]);

  // Export to Excel function
  const exportToExcel = async () => {
    try {
      setExportLoading(true);

      const dataToExport = selectedPlans.size > 0
        ? filteredPricing.filter(plan => selectedPlans.has(plan._id))
        : filteredPricing;

      if (dataToExport.length === 0) {
        toast.warning("No data available to export");
        return;
      }

      const worksheetData = dataToExport.map((plan, index) => ({
        "No.": index + 1,
        "Plan Title": plan.title || "N/A",
        "Price": plan.price || "N/A",
        "Billing Period": plan.afterText || "N/A",
        "Description": plan.text || "N/A",
        "Features Count": plan.list?.length || 0,
        "Features": plan.list?.join("; ") || "N/A",
        "Plan ID": plan._id || "N/A"
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Pricing Plans");

      // Auto-size columns
      const maxWidth = worksheetData.reduce((w, r) => Math.max(w, r['Plan Title']?.length || 0), 10);
      worksheet['!cols'] = [
        { wch: 5 },  // No.
        { wch: Math.min(maxWidth, 50) },  // Plan Title
        { wch: 15 }, // Price
        { wch: 20 }, // Billing Period
        { wch: 40 }, // Description
        { wch: 15 }, // Features Count
        { wch: 50 }, // Features
        { wch: 25 }  // Plan ID
      ];

      const fileName = `pricing-plans-export-${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      toast.success(`✅ Exported ${dataToExport.length} plans successfully`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("❌ Failed to export data");
    } finally {
      setExportLoading(false);
    }
  };

  const exportAllToExcel = () => {
    setSelectedPlans(new Set());
    setTimeout(exportToExcel, 100);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-blue-50/20 !py-8 !px-4 sm:!px-6 lg:!px-8">
          <div className="max-w-7xl mx-auto">
            <div className="!bg-white !rounded-3xl !shadow-xl !border !border-gray-100 !p-8">
              <div className="animate-pulse">
                <div className="!h-8 !bg-gray-200 !rounded !w-1/4 !mb-8"></div>
                <div className="!grid !grid-cols-1 md:!grid-cols-2 xl:!grid-cols-2 !gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="!bg-gray-50 !rounded-2xl !p-6">
                      <div className="!flex !items-center !space-x-4 !mb-4">
                        <div className="!h-12 !w-12 !bg-gray-200 !rounded-2xl"></div>
                        <div className="!flex-1 !space-y-2">
                          <div className="!h-4 !bg-gray-200 !rounded !w-1/3"></div>
                          <div className="!h-3 !bg-gray-200 !rounded !w-1/2"></div>
                        </div>
                      </div>
                      <div className="!space-y-2">
                        <div className="!h-4 !bg-gray-200 !rounded !w-3/4"></div>
                        <div className="!h-4 !bg-gray-200 !rounded !w-1/2"></div>
                        <div className="!h-4 !bg-gray-200 !rounded !w-2/3"></div>
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

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-blue-50/20 !py-8 px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-7xl !mx-auto">
          {/* Enhanced Header Section */}
          <div className="!mb-8">
            <div className="!flex !flex-col lg:!flex-row !justify-between !items-start lg:!items-center !gap-6 !mb-8">
              <div>
                <h1 className="!text-4xl !font-bold  !mb-3 !bg-gradient-to-r from-blue-600 to-purple-600 !bg-clip-text !text-transparent">
                  Pricing Plans
                </h1>
                <p className="!text-gray-600 !text-lg">Manage and organize your pricing strategies effectively</p>
              </div>
              <div className="!flex !flex-col sm:!flex-row !gap-3">
                <button
                  onClick={fetchData}
                  className="!flex !items-center !gap-3 !px-5 !py-3 !bg-white !text-gray-700 !rounded-xl !border !border-gray-200 hover:!bg-gray-50 !transition-all !shadow-sm"
                >
                  <RefreshCw size={18} />
                  Refresh Data
                </button>
                <button
                  onClick={exportAllToExcel}
                  disabled={exportLoading}
                  className="!flex !items-center !gap-3 !px-5 !py-3 !bg-gradient-to-r from-green-500 to-emerald-600 !text-white !rounded-xl hover:!from-green-600 hover:!to-emerald-700 !transition-all !shadow-lg disabled:!opacity-50"
                >
                  {exportLoading ? (
                    <div className="!w-5 !h-5 !border-2 !border-white !border-t-transparent !rounded-full !animate-spin" />
                  ) : (
                    <FileSpreadsheet size={18} />
                  )}
                  Export All to Excel
                </button>
                <Link href="/admin/add-price">
                <button className="!flex !items-center !gap-3 !px-5 !py-3 !bg-gradient-to-r from-blue-600 to-purple-600 !text-white !rounded-xl hover:!from-blue-700 hover:!to-purple-700 !transition-all !shadow-lg">
                  <Plus size={18} />
                  New Pricing Plan
                </button>
                </Link>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 !gap-6 !mb-8">
              <div className="!bg-gradient-to-br from-blue-50 to-indigo-100 !rounded-2xl !p-6 !border !border-blue-100 !shadow-sm">
                <div className="!flex !items-center !justify-between">
                  <div>
                    <p className="!text-sm !font-semibold !text-blue-700">Total Plans</p>
                    <p className="!text-3xl !font-bold !text-gray-900 !mt-2">{pricing.length}</p>
                  </div>
                  <div className="!p-3 !bg-white !rounded-2xl !shadow-sm">
                    <DollarSign className="!h-7 !w-7 !text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="!bg-gradient-to-br from-green-50 to-emerald-100 !rounded-2xl !p-6 !border !border-green-100 !shadow-sm">
                <div className="!flex !items-center !justify-between">
                  <div>
                    <p className="!text-sm !font-semibold !text-green-700">Active Plans</p>
                    <p className="!text-3xl !font-bold !text-gray-900 !mt-2">{pricing.length}</p>
                  </div>
                  <div className="!p-3 !bg-white !rounded-2xl !shadow-sm">
                    <CheckCircle className="!h-7 !w-7 !text-green-600" />
                  </div>
                </div>
              </div>
              <div className="!bg-gradient-to-br from-purple-50 to-violet-100 !rounded-2xl !p-6 !border !border-purple-100 !shadow-sm">
                <div className="!flex !items-center !justify-between">
                  <div>
                    <p className="!text-sm !font-semibold !text-purple-700">Total Features</p>
                    <p className="!text-3xl !font-bold !text-gray-900 !mt-2">
                      {pricing.reduce((acc, plan) => acc + (plan.list?.length || 0), 0)}
                    </p>
                  </div>
                  <div className="!p-3 !bg-white !rounded-2xl !shadow-sm">
                    <Zap className="!h-7 !w-7 !text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="!bg-gradient-to-br from-orange-50 to-amber-100 !rounded-2xl !p-6 !border !border-orange-100 !shadow-sm">
                <div className="!flex !items-center !justify-between">
                  <div>
                    <p className="!text-sm !font-semibold !text-orange-700">This Month</p>
                    <p className="!text-3xl !font-bold !text-gray-900 !mt-2">+{Math.min(2, pricing.length)}</p>
                  </div>
                  <div className="!p-3 !bg-white !rounded-2xl !shadow-sm">
                    <TrendingUp className="!h-7 !w-7 !text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Actions Section */}
          <div className="!bg-white !rounded-3xl !shadow-lg !border !border-gray-100 !p-6 !mb-8">
            <div className="!flex !flex-col lg:!flex-row !gap-6 !items-start lg:!items-center !justify-between">
              <div className="!flex !flex-col sm:!flex-row !gap-4 !w-full lg:!w-auto">
                <div className="!relative !flex-1 sm:!flex-none sm:!w-80">
                  <Search className="!absolute !left-4 !top-1/2 !transform -translate-y-1/2 !text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search plans by title, description, or price..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="!w-full !pl-12 !pr-4 !py-3.5 !border-2 !border-gray-200 !rounded-xl focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-all"
                  />
                </div>

                <div className="!flex !items-center !gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="!px-4 !py-3.5 !border-2 !border-gray-200 !rounded-xl focus:!ring-2 focus:!ring-blue-500 !bg-white"
                  >
                    <option value="all">All Plans</option>
                    <option value="active">Active</option>
                    <option value="popular">Popular</option>
                  </select>
                  <button className="!flex !items-center !gap-2 !px-4 !py-3.5 !border-2 !border-gray-200 !rounded-xl hover:!bg-gray-50 !transition-colors">
                    <Filter size={18} />
                    Advanced
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>

              <div className="!flex !items-center !gap-3">
                {selectedPlans.size > 0 && (
                  <div className="!flex !items-center !gap-3">
                    <span className="!text-sm !font-medium !text-blue-600">
                      {selectedPlans.size} selected
                    </span>
                    <button
                      onClick={exportToExcel}
                      disabled={exportLoading}
                      className="!flex !items-center !gap-2 !px-4 !py-2.5 !bg-blue-50 !text-blue-600 rounded-lg hover:!bg-blue-100 !transition-colors disabled:!!opacity-50"
                    >
                      {exportLoading ? (
                        <div className="!w-4 !h-4 !border-2 !border-blue-600 !border-t-transparent !rounded-full !animate-spin" />
                      ) : (
                        <Download size={16} />
                      )}
                      Export Selected
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedPlans.size > 0 && (
            <div className="!bg-blue-50 border !border-blue-200 !rounded-2xl !p-4 !mb-6">
              <div className="!flex !items-center !justify-between">
                <div className="!flex !items-center !gap-3">
                  <div className="!w-8 !h-8 !bg-blue-100 !rounded-lg !flex !items-center !justify-center">
                    <FileText className="!h-4 !w-4 !text-blue-600" />
                  </div>
                  <div>
                    <p className="!font-medium !text-blue-900">
                      {selectedPlans.size} plan{selectedPlans.size > 1 ? 's' : ''} selected
                    </p>
                    <p className="!text-sm !text-blue-700">Perform bulk actions on selected plans</p>
                  </div>
                </div>
                <div className="!flex !items-center !gap-2">
                  <button  className="!px-4 !py-2 !text-blue-600 hover:!bg-blue-100 !rounded-lg !transition-colors">
                    Edit Selected
                  </button>
                  <button className="!px-4 !py-2 !text-red-600 hover:!bg-red-100 !rounded-lg !transition-colors">
                    Delete Selected
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Pricing Plans Grid */}
          {filteredPricing.length === 0 ? (
            <div className="!bg-white !rounded-3xl !shadow-xl !border !border-gray-100 !p-16 !text-center">
              <div className="!max-w-md !mx-auto">
                <div className="!w-32 !h-32 !bg-gradient-to-br from-gray-100 to-gray-200 !rounded-full !flex !items-center !justify-center !mx-auto !mb-8">
                  <DollarSign className="!h-16 !w-16 !text-gray-400" />
                </div>
                <h3 className="!text-2xl !font-bold !text-gray-900 !mb-3">No pricing plans found</h3>
                <p className="!text-gray-600 !text-lg !mb-8">
                  {searchTerm ? "No plans match your search criteria. Try different keywords." : "Start building your pricing strategy by creating your first plan."}
                </p>
                <div className="!flex !flex-col sm:!flex-row !gap-4 !justify-center">
                  <button className="!bg-gradient-to-r from-blue-600 to-purple-600 !text-white !px-8 !py-4 !rounded-xl hover:!from-blue-700 hover:!to-purple-700 !transition-all !shadow-lg !font-semibold">
                    Create Your First Plan
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
          ) : (
            <div className="!grid !grid-cols-1 xl:!grid-cols-2 !gap-8">
              {filteredPricing.map((plan, index) => {
                const PlanIcon = getPlanIcon(index);
                const gradient = getPlanColor(index);
                const isExpanded = expandedPlan === plan._id;
                const isSelected = selectedPlans.has(plan._id);

                return (
                  <div
                    key={plan._id}
                    className={`!bg-white !rounded-3xl !shadow-lg !border-2 ${isSelected ? '!border-blue-500 !ring-2 !ring-blue-100' : '!border-gray-100'} !overflow-hidden hover:!shadow-2xl !transition-all !duration-300 !transform hover:-translate-y-1`}
                  >
                    {/* Plan Header with Selection */}
                    <div className={`!bg-gradient-to-r ${gradient} !p-6 !relative`}>
                      <div className="!flex !items-start !justify-between">
                        <div className="!flex !items-start !space-x-4 !flex-1">
                          <div className="!flex !items-start !space-x-3 !flex-1">
                            <div className="!flex !items-center !space-x-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelectPlan(plan._id)}
                                className="!w-5 !h-5 !text-blue-600 !bg-white !border-gray-300 !rounded focus:!ring-blue-500"
                              />
                              <div className="!p-3 !bg-white/20 !rounded-2xl !backdrop-blur-sm">
                                <PlanIcon className="!h-6 !w-6 !text-white" />
                              </div>
                            </div>
                            <div className="!flex-1">
                              <h3 className="!text-xl !font-bold !text-white !mb-1">{plan.title}</h3>
                              <div
                                className="!text-white/90 !text-sm !leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: plan.text }}
                              ></div>

                            </div>
                          </div>
                        </div>
                        <div className="!flex !items-center !space-x-2 !ml-4">
                          {index === 0 && (
                            <span className="!bg-yellow-500 !text-white !text-xs !font-bold !px-3 !py-1.5 !rounded-full !shadow-sm">
                              MOST POPULAR
                            </span>
                          )}
                          <span className="!bg-white/20 !text-white !text-sm !px-3 !py-1 !rounded-full !backdrop-blur-sm">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Plan Details */}
                    <div className="!p-6">
                      <div className="!flex !items-center !justify-between !mb-6">
                        <div className="!flex !items-baseline">
                          <span className="!text-4xl !font-bold !text-gray-900">{plan.price}</span>
                          <span className="!text-gray-600 !text-xl !ml-2">{plan.afterText}</span>
                        </div>
                        <div className="!flex !items-center !space-x-2">
                          <button
                            onClick={() => toggleExpand(plan._id)}
                            className="!p-2.5 !text-gray-400 hover:!text-gray-600 !rounded-xl hover:!bg-gray-100 !transition-colors"
                            title={isExpanded ? "Collapse" : "Expand"}
                          >
                            <ChevronDown
                              size={18}
                              className={`!transition-transform !duration-300 ${isExpanded ? '!rotate-180' : ''}`}
                            />
                          </button>
                          <div className="!relative">
                            <button className="!p-2.5 !text-gray-400 hover:!text-gray-600 !rounded-xl hover:!bg-gray-100 !transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className={`!transition-all !duration-500 ${isExpanded ? '!max-h-96' : '!max-h-28'} !overflow-hidden`}>
                        <ul className="!space-y-3">
                          {plan.list?.slice(0, isExpanded ? plan.list.length : 2).map((item, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-700">
                              <CheckCircle className="!h-5 !w-5 !text-green-500 !mr-3 !mt-0.5 !flex-shrink-0" />
                              <span className="!leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                        {plan.list?.length > 2 && !isExpanded && (
                          <div className="!mt-3 !text-sm !text-blue-600 !font-medium !flex !items-center !gap-2">
                            <Sparkles size={16} />
                            +{plan.list.length - 2} more features
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="!flex !items-center !justify-between !pt-6 !mt-6 !border-t !border-gray-100">
                        <div className="!flex !items-center !space-x-3">
                          <button
                            onClick={() => handleEdit(plan._id)}
                            className="!flex !items-center !gap-2 !px-5 !py-2.5 !bg-blue-50 !text-blue-600 !rounded-xl hover:!bg-blue-100 !transition-all !font-medium"
                          >
                            <Edit3 size={17} />
                            Edit Plan
                          </button>
                          <button
                            onClick={() => {/* View functionality */ }}
                            className="!flex !items-center !gap-2 !px-5 !py-2.5 !bg-gray-50 !text-gray-600 !rounded-xl hover:!bg-gray-100 !transition-all !font-medium"
                          >
                            <Eye size={17} />
                            Preview
                          </button>
                        </div>
                        <button
                          onClick={() => deletePlan(plan._id)}
                          className="!flex !items-center !gap-2 !px-5 !py-2.5 !bg-red-50 !text-red-600 !rounded-xl hover:!bg-red-100 !transition-all !font-medium"
                        >
                          <Trash2 size={17} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Enhanced Footer */}
          <div className="!mt-8 !bg-white !rounded-3xl !shadow-lg !border !border-gray-100 !p-6">
            <div className="!flex !flex-col lg:!flex-row !items-center !justify-between !gap-4">
              <div className="!flex !items-center !gap-6">
                <div className="!text-sm !text-gray-600">
                  Showing <span className="!font-semibold !text-gray-900">{filteredPricing.length}</span> of{" "}
                  <span className="!font-semibold !text-gray-900">{pricing.length}</span> pricing plans
                </div>
                <div className="!flex !items-center !gap-2 !text-sm !text-green-600">
                  <CheckCircle size={16} />
                  <span>All systems operational</span>
                </div>
              </div>
              <div className="!flex !items-center !gap-6">
                <button
                  onClick={exportAllToExcel}
                  disabled={exportLoading || filteredPricing.length === 0}
                  className="!flex !items-center !gap-2 !text-gray-600 hover:!text-gray-800 !transition-colors disabled:!opacity-50"
                >
                  {exportLoading ? (
                    <div className="!w-4 !h-4 !border-2 !border-gray-600 !border-t-transparent !rounded-full !animate-spin" />
                  ) : (
                    <FileSpreadsheet size={16} />
                  )}
                  Export All to Excel
                </button>
                <div className="!flex !items-center !gap-2 !text-sm !text-gray-500">
                  <Shield size={16} />
                  <span>Data encrypted and secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListPrice;