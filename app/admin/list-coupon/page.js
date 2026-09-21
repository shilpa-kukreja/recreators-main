"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AdminLayout from "../components/AdminLayout";
import * as XLSX from "xlsx";

export default function ListCoupon({ token }) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const limit = 8;

  const router = useRouter();

  const fetchCoupons = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupon/get`, {
        headers: { token },
      });
      setCoupons(data.coupons);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupon/${id}/toggle`,
        {},
        { headers: { token } }
      );

      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon._id === id ? { ...coupon, isActive: data.coupon.isActive } : coupon
        )
      );
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const deleteCoupon = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupon/${id}`, {
        headers: { token },
      });
      setCoupons((prev) => prev.filter((c) => c._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  const exportToExcel = () => {
    setIsExporting(true);
    const worksheet = XLSX.utils.json_to_sheet(coupons);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Coupons");
    XLSX.writeFile(workbook, `coupons_${new Date().toISOString().split('T')[0]}.xlsx`);
    setTimeout(() => setIsExporting(false), 1000);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCoupons = React.useMemo(() => {
    if (!sortConfig.key) return coupons;
    
    return [...coupons].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [coupons, sortConfig]);

  const filteredCoupons = sortedCoupons.filter((c) =>
    c.couponCode.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCoupons = filteredCoupons.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredCoupons.length / limit);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <span className="text-gray-400">↕️</span>;
    }
    return sortConfig.direction === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-slate-100 !flex !justify-center !items-center">
          <div className="!flex !flex-col !items-center !space-y-4">
            <div className="!animate-spin !rounded-full !h-16 !w-16 !border-4 !border-blue-500 !border-t-transparent"></div>
            <p className="!text-slate-600 !font-medium">Loading coupons...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-slate-100 !p-6">
        {/* Header */}
        <div className="!bg-gradient-to-r from-indigo-600 to-purple-700 !rounded-2xl !p-8 !mb-8 !shadow-2xl !border !border-white/20">
          <div className="!flex !flex-col lg:!flex-row lg:!items-center !justify-between">
            <div className="!flex !items-center !space-x-4">
              <div className="!p-3 !bg-white/20 !rounded-2xl !backdrop-blur-sm">
                <svg className="!w-8 !h-8 !text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h1 className="!text-3xl !font-bold !text-white !mb-2">Coupon Management</h1>
                <p className="!text-indigo-100 !text-lg">
                  Manage discount coupons and promotional offers
                </p>
              </div>
            </div>
            <div className="!flex !flex-col sm:!flex-row !gap-3 !mt-6 lg:!mt-0">
              <button
                onClick={exportToExcel}
                disabled={isExporting || coupons.length === 0}
                className={`!inline-flex !items-center !justify-center !px-6 !py-3 !rounded-xl !font-semibold !shadow-lg !transition-all !duration-300 ${
                  isExporting || coupons.length === 0
                    ? '!bg-gray-400 !cursor-not-allowed !text-gray-200'
                    : '!bg-white !text-indigo-600 hover:!bg-indigo-50 hover:!scale-105 hover:!shadow-xl'
                }`}
              >
                {isExporting ? (
                  <>
                    <div className="!animate-spin !rounded-full !h-5 !w-5 !border-2 !border-indigo-600 !border-t-transparent !mr-3"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="!w-5 !h-5 !mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Excel
                  </>
                )}
              </button>
              <button
                onClick={() => router.push("/admin/add-coupon")}
                className="!inline-flex !items-center !justify-center !px-6 !py-3 !bg-white !text-indigo-600 !rounded-xl !font-semibold !shadow-lg hover:!bg-indigo-50 hover:!scale-105 hover:!shadow-xl !transition-all !duration-300"
              >
                <svg className="!w-5 !h-5 !mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Coupon
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6 !mb-8">
          <div className="!bg-white !rounded-2xl !p-4 !shadow-lg !border !border-slate-100">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-slate-600 !text-sm !font-medium">Total Coupons</p>
                <p className="!text-3xl !font-bold !text-slate-800 !mt-2">{coupons.length}</p>
              </div>
              <div className="!p-3 !bg-blue-100 !rounded-xl">
                <svg className="!w-6 !h-6 !text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-slate-100">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-slate-600 !text-sm !font-medium">Active Coupons</p>
                <p className="!text-3xl !font-bold !text-green-600 !mt-2">
                  {coupons.filter(c => c.isActive).length}
                </p>
              </div>
              <div className="!p-3 !bg-green-100 !rounded-xl">
                <svg className="!w-6 !h-6 !text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-slate-100">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-slate-600 !text-sm !font-medium">Expired</p>
                <p className="!text-3xl !font-bold !text-red-600 !mt-2">
                  {coupons.filter(c => new Date(c.expiryDate) < new Date()).length}
                </p>
              </div>
              <div className="!p-3 !bg-red-100 !rounded-xl">
                <svg className="!w-6 !h-6 !text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-slate-100">
            <div className="!flex !items-center !justify-between">
              <div>
                <p className="!text-slate-600 !text-sm !font-medium">This Page</p>
                <p className="!text-3xl !font-bold !text-purple-600 !mt-2">{paginatedCoupons.length}</p>
              </div>
              <div className="!p-3 !bg-purple-100 !rounded-xl">
                <svg className="!w-6 !h-6 !text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="!bg-white !rounded-2xl !shadow-xl !border !border-slate-100 !overflow-hidden">
          {/* Toolbar */}
          <div className="!px-8 !py-6 !border-b !border-slate-200 !flex !flex-col lg:!flex-row lg:!items-center !justify-between !bg-slate-50/50">
            <div className="!relative !w-full lg:!w-96 !mb-4 lg:!mb-0">
              <div className="!absolute !inset-y-0 !left-0 !pl-4 !flex !items-center !pointer-events-none">
                <svg className="!h-5 !w-5 !text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by coupon code..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="!pl-12 !w-full !border !border-slate-300 !rounded-xl !px-4 !py-3.5 focus:!outline-none focus:!ring-3 focus:!ring-indigo-500/20 focus:!border-indigo-500 !transition-all !duration-300 !bg-white"
              />
            </div>
            
            <div className="!flex !items-center !space-x-4">
              <span className="!text-sm !text-slate-600 !font-medium !bg-slate-100 !px-3 !py-1.5 !rounded-lg">
                {filteredCoupons.length} {filteredCoupons.length === 1 ? 'coupon' : 'coupons'} found
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="!overflow-x-auto">
            <table className="!w-full">
              <thead>
                <tr className="!bg-gradient-to-r from-slate-50 to-slate-100 !text-left !border-b !border-slate-200">
                  {[
                    { key: 'couponCode', label: 'Coupon Code' },
                    { key: 'discount', label: 'Discount' },
                    { key: 'discounttype', label: 'Type' },
                    // { key: 'minPurchaseAmount', label: 'Min Purchase' },
                    // { key: 'maxDiscountAmount', label: 'Max Discount' },
                    { key: 'expiryDate', label: 'Expiry Date' },
                    { key: 'isActive', label: 'Status' },
                    { key: 'actions', label: 'Actions' }
                  ].map(({ key, label }) => (
                    <th 
                      key={key}
                      className={`!px-8 !py-4 !text-sm !font-semibold !text-slate-700 !uppercase !tracking-wider !cursor-pointer hover:!bg-slate-200/50 !transition-colors ${
                        key === 'actions' ? 'text-right' : ''
                      }`}
                      onClick={() => key !== 'actions' && handleSort(key)}
                    >
                      <div className={`!flex !items-center ${key === 'actions' ? 'justify-end' : ''}`}>
                        {label}
                        {key !== 'actions' && <SortIcon columnKey={key} />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="!divide-y !divide-slate-200">
                {paginatedCoupons.length > 0 ? (
                  paginatedCoupons.map((coupon) => (
                    <tr key={coupon._id} className="hover:!bg-indigo-50/30 !transition-all !duration-300 !group">
                      <td className="!px-8 !py-5 !whitespace-nowrap">
                        <div className="!flex !items-center !space-x-3">
                          <div className="!p-2 !bg-indigo-100 !rounded-lg group-hover:!bg-indigo-200 !transition-colors">
                            <svg className="!w-4 !h-4 !text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                          </div>
                          <div>
                            <div className="!text-sm !font-semibold !text-slate-900">{coupon.couponCode}</div>
                            <div className="!text-xs !text-slate-500">Created: {new Date(coupon.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="!px-8 !py-5 !whitespace-nowrap">
                        <div className="!text-lg !font-bold !text-slate-900">
                          {coupon.discount}{coupon.discounttype === 'percentage' ? '%' : '₹'}
                        </div>
                      </td>
                      <td className="!px-8 !py-5 !whitespace-nowrap">
                        <span className={`!px-3 !py-1.5 !text-xs !font-medium !rounded-full ${
                          coupon.discounttype === 'percentage' 
                            ? '!bg-blue-100 !text-blue-800' 
                            : '!bg-green-100 !text-green-800'
                        }`}>
                          {coupon.discounttype}
                        </span>
                      </td>
                      {/* <td className="!px-8 !py-5 !whitespace-nowrap">
                        <div className="!text-sm !font-medium !text-slate-900">
                          {coupon.minPurchaseAmount ? `₹${coupon.minPurchaseAmount.toLocaleString()}` : 'No minimum'}
                        </div>
                      </td>
                      <td className="!px-8 !py-5 !whitespace-nowrap">
                        <div className="!text-sm !font-medium !text-slate-900">
                          {coupon.maxDiscountAmount ? `₹${coupon.maxDiscountAmount.toLocaleString()}` : 'No limit'}
                        </div>
                      </td> */}
                      <td className="!px-8 !py-5 !whitespace-nowrap">
                        <div className="!flex !flex-col !space-y-1">
                          <span className={`!text-sm !font-medium ${
                            new Date(coupon.expiryDate) < new Date() 
                              ? '!text-red-600' 
                              : '!text-slate-900'
                          }`}>
                            {new Date(coupon.expiryDate).toLocaleDateString()}
                          </span>
                          {new Date(coupon.expiryDate) < new Date() && (
                            <span className="!text-xs !text-red-500 !bg-red-50 !px-2 !py-1 !rounded-full !w-fit">Expired</span>
                          )}
                        </div>
                      </td>
                      <td className="!px-8 !py-5 !whitespace-nowrap">
                        <span className={`!inline-flex !items-center !px-3 !py-1.5 !rounded-full !text-xs !font-medium ${
                          coupon.isActive 
                            ? '!bg-green-100 !text-green-800' 
                            : '!bg-slate-100 !text-slate-800'
                        }`}>
                          <span className={`!w-2 !h-2 !rounded-full !mr-2 ${
                            coupon.isActive ? '!bg-green-500' : '!bg-slate-500'
                          }`}></span>
                          {coupon.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="!px-8 !py-5 !whitespace-nowrap !text-right">
                        <div className="!flex !items-center !justify-end !space-x-2">
                          <button
                            onClick={() => toggleStatus(coupon._id)}
                            className={`!p-2.5 !rounded-xl !transition-all !duration-300 ${
                              coupon.isActive 
                                ? '!bg-red-50 !text-red-600 hover:!bg-red-100 hover:!scale-110' 
                                : '!bg-green-50 !text-green-600 hover:!bg-green-100 hover:!scale-110'
                            }`}
                            title={coupon.isActive ? 'Deactivate' : 'Activate'}
                          >
                            <svg className="!w-4 !h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={coupon.isActive ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" : "M5 13l4 4L19 7"} />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => router.push(`/admin/add-coupon?coupon=${encodeURIComponent(JSON.stringify(coupon))}`)}
                            className="!p-2.5 !rounded-xl !bg-blue-50 !text-blue-600 hover:!bg-blue-100 hover:!scale-110 !transition-all !duration-300"
                            title="Edit"
                          >
                            <svg className="!w-4 !h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => setDeleteConfirm(coupon._id)}
                            className="!p-2.5 !rounded-xl !bg-red-50 !text-red-600 hover:!bg-red-100 hover:!scale-110 !transition-all !duration-300"
                            title="Delete"
                          >
                            <svg className="!w-4 !h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="!px-8 !py-16 !text-center">
                      <div className="!flex !flex-col !items-center !justify-center !text-slate-500">
                        <div className="!p-4 !bg-slate-100 !rounded-2xl !mb-4">
                          <svg className="!w-12 !h-12 !text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="!text-xl !font-semibold !text-slate-600 !mb-2">No coupons found</p>
                        <p className="!text-slate-500 !max-w-md">Try adjusting your search criteria or create a new coupon to get started.</p>
                        <button
                          onClick={() => router.push("/admin/add-coupon")}
                          className="!mt-4 !px-6 !py-2.5 !bg-indigo-600 !text-white !rounded-xl !font-medium hover:!bg-indigo-700 !transition-colors"
                        >
                          Create Your First Coupon
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredCoupons.length > 0 && (
            <div className="!px-8 !py-6 !border-t !border-slate-200 !flex !flex-col sm:!flex-row !items-center !justify-between !bg-slate-50/50">
              <div className="!text-sm !text-slate-600 !mb-4 sm:!mb-0">
                Showing <span className="!font-semibold !text-slate-900">{(page - 1) * limit + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(page * limit, filteredCoupons.length)}</span> of <span className="font-semibold text-slate-900">{filteredCoupons.length}</span> results
              </div>
              <div className="!flex !items-center !space-x-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="!px-4 !py-2.5 !text-sm !font-medium !text-slate-700 !bg-white !border !border-slate-300 !rounded-xl hover:!bg-slate-50 disabled:!opacity-50 disabled:!cursor-not-allowed !transition-all !duration-300 !flex !items-center"
                >
                  <svg className="!w-4 !h-4 !mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <div className="!flex !items-center !space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`!w-10 !h-10 !text-sm !font-medium !rounded-xl !transition-all !duration-300 ${
                        page === pageNum
                          ? '!bg-indigo-600 !text-white !shadow-lg'
                          : '!text-slate-700 !bg-white border !border-slate-300 hover:!bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="!px-4 !py-2.5 !text-sm !font-medium !text-slate-700 !bg-white !border !border-slate-300 !rounded-xl hover:!bg-slate-50 disabled:!opacity-50 disabled:!cursor-not-allowed !transition-all !duration-300 !flex !items-center"
                >
                  Next
                  <svg className="!w-4 !h-4 !ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="!fixed !inset-0 !bg-black/60 !backdrop-blur-sm !flex !items-center !justify-center !p-4 !z-50 !animate-fadeIn">
            <div className="!bg-white !rounded-2xl !shadow-2xl !p-8 !max-w-md !w-full !animate-scaleIn">
              <div className="!flex !items-center !space-x-4 !mb-6">
                <div className="!p-3 !bg-red-100 !rounded-2xl">
                  <svg className="!w-8 !h-8 !text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="!text-xl !font-bold !text-slate-900">Delete Coupon</h3>
                  <p className="!text-slate-600 !mt-1">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="!text-slate-700 !mb-8">
                Are you sure you want to delete this coupon? All associated data will be permanently removed from the system.
              </p>
              
              <div className="!flex !justify-end !space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="!px-6 !py-3 !text-sm !font-medium !text-slate-700 !bg-slate-100 !rounded-xl hover:!bg-slate-200 !transition-colors !duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteCoupon(deleteConfirm)}
                  className="!px-6 !py-3 !text-sm !font-medium !text-white !bg-red-600 !rounded-xl hover:!bg-red-700 !transition-colors !duration-300 !flex !items-center"
                >
                  <svg className="!w-4 !h-4 !mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Coupon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </AdminLayout>
  );
}