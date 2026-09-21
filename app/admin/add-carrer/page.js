"use client";
import React, { useEffect, useState, Suspense  } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import AdminLayout from "../components/AdminLayout";

// Dynamically import CKEditor with custom loading component
const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading Advanced Editor...</p>
        <p className="text-gray-500 text-sm mt-1">Preparing rich text capabilities</p>
      </div>
    </div>
  )
});

let ClassicEditor;
if (typeof window !== 'undefined') {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
}

const AddCareerPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
    tags: "",
    salary: "",
    experience: "",
    applicationDeadline: ""
  });

  const [errors, setErrors] = useState({});

  // Job type options for dropdown
  const jobTypeOptions = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Remote",
    "Hybrid"
  ];

  const experienceOptions = [
    "Entry Level",
    "Junior (1-2 years)",
    "Mid-Level (3-5 years)",
    "Senior (5+ years)",
    "Lead (7+ years)",
    "Executive"
  ];

  // Fetch career if editing
  useEffect(() => {
    if (editId) {
      setIsLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/careers/${editId}`)
        .then(({ data }) => {
          setFormData({
            title: data.title || "",
            location: data.location || "",
            type: data.type || "",
            description: data.description || "",
            tags: data.tags ? data.tags.join(", ") : "",
            salary: data.salary || "",
            experience: data.experience || "",
            applicationDeadline: data.applicationDeadline || ""
          });
        })
        .catch(() => toast.error("Failed to load career data"))
        .finally(() => setIsLoading(false));
    }
  }, [editId]);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.type.trim()) newErrors.type = "Job type is required";
    if (!formData.description.trim() || formData.description === '<p>&nbsp;</p>') 
      newErrors.description = "Job description is required";
    if (formData.description.replace(/<[^>]*>/g, '').length < 20) 
      newErrors.description = "Description should be at least 100 characters";
    if (formData.applicationDeadline && new Date(formData.applicationDeadline) < new Date()) 
      newErrors.applicationDeadline = "Deadline must be in the future";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData(prev => ({ ...prev, description: data }));
    
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };

      if (editId) {
        const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/careers/${editId}`, payload);
        toast.success(data.message || "Career opportunity updated successfully! 🎉");
      } else {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/careers`, payload);
        toast.success(data.message || "Career opportunity created successfully! 🎉");
      }

      setTimeout(() => {
        router.push("/admin/career-list");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving career opportunity");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/career-list");
  };

  const getDescriptionLength = () => {
    return formData.description ? formData.description.replace(/<[^>]*>/g, '').length : 0;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="!min-h-screen !flex !items-center !justify-center">
          <div className="!text-center">
            <div className="!animate-spin !rounded-full !h-16 !w-16 !border-b-2 !border-blue-600 !mx-auto !mb-4"></div>
            <p className="!text-gray-600 !font-medium">Loading career data...</p>
            <p className="!text-gray-500 !text-sm">Please wait while we fetch the details</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="!max-w-6xl !mx-auto !p-4 lg:!p-6">
        {/* Header Card */}
        <div className="!bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 !rounded-2xl !shadow-xl !mb-8 !overflow-hidden">
          <div className="!p-8 !text-white">
            <div className="!flex !items-center !mb-2">
              <div className="!w-12 !h-12 !bg-white/20 !rounded-lg !flex !items-center !justify-center !mr-4">
                <svg className="!w-6 !h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="!text-3xl !font-bold">
                  {editId ? "Update Career Opportunity" : "Create New Career Opportunity"}
                </h1>
                <p className="!text-blue-100 !text-lg !mt-1">
                  {editId ? "Refine and update your job posting" : "Attract top talent with a compelling job posting"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="!bg-white !rounded-2xl !shadow-xl !border !border-gray-100 !overflow-hidden">
          <form onSubmit={handleSubmit} className="!p-6 lg:!p-8 !space-y-8">
            {/* Basic Information Section */}
            <div className="!space-y-6">
              <div className="!flex !items-center !space-x-3">
                <div className="!w-2 !h-8 !bg-blue-600 !rounded-full"></div>
                <h2 className="!text-xl !font-semibold !text-gray-800">Basic Information</h2>
              </div>
              
              <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-6">
                {/* Job Title */}
                <div className="!space-y-3">
                  <label htmlFor="title" className=" !text-sm !font-medium !text-gray-700 !flex !items-center">
                    Job Title <span className="!text-red-500 !ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior Frontend Developer"
                className={`!w-full !px-4 !py-3 !border-2 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-all ${
                      errors.title ? "!border-red-500" : "!border-gray-200 hover:!border-gray-300"
                    }`}
                  />
                  {errors.title && <p className="!text-red-500 !text-sm !flex !items-center"><span className="!mr-1">⚠</span> {errors.title}</p>}
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <label htmlFor="location" className="!text-sm !font-medium !text-gray-700 !flex !items-center">
                    Location <span className="!text-red-500 !ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., New York, NY or Remote"
                    className={`!w-full !px-4 !py-3 !border-2 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-all ${
                      errors.location ? "!border-red-500" : "!border-gray-200 hover:!border-gray-300"
                    }`}
                  />
                  {errors.location && <p className="!text-red-500 !text-sm !flex !items-center"><span className="mr-1">⚠</span> {errors.location}</p>}
                </div>
              </div>

              <div className="!grid !grid-cols-1 lg:!grid-cols-3 !gap-6">
                {/* Job Type */}
                <div className="!space-y-3">
                  <label htmlFor="type" className="!text-sm !font-medium !text-gray-700 !flex !items-center">
                    Job Type <span className="!text-red-500 !ml-1">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`!w-full !px-4 !py-3 !border-2 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-all ${
                      errors.type ? "!border-red-500" : "!border-gray-200 hover:!border-gray-300"
                    }`}
                  >
                    <option value="">Select Job Type</option>
                    {jobTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && <p className="!text-red-500 !text-sm !flex !items-center"><span className="mr-1">⚠</span> {errors.type}</p>}
                </div>

                {/* Experience Level */}
                <div className="!space-y-3">
                  <label htmlFor="experience" className="!block !text-sm !font-medium !text-gray-700">
                    Experience Level
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="!w-full !px-4 !py-3 !border-2 !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-all hover:!border-gray-300"
                  >
                    <option value="">Select Experience</option>
                    {experienceOptions.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary */}
                <div className="!space-y-3">
                  <label htmlFor="salary" className="!block !text-sm !font-medium !text-gray-700">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g., $80,000 - $120,000"
                    className="!w-full !px-4 !py-3 !border-2 !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-all hover:!border-gray-300"
                  />
                </div>
              </div>

              {/* Application Deadline */}
              <div className="!space-y-3 !max-w-md">
                <label htmlFor="applicationDeadline" className="!block !text-sm !font-medium !text-gray-700">
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="applicationDeadline"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`!w-full !px-4 !py-3 !border-2 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-all ${
                    errors.applicationDeadline ? "!border-red-500" : "!border-gray-200 hover:!border-gray-300"
                  }`}
                />
                {errors.applicationDeadline && <p className="!text-red-500 !text-sm !flex !items-center"><span className="!mr-1">⚠</span> {errors.applicationDeadline}</p>}
              </div>
            </div>

            {/* Job Description Section */}
            <div className="!space-y-6">
              <div className="!flex !items-center !space-x-3">
                <div className="!w-2 !h-8 !bg-green-600 !rounded-full"></div>
                <h2 className="!text-xl !font-semibold !text-gray-800">Job Description</h2>
              </div>
              
              <div className="!space-y-3">
                <label htmlFor="description" className=" !text-sm !font-medium !text-gray-700 !flex !items-center">
                  Detailed Description <span className="!text-red-500 !ml-1">*</span>
                </label>
                
                {editorLoaded ? (
                  <div className={`!border-2 !rounded-xl !overflow-hidden !transition-all ${
                    errors.description ? "!border-red-500" : "!border-gray-200 hover:!border-gray-300"
                  }`}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formData.description}
                      onChange={handleEditorChange}
                      config={{
                        toolbar: {
                          items: [
                            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 
                            'numberedList', '|', 'outdent', 'indent', '|', 'blockQuote',
                            'insertTable', '|', 'undo', 'redo'
                          ]
                        },
                        placeholder: "Describe the role, responsibilities, requirements, and what makes this opportunity special...",
                      }}
                    />
                  </div>
                ) : (
                  <div className="!h-96 !bg-gradient-to-br from-gray-50 to-gray-100 !rounded-2xl !flex !items-center !justify-center !border-2 !border-dashed !border-gray-200">
                    <div className="!text-center">
                      <div className="!animate-spin !rounded-full !h-10 !w-10 !border-b-2 !border-blue-600 !mx-auto !mb-4"></div>
                      <p className="!text-gray-600 !font-medium">Loading Advanced Editor...</p>
                    </div>
                  </div>
                )}
                
                <div className="!flex !justify-between !items-center !text-sm">
                  <span className={errors.description ? "!text-red-500 !flex !items-center" : "!text-gray-500"}>
                    {errors.description ? (
                      <><span className="!mr-1">⚠</span> {errors.description}</>
                    ) : (
                      "Minimum 20 characters required"
                    )}
                  </span>
                  <span className="!text-gray-500 !font-medium">{getDescriptionLength()}/5000 characters</span>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="!space-y-6">
              <div className="!flex !items-center !space-x-3">
                <div className="!w-2 !h-8 !bg-purple-600 !rounded-full"></div>
                <h2 className="!text-xl !font-semibold !text-gray-800">Tags & Keywords</h2>
              </div>
              
              <div className="!space-y-3">
                <label htmlFor="tags" className="!block !text-sm !font-medium !text-gray-700">
                  Skills & Technologies
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., React, Node.js, JavaScript, UI/UX, MongoDB, AWS (separate with commas)"
                  className="!w-full !px-4 !py-3 !border-2 !border-gray-200 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-all hover:!border-gray-300"
                />
                <p className="!text-sm !text-gray-500 !flex !items-center">
                  <span className="!mr-1">💡</span> Separate tags with commas for better searchability and matching
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="!flex !flex-col sm:!flex-row !gap-4 !pt-8 !border-t !border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="!flex-1 !bg-gradient-to-r from-blue-600 to-blue-700 !text-white !py-4 !px-8 !rounded-xl !font-semibold hover:!from-blue-700 hover:!to-blue-800 focus:!outline-none focus:!ring-4 focus:!ring-blue-500/50 !transform hover:!scale-105 !transition-all !duration-200 disabled:!opacity-50 disabled:!cursor-not-allowed disabled:!transform-none !shadow-lg hover:!shadow-xl"
              >
                {isSubmitting ? (
                  <span className="!flex !items-center !justify-center">
                    <div className="!animate-spin !rounded-full !h-5 !w-5 !border-b-2 !border-white !mr-3"></div>
                    {editId ? "Updating Opportunity..." : "Creating Opportunity..."}
                  </span>
                ) : (
                  <span className="!flex !items-center !justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {editId ? "Update Career Opportunity" : "Create Career Opportunity"}
                  </span>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="!flex-1 !bg-gray-100 !text-gray-700 !py-4 !px-8 !rounded-xl !font-semibold hover:!bg-gray-200 focus:!outline-none focus:!ring-4 focus:!ring-gray-500/50 !transform hover:!scale-105 !transition-all !duration-200 disabled:!opacity-50 !shadow-lg hover:!shadow-xl"
              >
                <span className="!flex !items-center !justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default function AddCareerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddCareerPageContent />
    </Suspense>
  );
}