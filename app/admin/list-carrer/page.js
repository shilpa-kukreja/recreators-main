"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import AdminLayout from "../components/AdminLayout";
import {
  FiDownload,

} from "react-icons/fi";

const CareerListPage = () => {
  const router = useRouter();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/careers`);
      setCareers(data);
    } catch (error) {
      toast.error("Failed to fetch careers");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this career opportunity? This action cannot be undone.")) {
      return;
    }

    try {
      setDeletingId(id);
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/careers/${id}`);
      toast.success("Career deleted successfully 🗑️");
      fetchCareers();
    } catch (error) {
      toast.error("Failed to delete career");
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/add-carrer?id=${id}`);
  };

  const handleexport = () => {
    setIsExporting(true);
    try {
      const dataToExport = careers.map((career) => ({
        "Job Title": career.jobTitle,
        "Job Description": career.jobDescription,
        "Application Deadline": formatDate(career.applicationDeadline),
        Status: getStatusBadge(career),
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Careers");
      XLSX.writeFile(workbook, "careers.xlsx");
    } catch (error) {
      toast.error("Failed to export careers");
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleView = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/careers/${id}`);
      setSelectedCareer(data);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to load career details");
      console.error("View error:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCareer(null);
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (career) => {
    if (career.applicationDeadline) {
      const deadline = new Date(career.applicationDeadline);
      const today = new Date();
      if (deadline < today) {
        return <span className="!px-2 !py-1 !bg-red-100 !text-red-800 !text-xs !font-medium !rounded-full">Expired</span>;
      }
    }
    return <span className="!px-2 !py-1 !bg-green-100 !text-green-800 !text-xs !font-medium !rounded-full">Active</span>;
  };

  // Modal component
  const CareerDetailsModal = ({ career, isOpen, onClose }) => {
    if (!isOpen || !career) return null;

    return (

      <div className="!fixed !inset-0  !bg-opacity-50 !flex !items-center !justify-center !p-4 !z-50">
        <div className="!bg-white !rounded-2xl !shadow-2xl !max-w-4xl !w-full !max-h-[90vh] !overflow-hidden">
          {/* Modal Header */}
          <div className="!bg-gradient-to-r from-blue-600 to-blue-700 !px-6 !py-4 !text-white">
            <div className="!flex !justify-between !items-center">
              <h2 className="!text-2xl !font-bold">{career.title}</h2>
              <button
                onClick={onClose}
                className="!text-white hover:!text-gray-200 !transition-colors !p-2 !rounded-full hover:!bg-white hover:!bg-opacity-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="!flex !flex-wrap !gap-4 !mt-2 !text-blue-100">
              <span className="!flex !items-center">
                <svg className="!w-4 !h-4 !mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {career.location}
              </span>
              <span className="!flex !items-center">
                <svg className="!w-4 !h-4 !mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {career.type}
              </span>
              {career.experience && (
                <span className="!flex !items-center">
                  <svg className="!w-4 !h-4 !mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {career.experience}
                </span>
              )}
            </div>
          </div>

          {/* Modal Body */}
          <div className="!p-6 !overflow-y-auto !max-h-[calc(90vh-140px)]">
            {/* Basic Information */}
            <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6 !mb-6">
              <div className="!space-y-4">
                <div>
                  <h3 className="!text-sm !font-medium !text-gray-500">Salary Range</h3>
                  <p className="!text-lg !font-semibold !text-gray-900">
                    {career.salary || "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="!text-sm !font-medium !text-gray-500">Application Deadline</h3>
                  <p className="!text-lg !font-semibold !text-gray-900">
                    {career.applicationDeadline ? formatDate(career.applicationDeadline) : "Not specified"}
                  </p>
                </div>
              </div>
              <div className="!space-y-4">
                <div>
                  <h3 className="!text-sm !font-medium !text-gray-500">Status</h3>
                  <div className="!mt-1">{getStatusBadge(career)}</div>
                </div>
                <div>
                  <h3 className="!text-sm !font-medium !text-gray-500">Created Date</h3>
                  <p className="!text-lg !font-semibold !text-gray-900">
                    {formatDate(career.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="!mb-6">
              <h3 className="!text-lg !font-semibold !text-gray-900 !mb-3">Job Description</h3>
              <div
                className="!prose !prose-blue !max-w-none !bg-gray-50 !p-4 !rounded-lg"
                dangerouslySetInnerHTML={{ __html: career.description }}
              />
            </div>

            {/* Skills & Tags */}
            <div>
              <h3 className="!text-lg !font-semibold !text-gray-900 !mb-3">Required Skills & Technologies</h3>
              <div className="!flex !flex-wrap !gap-2">
                {career.tags.map((tag, index) => (
                  <span key={index} className="!inline-flex !items-center !px-3 !py-1 !rounded-full !text-sm !font-medium !bg-blue-100 !text-blue-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="!px-6 !py-4 !bg-gray-50 !border-t !border-gray-200 !flex !justify-end !space-x-3">
            <button
              onClick={onClose}
              className="!px-6 !py-2 !border !border-gray-300 !rounded-lg !text-gray-700 hover:!bg-gray-100 !transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                handleEdit(career._id);
              }}
              className="!px-6 !py-2 !bg-blue-600 !text-white !rounded-lg hover:!bg-blue-700 !transition-colors"
            >
              Edit Career
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="!min-h-screen !bg-gray-50 !flex !items-center !justify-center">
        <div className="!text-center">
          <div className="!animate-spin !rounded-full !h-12 !w-12 !border-b-2 !border-blue-600 !mx-auto !mb-4"></div>
          <p className="!text-gray-600 !font-medium">Loading career opportunities...</p>
          <p className="!text-gray-500 !text-sm">Please wait while we fetch the latest listings</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-gray-50 to-gray-100 !py-8 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-7xl !mx-auto">
          {/* Header Section */}
          <div className="!mb-8">
            <div className="!flex !flex-col sm:!flex-row sm:!items-center sm:!justify-between">
              <div className="!mb-4 sm:!mb-0">
                <h1 className="!text-3xl !font-bold !text-gray-900">Career Opportunities</h1>
                <p className="!text-gray-600 !mt-2">Manage and monitor all job postings</p>
              </div>
              <div className="!flex !items-center !space-x-4">
              <button
                onClick={() => router.push("/admin/add-carrer")}
                className="!inline-flex !items-center !px-6 !py-3 !border !border-transparent !text-sm !font-medium !rounded-xl !text-white !bg-gradient-to-r from-blue-600 to-blue-700 hover:!from-blue-700 hover:!to-blue-800 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500 !shadow-lg hover:!shadow-xl !transition-all !duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Career
              </button>

              <button
                onClick={handleexport}
                disabled={isExporting || careers.length === 0}
                className={`!font-semibold !py-3 !px-6 !rounded-xl !transition-all !duration-200 !flex !items-center !shadow-lg hover:!shadow-xl ${isExporting || careers.length === 0
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

          {/* Stats Cards */}
          <div className="!grid !grid-cols-1 md:!grid-cols-4 !gap-6 !mb-8">
            <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-blue-100 !rounded-lg !mr-4">
                  <svg className="!w-6 !h-6 !text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="!text-2xl !font-bold !text-gray-900">{careers.length}</p>
                  <p className="!text-gray-600 !text-sm">Total Jobs</p>
                </div>
              </div>
            </div>

            <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-green-100 !rounded-lg !mr-4">
                  <svg className="!w-6 !h-6 !text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="!text-2xl !font-bold !text-gray-900">
                    {careers.filter(c => !c.applicationDeadline || new Date(c.applicationDeadline) >= new Date()).length}
                  </p>
                  <p className="!text-gray-600 !text-sm">Active Jobs</p>
                </div>
              </div>
            </div>

            <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-purple-100 !rounded-lg !mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="!text-2xl !font-bold !text-gray-900">
                    {new Set(careers.map(c => c.type)).size}
                  </p>
                  <p className="!text-gray-600 !text-sm">Job Types</p>
                </div>
              </div>
            </div>

            <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-gray-100">
              <div className="!flex !items-center">
                <div className="!p-3 !bg-orange-100 !rounded-lg !mr-4">
                  <svg className="!w-6 !h-6 !text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="!text-2xl !font-bold !text-gray-900">
                    {new Set(careers.flatMap(c => c.tags)).size}
                  </p>
                  <p className="!text-gray-600 !text-sm">Unique Skills</p>
                </div>
              </div>
            </div>
          </div>

          {/* Careers Table */}
          <div className="!bg-white !rounded-2xl !shadow-xl !border !border-gray-200 !overflow-hidden">
            <div className="!px-6 !py-4 !border-b !border-gray-200">
              <h2 className="!text-lg !font-semibold !text-gray-900">All Job Postings</h2>
            </div>

            {careers.length === 0 ? (
              <div className="!text-center !py-12">
                <div className="!mx-auto !w-24 !h-24 !bg-gray-100 !rounded-full !flex !items-center !justify-center !mb-4">
                  <svg className="!w-12 !h-12 !text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="!text-lg !font-medium !text-gray-900 !mb-2">No career opportunities yet</h3>
                <p className="!text-gray-600 !mb-6">Get started by creating your first job posting.</p>
                <button
                  onClick={() => router.push("/admin/add-carrer")}
                  className="!inline-flex !items-center !px-6 !py-3 !border !border-transparent !text-sm !font-medium !rounded-xl !text-white !bg-blue-600 hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500"
                >
                  Create First Job Posting
                </button>
              </div>
            ) : (
              <div className="!overflow-x-auto">
                <table className="!min-w-full !divide-y !divide-gray-200">
                  <thead className="!bg-gray-50">
                    <tr>
                      <th scope="col" className="!px-6 !py-4 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                        Job Details
                      </th>
                      <th scope="col" className="!px-6 !py-4 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                        Type & Location
                      </th>
                      <th scope="col" className="!px-6 !py-4 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                        Tags
                      </th>
                      <th scope="col" className="!px-6 !py-4 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="!px-6 !py-4 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="!bg-white !divide-y !divide-gray-200">
                    {careers.map((career) => (
                      <tr key={career._id} className="hover:!bg-gray-50 !transition-colors !duration-150">
                        <td className="!px-6 !py-4 !whitespace-nowrap">
                          <div>
                            <div className="!text-sm !font-medium !text-gray-900 !cursor-pointer hover:!text-blue-600 !transition-colors" onClick={() => handleView(career._id)}>
                              {career.title}
                            </div>
                            <div className="!text-sm !text-gray-500">
                              Created {formatDate(career.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="!px-6 !py-4 !whitespace-nowrap">
                          <div className="!text-sm !text-gray-900">{career.type}</div>
                          <div className="!text-sm !text-gray-500 !flex !items-center !mt-1">
                            <svg className="!w-4 !h-4 !mr-1 !text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {career.location}
                          </div>
                        </td>
                        <td className="!px-6 !py-4">
                          <div className="!flex !flex-wrap !gap-1 !max-w-xs">
                            {career.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="!inline-flex !items-center !px-2 !py-1 !rounded-full !text-xs !font-medium !bg-blue-100 !text-blue-800">
                                {tag}
                              </span>
                            ))}
                            {career.tags.length > 3 && (
                              <span className="!inline-flex !items-center !px-2 !py-1 !rounded-full !text-xs !font-medium !bg-gray-100 !text-gray-800">
                                +{career.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="!px-6 !py-4 !whitespace-nowrap">
                          {getStatusBadge(career)}
                          {career.applicationDeadline && (
                            <div className="!text-xs !text-gray-500 !mt-1">
                              Until {formatDate(career.applicationDeadline)}
                            </div>
                          )}
                        </td>
                        <td className="!px-6 !py-4 !whitespace-nowrap !text-sm !font-medium">
                          <div className="!flex !space-x-2">
                            <button
                              onClick={() => handleView(career._id)}
                              className="!inline-flex !items-center !px-3 !py-2 !border !border-transparent !text-sm !leading-4 !font-medium !rounded-md !text-green-700 !bg-green-100 hover:!bg-green-200 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-green-500 !transition-colors"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(career._id)}
                              className="!inline-flex !items-center !px-3 !py-2 !border !border-transparent !text-sm !leading-4 !font-medium !rounded-md !text-blue-700 !bg-blue-100 hover:!bg-blue-200 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500 !transition-colors"
                            >
                              <svg className="!w-4 !h-4 !mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(career._id)}
                              disabled={deletingId === career._id}
                              className="!inline-flex !items-center !px-3 !py-2 !border !border-transparent !text-sm !leading-4 !font-medium !rounded-md !text-red-700 !bg-red-100 hover:!bg-red-200 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-red-500 !transition-colors disabled:!opacity-50"
                            >
                              {deletingId === career._id ? (
                                <>
                                  <div className="!animate-spin !rounded-full !h-3 !w-3 !border-b-2 !border-red-700 !mr-1"></div>
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <svg className="!w-4 !h-4 !mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Delete
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="!mt-6 !text-center !text-gray-500 !text-sm">
            <p>Showing {careers.length} career opportunity{careers.length !== 1 ? 'ies' : ''}</p>
          </div>
        </div>

        {/* Career Details Modal */}
        <CareerDetailsModal
          career={selectedCareer}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </AdminLayout>
  );
};

export default CareerListPage;