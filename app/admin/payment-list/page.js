"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { 
  Loader2, 
  Search, 
  IndianRupee, 
  Mail, 
  Phone, 
  FileText, 
  Download,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar,
  User,
  CreditCard,
  BarChart3
} from "lucide-react";
import { toast } from "react-toastify";
import AdminLayout from "../components/AdminLayout";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });

  const paymentMethods = ["all", "upi", "card", "netbanking", "wallet"];

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/get`);
      setPayments(data);
      // toast.success("Payments updated successfully");
    } catch (err) {
      toast.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  // Advanced filtering
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch = 
        payment.name?.toLowerCase().includes(search.toLowerCase()) ||
        payment.email?.toLowerCase().includes(search.toLowerCase()) ||
        payment.phone?.includes(search) ||
        payment.service?.toLowerCase().includes(search.toLowerCase()) ||
        payment.razorpay_order_id?.includes(search) ||
        payment.razorpay_payment_id?.includes(search);

      const matchesMethod = methodFilter === "all" || 
        payment.method?.toLowerCase() === methodFilter;

      const matchesDate = !dateFilter || 
        new Date(payment.createdAt).toISOString().split('T')[0] === dateFilter;

      const matchesAmount = (
        (!amountRange.min || payment.amount >= Number(amountRange.min)) &&
        (!amountRange.max || payment.amount <= Number(amountRange.max))
      );

      return matchesSearch && matchesMethod && matchesDate && matchesAmount;
    });
  }, [payments, search, methodFilter, dateFilter, amountRange]);

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Service", "Amount", "Method", "Order ID", "Payment ID", "Date"];
    const csvData = filteredPayments.map(payment => [
      payment.name,
      payment.email,
      payment.phone,
      payment.service,
      payment.amount,
      payment.method,
      payment.razorpay_order_id,
      payment.razorpay_payment_id,
      new Date(payment.createdAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(field => `"${field}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };

  const getStatusColor = (method) => {
    const colors = {
      'upi': 'bg-purple-100 text-purple-800 border-purple-200',
      'card': 'bg-blue-100 text-blue-800 border-blue-200',
      'netbanking': 'bg-green-100 text-green-800 border-green-200',
      'wallet': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[method?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const clearFilters = () => {
    setSearch("");
    setDateFilter("");
    setMethodFilter("all");
    setAmountRange({ min: "", max: "" });
    setCurrentPage(1);
  };

  // Statistics
  const stats = useMemo(() => {
    const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const averageAmount = payments.length > 0 ? totalAmount / payments.length : 0;
    
    const methodCounts = payments.reduce((acc, p) => {
      const method = p.method?.toLowerCase() || 'other';
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {});

    const topMethod = Object.entries(methodCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      totalAmount,
      averageAmount,
      topMethod: topMethod ? `${topMethod[0]} (${topMethod[1]})` : 'N/A'
    };
  }, [payments]);

  const PaginationControls = () => (
    <div className="!flex !flex-col sm:!flex-row !items-center !justify-between !gap-4 !px-6 !py-4 !border-t !border-gray-200 !bg-gray-50/50">
      <div className="!flex !items-center !gap-4 !text-sm !text-gray-600">
        <span>Showing {startIndex + 1}-{Math.min(endIndex, filteredPayments.length)} of {filteredPayments.length} results</span>
        
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="!border !border-gray-300 !rounded-lg !px-3 !py-1 !text-sm focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      <div className="!flex !items-center !gap-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="!p-2 !border !border-gray-300 !rounded-lg disabled:!opacity-30 disabled:!cursor-not-allowed hover:!bg-gray-50 !transition-colors"
        >
          <ChevronsLeft className="!h-4 !w-4" />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="!p-2 !border !border-gray-300 !rounded-lg disabled:!opacity-30 disabled:!cursor-not-allowed hover:!bg-gray-50 !transition-colors"
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
              onClick={() => handlePageChange(pageNum)}
              className={`!min-w-[40px] !px-3 !py-2 !border !rounded-lg !text-sm !font-medium !transition-colors ${
                currentPage === pageNum
                  ? "!bg-blue-600 !text-white !border-blue-600"
                  : "!border-gray-300 !text-gray-700 hover:!bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="!p-2 !border !border-gray-300 !rounded-lg disabled:!opacity-30 disabled:!cursor-not-allowed hover:!bg-gray-50 !transition-colors"
        >
          <ChevronRight className="!h-4 !w-4" />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="!p-2 !border !border-gray-300 !rounded-lg disabled:!opacity-30 disabled:!cursor-not-allowed hover:!bg-gray-50 !transition-colors"
        >
          <ChevronsRight className="!h-4 !w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-gray-50 to-blue-50/20 !p-6">
        {/* Header Section */}
        <div className="!mb-8">
          <div className="!flex !flex-col sm:!flex-row sm:!items-center sm:!justify-between">
            <div>
              <h1 className="!text-3xl !font-bold  !bg-gradient-to-r from-blue-600 to-purple-600 !bg-clip-text !text-transparent">
                Payments Dashboard
              </h1>
              <p className="!text-gray-600 !mt-2">Comprehensive overview of all payment transactions</p>
            </div>
            <div className="!flex !items-center !gap-3 !mt-4 sm:!mt-0">
              <button
                onClick={exportToCSV}
                className="!flex !items-center !gap-2 !px-4 !py-2.5 !border !border-gray-300 !rounded-xl !text-gray-700 hover:!bg-gray-50 !transition-all !duration-200 hover:!shadow-sm"
              >
                <Download className="!h-4 !w-4" />
                Export CSV
              </button>
              <button
                onClick={fetchPayments}
                disabled={loading}
                className="!flex !items-center !gap-2 !px-4 !py-2.5 !bg-gradient-to-r from-blue-600 to-blue-700 !text-white !rounded-xl hover:!from-blue-700 hover:!to-blue-800 disabled:!opacity-50 !transition-all !duration-200 hover:!shadow-lg"
              >
                {loading ? (
                  <Loader2 className="!h-4 !w-4 !animate-spin" />
                ) : (
                  <RefreshCw className="!h-4 !w-4" />
                )}
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 !gap-6 !mb-8">
          <div className="!bg-white !rounded-2xl !p-6 !shadow-sm border !border-gray-100 hover:!shadow-md !transition-shadow !duration-200">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-sm !font-medium !text-gray-600">Total Payments</p>
                <p className="!text-2xl !font-bold !text-gray-900 !mt-1">{payments.length}</p>
              </div>
              <div className="!p-3 !bg-blue-50 !rounded-xl">
                <FileText className="!h-6 !w-6 !text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100 hover:!shadow-md !transition-shadow !duration-200">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-sm !font-medium !text-gray-600">Total Revenue</p>
                <p className="!text-2xl !font-bold !text-gray-900 !mt-1 !flex !items-center">
                  <IndianRupee className="!h-5 !w-5" />
                  {stats.totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="!p-3 !bg-green-50 !rounded-xl">
                <BarChart3 className="!h-6 !w-6 !text-green-600" />
              </div>
            </div>
          </div>

          <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100 hover:!shadow-md !transition-shadow !duration-200">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-sm !font-medium !text-gray-600">Average Payment</p>
                <p className="!text-2xl !font-bold !text-gray-900 !mt-1 !flex !items-center">
                  <IndianRupee className="!h-5 !w-5" />
                  {Math.round(stats.averageAmount).toLocaleString()}
                </p>
              </div>
              <div className="!p-3 !bg-purple-50 !rounded-xl">
                <CreditCard className="!h-6 !w-6 !text-purple-600" />
              </div>
            </div>
          </div>

          <div className="!bg-white !rounded-2xl !p-6 !shadow-sm !border !border-gray-100 hover:!shadow-md !transition-shadow !duration-200">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-sm !font-medium !text-gray-600">Top Method</p>
                <p className="!text-lg !font-semibold !text-gray-900 !mt-1 !capitalize">
                  {stats.topMethod}
                </p>
              </div>
              <div className="!p-3 !bg-orange-50 !rounded-xl">
                <User className="!h-6 !w-6 !text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Search and Filters */}
        <div className="!bg-white !rounded-2xl !shadow-sm !border !border-gray-100 !p-6 !mb-6">
          <div className="!flex !flex-col lg:!flex-row !gap-4 !mb-4">
            <div className="!flex-1 !relative">
              <Search className="!absolute !left-3 !top-1/2 !transform -translate-y-1/2 !text-gray-400 !h-4 !w-4" />
              <input
                type="text"
                placeholder="Search payments by name, email, phone, service, order ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="!w-full !pl-10 !pr-4 !py-3 !border !border-gray-300 !rounded-xl focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-all !duration-200"
              />
            </div>
            
            <button
              onClick={clearFilters}
              className="!px-4 !py-3 !border !border-gray-300 !text-gray-700 !rounded-xl hover:!bg-gray-50 !transition-colors !duration-200 !whitespace-nowrap"
            >
              Clear Filters
            </button>
          </div>

          <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-4">
            <div>
              <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                Payment Method
              </label>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="!w-full !px-3 !py-2.5 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-colors !duration-200"
              >
                {paymentMethods.map(method => (
                  <option key={method} value={method}>
                    {method === 'all' ? 'All Methods' : method.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                Date
              </label>
              <div className="!relative">
                <Calendar className="!absolute !left-3 !top-1/2 !transform -translate-y-1/2 !text-gray-400 !h-4 !w-4" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="!w-full !pl-10 !pr-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-colors !duration-200"
                />
              </div>
            </div>

            <div className="!grid !grid-cols-2 !gap-3">
              <div>
                <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                  Min Amount
                </label>
                <input
                  type="number"
                  placeholder="Min"
                  value={amountRange.min}
                  onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                  className="!w-full !px-3 !py-2.5 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-colors !duration-200"
                />
              </div>
              <div>
                <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                  Max Amount
                </label>
                <input
                  type="number"
                  placeholder="Max"
                  value={amountRange.max}
                  onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                  className="!w-full !px-3 !py-2.5 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-colors !duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="!bg-white !rounded-2xl !shadow-sm !border !border-gray-100 !overflow-hidden">
          <div className="!overflow-x-auto">
            <table className="!w-full">
              <thead className="!bg-gradient-to-r from-gray-50 to-gray-100 border-b !border-gray-200">
                <tr>
                  <th className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-700 !uppercase !tracking-wider">
                    Customer
                  </th>
                  <th className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-700 !uppercase !tracking-wider">
                    Service & Amount
                  </th>
                  <th className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-700 !uppercase !tracking-wider">
                    Payment Details
                  </th>
                  <th className="!px-6 !py-4 !text-left !text-xs !font-semibold !text-gray-700 !uppercase !tracking-wider">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="!divide-y !divide-gray-200">
                {currentPayments.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="!px-6 !py-12 !text-center">
                      <div className="!flex !flex-col !items-center !justify-center">
                        <FileText className="!h-16 !w-16 !text-gray-300 !mb-4" />
                        <p className="!text-gray-500 !text-lg !font-medium">No payments found</p>
                        <p className="!text-gray-400 !text-sm !mt-1">
                          {search || methodFilter !== 'all' || dateFilter || amountRange.min || amountRange.max 
                            ? "Try adjusting your search criteria" 
                            : "No payments have been processed yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentPayments.map((payment) => (
                    <tr 
                      key={payment._id} 
                      className="hover:!bg-blue-50/30 !transition-all !duration-150 !group"
                    >
                      <td className="!px-6 !py-4">
                        <div className="!flex !items-center">
                          <div className="!flex-shrink-0 !h-12 !w-12 !bg-gradient-to-br from-blue-500 to-purple-600 !rounded-xl !flex items-center !justify-center !text-white !font-semibold !text-lg !shadow-sm">
                            {payment.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div className="!ml-4">
                            <div className="!text-sm !font-semibold !text-gray-900 group-hover:!text-blue-600 !transition-colors">
                              {payment.name}
                            </div>
                            <div className="!flex !items-center !gap-1 !text-sm !text-gray-500 !mt-1">
                              <Mail className="!h-3 !w-3" />
                              {payment.email}
                            </div>
                            <div className="!flex !items-center !gap-1 !text-sm !text-gray-500 !mt-1">
                              <Phone className="!h-3 !w-3" />
                              {payment.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="!px-6 !py-4">
                        <div className="!space-y-2">
                          <span className="!inline-block !px-3 !py-1 !bg-gray-100 !text-gray-700 !rounded-lg !text-sm !font-medium">
                            {payment.service}
                          </span>
                          <div className="!flex !items-center !gap-1">
                            <IndianRupee className="!h-4 !w-4 !text-green-600" />
                            <span className="!text-lg !font-bold !text-gray-900">
                              {formatCurrency(payment.amount)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="!px-6 !py-4">
                        <div className="!space-y-2">
                          <span className={`!inline-flex !items-center !px-3 !py-1 !rounded-full !text-xs !font-medium !border ${getStatusColor(payment.method)}`}>
                            {payment.method?.toUpperCase()}
                          </span>
                          <div className="space-y-1">
                            <div className="!text-xs">
                              <span className="!text-gray-500">Order:</span>
                              <code className="!ml-1 !text-gray-700 !bg-gray-100 !px-2 !py-1 !rounded">
                                {payment.razorpay_order_id}
                              </code>
                            </div>
                            <div className="!text-xs">
                              <span className="!text-gray-500">Payment:</span>
                              <code className="!ml-1 !text-gray-700 !bg-gray-100 !px-2 !py-1 !rounded">
                                {payment.razorpay_payment_id}
                              </code>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="!px-6 !py-4">
                        <div className="!text-sm !font-semibold !text-gray-900">
                          {new Date(payment.createdAt).toLocaleDateString('en-IN')}
                        </div>
                        <div className="!text-xs !text-gray-500">
                          {new Date(payment.createdAt).toLocaleTimeString('en-IN')}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredPayments.length > 0 && <PaginationControls />}
        </div>
      </div>
    </AdminLayout>
  );
}