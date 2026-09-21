"use client";

import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tag, 
  Calendar, 
  Percent, 
  IndianRupee, 
  CheckCircle, 
  X, 
  ArrowLeft,
  Zap,
  Shield,
  Sparkles,
  RotateCcw
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../components/AdminLayout";

const AddCouponContent=()=> {
  const [formData, setFormData] = useState({
    couponCode: "",
    discount: "",
    discounttype: "percentage",
    expiryDate: "",
    minPurchaseAmount: "",
    maxDiscountAmount: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Generate random coupon code
  const generateCouponCode = () => {
    setIsGenerating(true);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Simulate generation delay for better UX
    setTimeout(() => {
      setFormData(prev => ({ ...prev, couponCode: result }));
      setIsGenerating(false);
      toast.success("🎉 Coupon code generated!");
    }, 800);
  };

  // ✅ If editing coupon info is passed via query params
  useEffect(() => {
    const couponData = searchParams.get("coupon");
    if (couponData) {
      try {
        const parsedCoupon = JSON.parse(couponData);
        setEditingCoupon(parsedCoupon);
        setFormData({
          couponCode: parsedCoupon.couponCode || "",
          discount: parsedCoupon.discount || "",
          discounttype: parsedCoupon.discounttype || "percentage",
          expiryDate: parsedCoupon.expiryDate?.slice(0, 10) || "",
          minPurchaseAmount: parsedCoupon.minPurchaseAmount || "",
          maxDiscountAmount: parsedCoupon.maxDiscountAmount || "",
          isActive: parsedCoupon.isActive !== undefined ? parsedCoupon.isActive : true,
        });
      } catch (error) {
        console.error("Error parsing coupon data:", error);
        toast.error("Invalid coupon data");
      }
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors = {};
    
    // Coupon code validation
    if (!formData.couponCode.trim()) {
      newErrors.couponCode = "Coupon code is required";
    } else if (formData.couponCode.length < 4) {
      newErrors.couponCode = "Coupon code must be at least 4 characters";
    }
    
    // Discount validation
    if (!formData.discount || Number(formData.discount) <= 0) {
      newErrors.discount = "Discount must be greater than 0";
    } else if (formData.discounttype === "percentage" && Number(formData.discount) > 100) {
      newErrors.discount = "Percentage discount cannot exceed 100%";
    }
    
    // Expiry date validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (new Date(formData.expiryDate) < new Date()) {
      newErrors.expiryDate = "Expiry date must be in the future";
    }
    
    // Minimum purchase validation
    if (formData.minPurchaseAmount && Number(formData.minPurchaseAmount) < 0) {
      newErrors.minPurchaseAmount = "Minimum purchase cannot be negative";
    }
    
    // Max discount validation
    if (formData.maxDiscountAmount && Number(formData.maxDiscountAmount) < 0) {
      newErrors.maxDiscountAmount = "Maximum discount cannot be negative";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }
    
    setIsLoading(true);

    const payload = {
      ...formData,
      discount: Number(formData.discount),
      minPurchaseAmount: Number(formData.minPurchaseAmount) || 0,
      maxDiscountAmount: Number(formData.maxDiscountAmount) || 0,
    };

    try {
      let response;
      console.log(payload);
      if (editingCoupon) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupon/${editingCoupon._id}`,
          payload
        );
        toast.success("🎯 Coupon updated successfully!");
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupon/add`,
          payload
        );
        toast.success("✨ Coupon created successfully!");
      }

      // Add slight delay for better UX
      setTimeout(() => {
        router.push("/admin/list-coupon");
      }, 1500);
      
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Failed to save coupon";
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 !py-8 !px-4">
        <div className="!max-w-7xl !mx-auto">
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="!bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 !rounded-3xl !shadow-2xl !overflow-hidden !mb-8"
          >
            <div className="!relative !p-8">
              <div className="!absolute !top-0 !right-0 !w-64 !h-64 !bg-white/5 !rounded-full -translate-y-32 !translate-x-32"></div>
              <div className="!absolute !bottom-0 !left-0 !w-48 !h-48 !bg-white/5 !rounded-full !translate-y-24 -translate-x-24"></div>
              
              <div className="!relative !z-10 !flex !items-center !space-x-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="!flex !items-center !justify-center !w-20 !h-20 !bg-white/20 !backdrop-blur-sm !rounded-2xl !!shadow-lg"
                >
                  <Tag className="!w-10 !h-10 !text-white" />
                </motion.div>
                
                <div className="!flex-1">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="!text-3xl md:!text-4xl !font-bold !text-white !mb-2"
                  >
                    {editingCoupon ? "Update Coupon" : "Create New Coupon"}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="!text-blue-100 !text-lg"
                  >
                    {editingCoupon 
                      ? "Modify your coupon details and discounts" 
                      : "Design attractive discounts to boost your sales"
                    }
                  </motion.p>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="!hidden md:!block"
                >
                  <div className="!bg-white/10 !backdrop-blur-sm !rounded-2xl !p-4 !border !border-white/20">
                    <Sparkles className="!w-8 !h-8 !text-amber-300" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="!bg-white !rounded-3xl !shadow-2xl !border !border-gray-100 !overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="!p-8 !space-y-8">
              {/* Coupon Code with Generator */}
              <motion.div variants={itemVariants} className="!space-y-2">
                <label className="!block !text-sm !font-semibold !text-gray-700 !mb-3">
                  Coupon Code <span className="!text-red-500">*</span>
                </label>
                <div className="!flex !space-x-4">
                  <div className="!flex-1 !relative">
                    <div className="!absolute !inset-y-0 !left-0 !pl-4 !flex !items-center !pointer-events-none">
                      <Tag className="!h-5 !w-5 !text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="couponCode"
                      value={formData.couponCode}
                      onChange={handleChange}
                      className={`!pl-12 !w-full !border-2 ${errors.couponCode ? '!border-red-500 focus:!border-red-500' : '!border-gray-200 focus:!border-indigo-500'} !rounded-2xl !px-4 !py-4 focus:!outline-none focus:!ring-4 focus:!ring-indigo-500/20 !transition-all !duration-300 !bg-gray-50/50 focus:!bg-white`}
                      placeholder="SUMMER2024"
                      required
                    />
                  </div>
                  <motion.button
                    type="button"
                    onClick={generateCouponCode}
                    disabled={isGenerating}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="!inline-flex !items-center !justify-center !px-6 !py-4 !bg-gradient-to-r from-green-500 to-emerald-600 !text-white !font-semibold !rounded-2xl !shadow-lg hover:!shadow-xl disabled:!opacity-50 disabled:!cursor-not-allowed !transition-all !duration-300"
                  >
                    {isGenerating ? (
                      <RotateCcw className="!w-5 !h-5 !animate-spin" />
                    ) : (
                      <>
                        <Zap className="!w-5 !h-5 !mr-2" />
                        Generate
                      </>
                    )}
                  </motion.button>
                </div>
                <AnimatePresence>
                  {errors.couponCode && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="!text-sm !text-red-600 !flex !items-center !space-x-1"
                    >
                      <Shield className="!w-4 !h-4" />
                      <span>{errors.couponCode}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Discount Type and Value */}
              <motion.div variants={itemVariants} className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6">
                {/* Discount Type */}
                <div className="!space-y-2">
                  <label className="!block !text-sm !font-semibold !text-gray-700 !mb-3">
                    Discount Type <span className="text-red-500">*</span>
                  </label>
                  <div className="!relative">
                    <select
                      name="discounttype"
                      value={formData.discounttype}
                      onChange={handleChange}
                      className="!w-full !border-2 !border-gray-200 !rounded-2xl !px-4 !py-4 !bg-white focus:!outline-none focus:!ring-4 focus:!ring-indigo-500/20 focus:!border-indigo-500 !transition-all !duration-300 !appearance-none"
                    >
                      <option value="percentage">Percentage Discount</option>
                      <option value="simple">Fixed Amount</option>
                    </select>
                    <div className="!pointer-events-none !absolute !inset-y-0 !right-0 !flex !items-center !px-4 !text-gray-700">
                      <Percent className="!w-5 !h-5" />
                    </div>
                  </div>
                </div>

                {/* Discount Value */}
                <div className="!space-y-2">
                  <label className="!block !text-sm !font-semibold !text-gray-700 !mb-3">
                    Discount Value <span className="!text-red-500">*</span>
                  </label>
                  <div className="relative">
                    {formData.discounttype === "percentage" ? (
                      <>
                        <div className="!absolute !inset-y-0 !left-0 !pl-4 !flex !items-center !pointer-events-none">
                          <Percent className="!h-5 !w-5 !text-gray-400" />
                        </div>
                        <input
                          type="number"
                          name="discount"
                          value={formData.discount}
                          onChange={handleChange}
                          className={`!pl-12 !w-full !border-2 ${errors.discount ? '!border-red-500 focus:!border-red-500' : '!border-gray-200 focus:!border-indigo-500'} !rounded-2xl !px-4 !py-4 focus:!outline-none focus:!ring-4 focus:!ring-indigo-500/20 !transition-all !duration-300 !bg-gray-50/50 focus:!bg-white`}
                          placeholder="25"
                          min="0"
                          max="100"
                          step="0.1"
                          required
                        />
                      </>
                    ) : (
                      <>
                        <div className="!absolute !inset-y-0 !left-0 !pl-4 !flex !items-center !pointer-events-none">
                          <IndianRupee className="!h-5 !w-5 !text-gray-400" />
                        </div>
                        <input
                          type="number"
                          name="discount"
                          value={formData.discount}
                          onChange={handleChange}
                          className={`!pl-12 !w-full !border-2 ${errors.discount ? '!border-red-500 focus:!border-red-500' : '!border-gray-200 focus:!border-indigo-500'} !rounded-2xl !px-4 !py-4 focus:!outline-none focus:!ring-4 focus:!ring-indigo-500/20 !transition-all !duration-300 !bg-gray-50/50 focus:!bg-white`}
                          placeholder="500"
                          min="0"
                          step="1"
                          required
                        />
                      </>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.discount && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="!text-sm !text-red-600 !flex !items-center !space-x-1"
                      >
                        <Shield className="!w-4 !h-4" />
                        <span>{errors.discount}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Expiry Date */}
              <motion.div variants={itemVariants} className="!space-y-2">
                <label className="!block !text-sm !font-semibold !text-gray-700 !mb-3">
                  Expiry Date <span className="!text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="!absolute !inset-y-0 !left-0 !pl-4 !flex !items-center !pointer-events-none">
                    <Calendar className="!h-5 !w-5 !text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className={`!pl-12 !w-full !border-2 ${errors.expiryDate ? '!border-red-500 focus:!border-red-500' : '!border-gray-200 focus:!border-indigo-500'} !rounded-2xl !px-4 !py-4 focus:!outline-none focus:!ring-4 focus:!ring-indigo-500/20 !transition-all !duration-300 !bg-gray-50/50 focus:!bg-white`}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <AnimatePresence>
                  {errors.expiryDate && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="!text-sm !text-red-600 !flex !items-center !space-x-1"
                    >
                      <Shield className="!w-4 !h-4" />
                      <span>{errors.expiryDate}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Purchase Limits */}
              <motion.div variants={itemVariants} className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6">
                {/* Minimum Purchase */}
                <div className="space-y-2">
                  <label className="!block !text-sm !font-semibold !text-gray-700 !mb-3">
                    Minimum Purchase Amount
                  </label>
                  <div className="!relative">
                    <div className="!absolute !inset-y-0 !left-0 !pl-4 !flex !items-center !pointer-events-none">
                      <IndianRupee className="!h-5 !w-5 !text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="minPurchaseAmount"
                      value={formData.minPurchaseAmount}
                      onChange={handleChange}
                      className={`!pl-12 !w-full !border-2 ${errors.minPurchaseAmount ? '!border-red-500 focus:!border-red-500' : '!border-gray-200 focus:!border-indigo-500'} !rounded-2xl !px-4 !py-4 focus:!outline-none focus:!ring-4 focus:!ring-indigo-500/20 !transition-all !duration-300 !bg-gray-50/50 focus:!bg-white`}
                      placeholder="1000"
                      min="0"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.minPurchaseAmount ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="!text-sm !text-red-600 !flex !items-center !space-x-1"
                      >
                        <Shield className="!w-4 !h-4" />
                        <span>{errors.minPurchaseAmount}</span>
                      </motion.p>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="!text-xs !text-gray-500 !flex !items-center !space-x-1"
                      >
                        <span>Optional - Set minimum cart value</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Maximum Discount */}
                <div className="!space-y-2">
                  <label className="!block !text-sm !font-semibold !text-gray-700 !mb-3">
                    Maximum Discount Amount
                  </label>
                  <div className="!relative">
                    <div className="!absolute !inset-y-0 !left-0 !pl-4 !flex !items-center !pointer-events-none">
                      <IndianRupee className="!h-5 !w-5 !text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="maxDiscountAmount"
                      value={formData.maxDiscountAmount}
                      onChange={handleChange}
                      className={`!pl-12 !w-full !border-2 ${errors.maxDiscountAmount ? '!border-red-500 focus:!border-red-500' : '!border-gray-200 focus:!border-indigo-500'} !rounded-2xl !px-4 !py-4 focus:!outline-none focus:!ring-4 focus:!ring-indigo-500/20 !transition-all !duration-300 !bg-gray-50/50 focus:!bg-white`}
                      placeholder="2000"
                      min="0"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.maxDiscountAmount ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="!text-sm !text-red-600 !!flex !items-center !space-x-1"
                      >
                        <Shield className="!w-4 !h-4" />
                        <span>{errors.maxDiscountAmount}</span>
                      </motion.p>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="!text-xs !text-gray-500 !flex !items-center !space-x-1"
                      >
                        <span>For percentage discounts only</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Active Status */}
              <motion.div variants={itemVariants}>
                <div className="!flex !items-center !space-x-4 !p-6 !bg-gradient-to-r from-gray-50 to-blue-50/50 !rounded-2xl !border-2 !border-gray-100 hover:!border-indigo-200 !transition-all !duration-300">
                  <div className="!flex !items-center !h-6">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="!h-6 !w-6 !text-indigo-600 focus:!ring-indigo-500 !border-gray-300 !rounded-xl !transition-all"
                    />
                  </div>
                  <div className="!flex !flex-col">
                    <label className="!text-lg !font-semibold !text-gray-900">Activate Coupon</label>
                    <p className="!text-sm !text-gray-600 !mt-1">
                      {formData.isActive 
                        ? "This coupon is currently active and can be used by customers" 
                        : "This coupon is disabled and cannot be used"
                      }
                    </p>
                  </div>
                  <div className={`!ml-auto !px-4 !py-2 !rounded-xl ${formData.isActive ? '!bg-green-100 !text-green-800' : '!bg-gray-100 !text-gray-600'} !transition-colors`}>
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                variants={itemVariants}
                className="!flex !flex-col sm:!flex-row !gap-4 !pt-8 !border-t !border-gray-200"
              >
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="!inline-flex !items-center !justify-center !flex-1 !px-8 !py-5 !bg-gradient-to-r from-indigo-600 to-purple-600 !border !border-transparent !rounded-2xl !font-bold !text-white !shadow-2xl hover:!shadow-3xl disabled:!opacity-70 disabled:!cursor-not-allowed !transition-all !duration-300 !relative !overflow-hidden"
                >
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="!absolute !inset-0 !bg-gradient-to-r from-indigo-600 to-purple-600"
                    >
                      <div className="!absolute !inset-0 !flex !items-center !justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="!w-6 !h-6 !border-2 !border-white !border-t-transparent !rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                  <div className={`!flex !items-center !space-x-3 ${isLoading ? '!opacity-0' : '!opacity-100'}`}>
                    <CheckCircle className="!w-6 !h-6" />
                    <span className="!text-lg">
                      {editingCoupon ? "Update Coupon" : "Create Coupon"}
                    </span>
                  </div>
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => router.push("/admin/list-coupon")}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="!inline-flex !items-center !justify-center !px-8 !py-5 !bg-white !border-2 !border-gray-200 !rounded-2xl !font-semibold !text-gray-700 hover:!bg-gray-50 hover:!border-gray-300 focus:!outline-none focus:!ring-4 focus:!ring-gray-500/20 !transition-all !duration-300"
                >
                  <ArrowLeft className="!w-5 !h-5 !mr-3" />
                  Back to List
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Quick Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="!mt-8 !grid !grid-cols-1 md:!grid-cols-3 !gap-6"
          >
            <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-gray-100">
              <div className="!flex !items-center !space-x-4">
                <div className="!p-3 !bg-blue-100 !rounded-xl">
                  <Percent className="!w-6 !h-6 !text-blue-600" />
                </div>
                <div>
                  <p className="!text-sm !text-gray-600">Discount Type</p>
                  <p className="!text-lg !font-semibold !text-gray-900 !capitalize">
                    {formData.discounttype}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-gray-100">
              <div className="!flex !items-center !space-x-4">
                <div className="!p-3 !bg-green-100 !rounded-xl">
                  <IndianRupee className="!w-6 !h-6 !text-green-600" />
                </div>
                <div>
                  <p className="!text-sm !text-gray-600">Discount Value</p>
                  <p className="!text-lg !font-semibold !text-gray-900">
                    {formData.discounttype === 'percentage' ? `${formData.discount || 0}%` : `₹${formData.discount || 0}`}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="!bg-white !rounded-2xl !p-6 !shadow-lg !border !border-gray-100">
              <div className="!flex !items-center !space-x-4">
                <div className="!p-3 !bg-purple-100 !rounded-xl">
                  <Calendar className="!w-6 !h-6 !text-purple-600" />
                </div>
                <div>
                  <p className="!text-sm !text-gray-600">Status</p>
                  <p className={`!text-lg !font-semibold ${formData.isActive ? '!text-green-600' : '!text-gray-600'}`}>
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}


export default function AddCoupon() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddCouponContent />
    </Suspense>
  );
}

